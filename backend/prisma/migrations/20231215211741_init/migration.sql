/*
  Warnings:

  - You are about to drop the column `longDescription` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Equipment` table. All the data in the column will be lost.
  - You are about to alter the column `height` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `price` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.
  - You are about to alter the column `weight` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isReservedPro" BOOLEAN,
    "price" DECIMAL,
    "ref" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "image" TEXT
);
INSERT INTO "new_Equipment" ("height", "id", "image", "name", "price", "ref", "weight") SELECT "height", "id", "image", "name", "price", "ref", "weight" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
