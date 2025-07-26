#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Run database migrations
echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client (in case of changes)
echo "🔧 Generating Prisma client..."
npx prisma generate

# Start the application
echo "✅ Starting application..."
npm start