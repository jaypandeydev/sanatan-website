-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "ipHash" TEXT;

-- CreateIndex
CREATE INDEX "Message_ipHash_createdAt_idx" ON "Message"("ipHash", "createdAt");
