// lib/spamFilter.ts
//
// Every one of the 35 messages this form received before 15 Sep 2026 was bot
// spam: random alphanumeric names and bodies, harvested emails, random US
// phone numbers. Not one contained a space. These checks target that shape.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fraction of characters that are vowels. Real prose sits around 0.30-0.45;
 *  random strings like "iotGUKXJrXLgfDwRFg" fall far below. */
function vowelRatio(s: string) {
  const letters = s.replace(/[^a-z]/gi, "");
  if (!letters.length) return 1; // non-Latin script (Hindi) - not our concern
  return (letters.match(/[aeiou]/gi)?.length ?? 0) / letters.length;
}

/** Longest run of consecutive consonants - "ScsLveIxCcdbHYvdyWSGkzOf" hits 5+. */
function maxConsonantRun(s: string) {
  const runs = s.replace(/[^a-z]/gi, "").match(/[^aeiou]+/gi) ?? [];
  return runs.reduce((m, r) => Math.max(m, r.length), 0);
}

/** Latin text only: Devanagari and other scripts skip the letter heuristics. */
function isLatin(s: string) {
  return /[a-z]/i.test(s) && !/[ऀ-ॿ]/.test(s);
}

/** True when a Latin-script value looks machine-generated rather than written.
 *  Non-Latin scripts (Devanagari) are always treated as genuine. */
export function looksLikeGibberish(value: string, minLen = 8) {
  const v = (value ?? "").trim();
  if (!isLatin(v) || v.length < minLen) return false;
  return vowelRatio(v) < 0.22 || maxConsonantRun(v) >= 5;
}

export type SpamVerdict = { spam: true; reason: string } | { spam: false };

export function classifyMessage(input: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot - must stay empty
}): SpamVerdict {
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  // 1. Honeypot. Hidden in the DOM, so a human never fills it.
  if ((input.website ?? "").trim() !== "") return { spam: true, reason: "honeypot" };

  if (!name || !email || !message) return { spam: true, reason: "missing-fields" };
  if (!EMAIL_RE.test(email)) return { spam: true, reason: "bad-email" };
  if (name.length > 80 || message.length > 5000) return { spam: true, reason: "too-long" };

  // 2. A real message is more than one word. All 35 spam bodies were single tokens.
  if (!/\s/.test(message) && message.length > 12) return { spam: true, reason: "single-token-body" };

  // 3. Gibberish detection, Latin scripts only.
  for (const [field, value] of [["name", name], ["message", message]] as const) {
    if (!isLatin(value) || value.length < 8) continue;
    if (vowelRatio(value) < 0.22) return { spam: true, reason: `low-vowel-${field}` };
    if (maxConsonantRun(value) >= 5) return { spam: true, reason: `consonant-run-${field}` };
  }

  // 4. Link spam - the common next wave once random-string spam stops working.
  const links = (message.match(/https?:\/\//gi) ?? []).length;
  if (links >= 2) return { spam: true, reason: "multiple-links" };

  return { spam: false };
}


/** The membership form is hit by the same bot as the contact form: valid-looking
 *  email and phone, but random strings in every free-text field. */
export function classifyMembership(input: {
  name?: string;
  email?: string;
  sonDaughterOf?: string;
  residentialAddress?: string;
  membershipNumber?: string | null;
  website?: string; // honeypot
}): SpamVerdict {
  if ((input.website ?? "").trim() !== "") return { spam: true, reason: "honeypot" };

  const email = (input.email ?? "").trim();
  if (!EMAIL_RE.test(email)) return { spam: true, reason: "bad-email" };

  for (const field of ["name", "sonDaughterOf", "residentialAddress"] as const) {
    if (looksLikeGibberish(input[field] ?? "")) {
      return { spam: true, reason: `gibberish-${field}` };
    }
  }

  // Genuine applicants leave membershipNumber blank - it is assigned by the
  // organisation. Every spam row carried a random one.
  if (looksLikeGibberish(input.membershipNumber ?? "", 6)) {
    return { spam: true, reason: "gibberish-membershipNumber" };
  }

  return { spam: false };
}
