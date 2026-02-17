# Vercel Deployment Guide

## Environment Variables

For successful deployment on Vercel, you need to set these environment variables in your Vercel dashboard:

### Required Environment Variables

1. **DATABASE_URL**
   - Your PostgreSQL connection string
   - Format: `postgresql://username:password@host:port/database`
   - Get this from your database provider (Supabase, Neon, Railway, etc.)

2. **NEXTAUTH_SECRET**
   - A random secret string for NextAuth.js
   - Generate with: `openssl rand -base64 32`
   - Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

3. **NEXTAUTH_URL**
   - Your deployed app URL
   - Format: `https://your-app.vercel.app`
   - Vercel automatically sets this, but you can override if needed

### Optional Environment Variables

4. **EMAIL_HOST**, **EMAIL_PORT**, **EMAIL_USER**, **EMAIL_PASS**
   - For email functionality (contact forms, notifications)
   - Example: Gmail SMTP settings

## Database Setup

### Option 1: Use Vercel Postgres (Recommended)
1. In Vercel dashboard, go to Storage
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

### Option 2: External Database
1. Set up a PostgreSQL database (Supabase, Neon, Railway, etc.)
2. Add the connection string to `DATABASE_URL`

## Deployment Steps

1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Set environment variables** in Vercel dashboard
4. **Deploy** - Vercel will automatically run:
   - `npm install`
   - `prisma generate`
   - `npm run build`

## Post-Deployment

After deployment, you may need to run the database seed:

1. Go to Vercel Functions tab
2. Find your `/api/proxy` route
3. Or manually trigger seeding by visiting a protected route

## Troubleshooting

### "DATABASE_URL not found" Error
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check the connection string format
- Verify database is accessible

### Build Failures
- Check that all environment variables are set
- Ensure Prisma version compatibility (6.19.2)
- Verify database schema matches

### Authentication Issues
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your deployment URL
- Ensure database tables are created

## Local Development

To test locally with production-like setup:

1. Copy environment variables from Vercel
2. Create `.env.local` file
3. Run: `npm run build:with-db`
