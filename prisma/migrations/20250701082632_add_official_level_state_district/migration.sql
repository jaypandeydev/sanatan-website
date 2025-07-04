-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Official" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "imagePath" TEXT,
    "level" TEXT NOT NULL DEFAULT 'NATIONAL',
    "state" TEXT,
    "district" TEXT
);
INSERT INTO "new_Official" ("address", "designation", "email", "id", "imagePath", "name", "phone") SELECT "address", "designation", "email", "id", "imagePath", "name", "phone" FROM "Official";
DROP TABLE "Official";
ALTER TABLE "new_Official" RENAME TO "Official";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
