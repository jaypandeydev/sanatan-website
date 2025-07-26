-- CreateEnum
CREATE TYPE "OfficialLevel" AS ENUM ('NATIONAL', 'STATE', 'DISTRICT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Official" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "imagePath" TEXT,
    "level" "OfficialLevel" NOT NULL DEFAULT 'NATIONAL',
    "state" TEXT,
    "district" TEXT,

    CONSTRAINT "Official_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "membershipType" TEXT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "sonDaughterOf" TEXT NOT NULL,
    "profession" TEXT,
    "designation" TEXT,
    "identityCardNumber" TEXT,
    "residentialAddress" TEXT NOT NULL,
    "contactPhone" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otherDetails" TEXT,
    "membershipNumber" TEXT,
    "dateOfApplication" TIMESTAMP(3),
    "introducedBy" TEXT,
    "introducer" TEXT,
    "createdAt" TIMESTAMP(3),
    "membershipStatus" TEXT,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");
