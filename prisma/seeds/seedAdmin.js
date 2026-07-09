import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test123", 10);

  await prisma.admin.upsert({
    where: {
      emails: "afrazmuhmmad310@gmail.com",
    },
    update: {},
    create: {
      name: "AfrazHussain",
      emails: "afrazmuhmmad310@gmail.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Super Admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });