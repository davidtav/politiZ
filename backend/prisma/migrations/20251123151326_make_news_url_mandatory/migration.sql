/*
  Warnings:

  - Made the column `url` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "sourceUrl" SET NOT NULL,
ALTER COLUMN "sourceUrl" SET DEFAULT '',
ALTER COLUMN "sourceUrl" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "url" SET NOT NULL;
