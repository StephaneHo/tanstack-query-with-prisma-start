-- CreateTable
CREATE TABLE "Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "height" TEXT,
    "weight" TEXT,
    "image" TEXT NOT NULL
);
