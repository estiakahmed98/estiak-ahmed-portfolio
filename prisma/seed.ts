import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

// Handle case where DATABASE_URL might not be available during build
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log("⚠️  DATABASE_URL not found, skipping seed");
  process.exit(0);
}

const pgPool = new Pool({ connectionString: databaseUrl });
const prisma = new PrismaClient({
  adapter: new PrismaPg(pgPool),
});

async function main() {
  const email = "estiakahmed898@gmail.com";
  const password = "estiakahmed898";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("✅ Admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name: "Estiak Ahmed",
      role: "USER",
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Admin created");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
