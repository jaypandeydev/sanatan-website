# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Prisma client must be generated BEFORE build
RUN npx prisma generate

# Build Next.js
RUN npm run build

# ---- Runtime (locked down) ----
FROM node:22-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only what runtime needs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

USER app
EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]