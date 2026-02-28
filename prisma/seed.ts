import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'info@sanatanmahaparishad.org';
  const adminPassword = 'admin123';
  const adminName = 'Admin User';

  // Check if admin user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingUser) {
    console.log('Admin user already exists:', adminEmail);
    return;
  }

  // Create admin user if it doesn't exist
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const newUser = await prisma.user.create({
    data: {
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
    }
  });

  console.log('Admin user created successfully:', {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 