# Environment Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Prisma Configuration (optional)
PRISMA_LOG_QUERIES="false"
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Set up your PostgreSQL database and update the DATABASE_URL

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Push database schema:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Authentication Routes

- Login: `/login`
- Register: `/register`
- Dashboard: `/dashboard` (protected)

## Default Admin User

After setting up, you can create an admin user through the registration page or directly in the database.
