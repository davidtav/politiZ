-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "scrapeType" TEXT,
ADD COLUMN     "sourceUrl" TEXT[] DEFAULT ARRAY[]::TEXT[];
