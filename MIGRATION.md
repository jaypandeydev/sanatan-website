# Migrating from Hostinger VPS to Vercel + Neon + Cloudinary

Target stack, all free tier:

| Piece | Was (Hostinger) | Now |
|---|---|---|
| Next.js app | Docker container + PM2 on a VPS | Vercel (Hobby) |
| Postgres | `postgres:16-alpine` container | Neon Postgres |
| Official photos | `public/images/officials/` on disk | Cloudinary |
| DNS | Hostinger | Vercel nameservers or A/CNAME |

The code changes are already done (see "What changed in the code" at the bottom).
What follows is the operational sequence.

---

## Step 0 — Rotate every secret first

Treat everything in the old `.env` as compromised, because if the VPS was
breached the attacker could read it. Generate new values **before** putting
anything into Vercel:

```bash
# New JWT secret (invalidates all existing admin logins - expected)
openssl rand -base64 48
```

Also rotate:
- the SMTP mailbox password (in your mail provider's control panel)
- the Postgres password (moot once you are on Neon, which issues a fresh one)

Do **not** copy `JWT_SECRET` or `SMTP_PASSWORD` across from the old server.

---

## Step 1 — Dump the database off the VPS  ✅ DONE

Dumped 13 Sep from Postgres 16.14 in the `sanatan_db` container, retrieved to
`~/sanatan-backup.sql` (47K). Keep this file until the site is confirmed live.

---

## Step 2 — Neon database  ✅ DONE

Project `sanatanwebsite` (`shy-night-66619830`), org `sanatanmaharishad` (Free),
region **ap-southeast-1** (Singapore), **Postgres 17.11**.

Both connection strings are saved locally in `.env.neon` (gitignored, never
committed). Print them when you need them:

```bash
cat .env.neon
```

- `DATABASE_URL` — pooled (`-pooler` host) + `pgbouncer=true&connection_limit=1`.
  **This is the one that goes into Vercel.** Pooling matters because each API
  route is a separate serverless function; without it you exhaust Postgres
  connections under light traffic.
- `DIRECT_URL` — non-pooled, for migrations and restores only. Prisma's migration
  engine takes advisory locks, which do not survive a transaction pooler.

Schema already applied via `prisma migrate deploy`. Tables present and empty:
`Official`, `Message`, `User`, `Members`, `_prisma_migrations`.

**Data restored ✅** — verified against the dump:

| Table | Rows |
|---|---|
| `Members` | 105 |
| `Message` | 26 |
| `Official` | 4 |
| `User` | 1 (admin `info@sanatanmahaparishad.org`) |

Restored data-only, excluding `_prisma_migrations` so Prisma's own history stays
authoritative. Sequences reset above their max ids, so new signups will not
collide. A write through the pooled URL was tested and rolled back.

Note: the dump is from pg_dump 16.14, which emits `\restrict`/`\unrestrict`
psql meta-commands. The local psql is 15.13 and does not understand them, so
feeding the raw file to `psql` fails. The restore extracted the COPY blocks
instead.

---

## Step 3 — Create the Cloudinary account

1. Sign up at cloudinary.com (free tier: 25 GB storage / 25 GB monthly bandwidth).
2. From the dashboard copy **Cloud name**, **API Key**, **API Secret**.

Verified working: a test image was uploaded through `lib/cloudinary.ts`, fetched
back over HTTPS (200, image/png) and deleted. Cloud name `dzdaksuzp`. Uploads
land in `sanatan/officials`, cropped to a 400x400 face-centred square; face
gravity falls back gracefully when no face is detected.

### Two official photos could not be recovered

`Official.imagePath` holds two legacy filenames from July 2025, uploaded during
the PM2 era before the app was dockerized:

- `1751629533947-ue73sj.jpg` - चन्द्र मोहन पाण्डेय (राष्ट्रीय अध्यक्ष)
- `1751629812163-qvdo59.JPG` - जयश्री पाण्डेय (राष्ट्रीय महासचिव)

The files are gone. The app now lives in `/opt/sanatan`, whose `public/` tree is
recreated from git on every deploy (`git reset --hard origin/main`), and the
uploads were never tracked in git. Searched and came up empty:
`/opt/sanatan/public/images/officials` (placeholder only), `/var/www`, `$HOME`,
`~/backups` (five *other* projects), and all three `deploy-bundle` archives.

The rows were left as-is rather than nulled, so the filenames survive if the
originals ever turn up. `officialImageSrc()` plus the `onError` handler means
the page falls back to the placeholder cleanly - nothing looks broken. **Simply
re-upload both photos through `/add-official` once the site is live**, which now
works for the first time since July 2025.

---

## Step 4 — Deploy to Vercel

Push the repo to GitHub if it is not already there, then:

1. vercel.com -> **Add New** -> **Project** -> import the repo
2. Framework preset: **Next.js** (auto-detected). Leave build/output settings alone -
   `package.json` already runs `prisma generate && next build`.
3. Add these Environment Variables (Production **and** Preview):

```
DATABASE_URL        = <pooled Neon URL with ?sslmode=require&pgbouncer=true&connection_limit=1>
JWT_SECRET          = <the new one from Step 0>
SMTP_HOST           = <your smtp host>
SMTP_PORT           = 465
SMTP_SECURE         = true
SMTP_USER           = <your smtp user>
SMTP_PASSWORD       = <the rotated password>
CLOUDINARY_CLOUD_NAME   = <from Step 3>
CLOUDINARY_API_KEY      = <from Step 3>
CLOUDINARY_API_SECRET   = <from Step 3>
NEXT_PUBLIC_SITE_URL    = https://<your domain>
```

Do **not** set `PORT`, `NODE_ENV`, `POSTGRES_DB`, `POSTGRES_USER` or
`POSTGRES_PASSWORD` - Vercel manages the first two and the rest are Docker-only.

4. **Settings -> Functions -> Function Region: `Singapore, sin1`.**
   This must match the Neon region. If functions run in the US default while the
   database is in Singapore, every query crosses the Pacific - and a page load
   makes several.

5. Deploy.

---

## Step 5 — Test on the vercel.app URL before touching DNS

Against the temporary `*.vercel.app` URL:

- [ ] `/api/health` returns OK
- [ ] `/officials` lists officials from the restored data
- [ ] `/login` works with the **new** JWT secret (log in fresh)
- [ ] `/add-official` uploads a photo and it appears (Cloudinary path)
- [ ] `/contact` sends an email (SMTP from serverless)
- [ ] `/join` membership submission writes a row
- [ ] `/members` export to Excel/PDF works

If SMTP times out, your provider may be blocking connections from Vercel's IP
ranges. Fallback is a HTTP-API mail service such as Resend, which needs a small
change in `lib/emailTemplate.ts` usage rather than SMTP.

---

## Steps 4-6 — Vercel + DNS  ✅ DONE (13 Sep)

Live at **https://sanatanmahaparishad.org**.

| | |
|---|---|
| Project | `sanatan-website` (Hobby), production alias `sanatan-website-vert.vercel.app` |
| Edge / Functions | `bom1` (Mumbai) / `sin1` (Singapore, matching Neon) |
| Apex | `sanatanmahaparishad.org` → Production |
| www | 308 → apex (matches canonical tags in `app/layout.tsx` and `app/sitemap.ts`) |
| TLS | Let's Encrypt, issued 13 Sep, auto-renewing |

DNS: exactly one record changed in Hostinger, `A @ 147.93.106.12 -> 216.198.79.1`
(TTL 300). Everything else untouched - MX, SPF, DKIM x3, DMARC, autodiscover,
autoconfig, Google verification - so email continues to work. `www` stays a
CNAME to the apex and follows it.

Verified live: all 10 pages 200, `/api/health` reports the database connected,
`/api/officials` returns 4 records from Neon, sitemap emits the non-www
canonical host.

**Rollback**, if ever needed: set `A @` back to `147.93.106.12`. Takes about
five minutes at TTL 300.

### Not yet verified (needs a human)

- `/login` with the rotated `JWT_SECRET`
- Adding an official with a photo (exercises Cloudinary + the 401 auth fix)
- `/contact` and `/join` submissions (these send real email and write real rows)

---

## The "malware" was contact-form spam

Reported as malware; it was a spam bot posting to the two public forms.

```
2026-09-14 |  9   <- the day after the cutover, ON VERCEL
2026-07-24 |  1
2025-12-03 |  3
2025-11-13 |  3
2025-10-13 |  3   <- running since roughly Oct 2025
```

It predates the migration by ~11 months and continued afterwards, which
settles it: not a server compromise, and changing hosts was never going to
stop it. Form spam writes database rows and sends email; it never writes files
a scanner could flag. Monarx reported `malicious: 0`, and
`clamav-incident-scan.txt` was empty.

Both forms accepted anything non-empty. Of 35 stored messages, **35 were spam** -
not one contained a space. On the membership form, 9 of 11 recent rows were the
same bot, hitting both endpoints within seconds of each other using identical
addresses.

Fixed in `lib/spamFilter.ts` and both routes: honeypot field, email format
check, single-token-body rule, vowel-ratio and consonant-run heuristics, link
counting, and a 3-per-IP-per-hour rate limit keyed on a SHA-256 of the address.
Non-Latin scripts skip the letter heuristics, so Hindi submissions are never
affected. Spam is dropped with a 200 and no stored row - an error status only
invites a retry.

Verified against the real data: 35/35 spam messages and 9/9 spam membership
rows blocked; 6 hand-written samples and both genuine recent signups allowed.
The exact payloads from the reported emails were replayed against production
and stored nothing.

---

## What was actually wrong with the VPS

Measured on the running box (13 Sep, four minutes after boot):

```
load average: 47.20, 15.23, 5.54     on 2 vCPUs
Mem: 7.8Gi total, 1.7Gi used         memory was never the problem

%CPU %MEM COMMAND
52.2 10.8 /usr/sbin/clamd --foreground=true
15.2  0.9 uvicorn main:app --host 0.0.0.0 --port 8000   (x5 workers)
13.9  1.1 Runner.Listener run --startuptype service      (GitHub Actions)
11.1  1.2 dockerd
 8.2  0.7 next-server                                    (x2)
```

No malware. A sustained load of 47 on two cores is straightforward
oversubscription - four things competing for the same two CPUs:

1. **`clamd`** - the ClamAV antivirus daemon, the single largest consumer at
   52% CPU and 10.8% of RAM. The scanner, not a virus. On a 2-vCPU box its
   signature database reload alone can stall everything else.
2. **Five `uvicorn` workers** on port 8000 - a Python app that is *not* this
   project. Probably VedJyotix. Confirm before decommissioning.
3. **A self-hosted GitHub Actions runner** - CI builds executing on the same
   two cores that serve production traffic.
4. **Docker** running the Next.js app and Postgres on top of all of the above.

Moving this site to Vercel removes items 3 and 4 from that box. If the Python
app matters to you it needs its own home - it will be just as starved there
once this site leaves.

---

## Step 7 — Decommission the VPS

Only after the domain serves correctly from Vercel for a day or two:

1. The 13 Sep dump at `~/sanatan-backup.sql` is your final backup - store it
   somewhere safe (it contains 105 members' personal data, so not a public
   cloud folder).
2. Check `docker exec sanatan_app ls /app/public/images/officials` in case any
   photo did survive, and re-upload any you find.
3. Stop the stack: `docker compose down`
4. Cancel or wipe the VPS.

If you suspect the box was compromised, do not reuse its SSH keys, and rebuild
rather than clean it.

---

## What changed in the code

| File | Change |
|---|---|
| `app/api/upload-official-image/route.ts` | Writes to Cloudinary instead of the local filesystem (which is read-only on Vercel). Returns `{ url }` instead of `{ filename }`. |
| `lib/cloudinary.ts` | **New.** Cloudinary config + upload helper. |
| `lib/officialImage.ts` | **New.** Resolves `imagePath` to a URL, falling back to `/images/officials/<name>` for any legacy filename already in the database. |
| `app/officials/page.tsx` | Sends the admin `Authorization` header on upload and create; renders via the helper. |
| `app/add-official/page.tsx` | Same auth fix; reads `data.url`. |
| `package.json` | `build` now runs `prisma generate` first - Vercel caches `node_modules`, so without this the Prisma client goes stale. |
| `next.config.mjs` | Dropped `generateBuildId: Date.now()`. It was a VPS chunk-mismatch workaround and would defeat Vercel's build and ISR caching on every deploy. |
| `.env.example` | Documents the Neon + Cloudinary variables. |

### Bug fixed along the way

`POST /api/officials` and `POST /api/upload-official-image` both call
`verifyAdminToken`, which requires an `Authorization: Bearer <jwt>` header, but
neither page was sending one. **Adding an official has been returning 401 for
everyone.** Both call sites now send the token from `localStorage`.

## Files that are now dead weight

These relate only to the VPS and can be deleted once the migration is done:
`Dockerfile`, `docker-compose.yml`, `docker-compose.local.yml`, `.dockerignore`,
`ecosystem.config.js`, `scripts/deploy.sh`, `scripts/init-db.sh`,
`prisma/dev.db`, `id_rsa.pub` (empty), and the `*.bak` files.
