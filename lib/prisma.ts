//lib/prisma.ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  // Prevent multiple instances in dev (Next.js hot reload)
  var prisma: PrismaClient | undefined;
  var pgPool: Pool | undefined;
}

const pgPool =
  global.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pgPool),
    log: process.env.PRISMA_LOG_QUERIES === "true" ? ["query"] : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.pgPool = pgPool;
}
