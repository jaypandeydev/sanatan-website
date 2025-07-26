FROM node:18-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
COPY prisma ./prisma/

# Install only production deps
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy all source code
COPY . .

# Build Next.js app
RUN npm run build

# Expose PORT from ENV (default 3000)
ENV PORT=3000
EXPOSE $PORT

# Start: run migrations then start app
CMD ["npm", "start"]
