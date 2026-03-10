#!/bin/bash
# NOVALEAP - Quick Start Commands
# Copy-paste friendly setup and development commands

# ============================================
# 1. INITIAL SETUP
# ============================================

# Install all dependencies (already done)
npm install

# Generate Prisma Client
npx prisma generate

# Set environment and create migration
$env:DATABASE_URL="mysql://root:@localhost:3306/novaleap"
npx prisma migrate dev --name init

# Optional: Seed the database
# npx prisma db seed


# ============================================
# 2. DEVELOPMENT COMMANDS
# ============================================

# Start development server
npm run dev

# Open browser to localhost:3000
# http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint


# ============================================
# 3. DATABASE COMMANDS
# ============================================

# View database in Prisma Studio
npx prisma studio

# Create new migration
npx prisma migrate dev --name add_users_table

# Reset database (⚠️ WARNING: Deletes all data)
npx prisma migrate reset

# Apply pending migrations
npx prisma migrate deploy

# Validate schema
npx prisma validate


# ============================================
# 4. USEFUL SCRIPTS
# ============================================

# Check TypeScript types
npx tsc --noEmit

# Format code (if Prettier added)
npm run format

# Clean build artifacts
rm -r .next out

# Update NPM packages
npm update

# Check for vulnerabilities
npm audit


# ============================================
# 5. DATABASE INITIALIZATION (Manual)
# ============================================

# Create database manually (if not auto-created)
mysql -u root -p -e "CREATE DATABASE novaleap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Show users in database
mysql -u root -p -e "SELECT * FROM novaleap.users;"

# Backup database
mysqldump -u root -p novaleap > novaleap_backup.sql

# Restore database
mysql -u root -p novaleap < novaleap_backup.sql


# ============================================
# 6. GIT SETUP
# ============================================

# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: NOVALEAP project setup with Atomic Design"

# Add remote repository
git remote add origin https://github.com/username/novaleap.git

# Push to remote
git push -u origin main


# ============================================
# 7. DEPLOYMENT (Vercel)
# ============================================

# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy with production environment
vercel --prod

# View deployments
vercel list

# Set environment variables in Vercel
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_APP_URL


# ============================================
# 8. TROUBLESHOOTING
# ============================================

# Rebuild everything (nuclear option)
rm -r node_modules package-lock.json .next
npm install
npx prisma generate
npm run build

# Test build locally
npm run build
npm start

# Check port usage (find what's using port 3000)
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000
