-- CreateTable
CREATE TABLE "Members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "membershipType" TEXT,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
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
    "dateOfApplication" DATETIME,
    "introducedBy" TEXT,
    "introducer" TEXT,
    "createdAt" DATETIME,
    "membershipStatus" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");
