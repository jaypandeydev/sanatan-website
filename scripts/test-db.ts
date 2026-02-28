import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const officials = await prisma.official.findMany();
    console.log('Officials count:', officials.length);

    const users = await prisma.user.findMany();
    console.log('Users:', users.map(u => u.email));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
