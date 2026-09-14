-- AlterTable
ALTER TABLE "Members" ADD COLUMN     "ipHash" TEXT;

-- CreateIndex
CREATE INDEX "Members_ipHash_createdAt_idx" ON "Members"("ipHash", "createdAt");
