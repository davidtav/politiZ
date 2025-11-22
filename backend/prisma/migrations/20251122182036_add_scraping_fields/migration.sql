-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "contentSelector" TEXT,
ADD COLUMN     "dateSelector" TEXT,
ADD COLUMN     "imageSelector" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "itemSelector" TEXT,
ADD COLUMN     "linkSelector" TEXT,
ADD COLUMN     "scrapeType" TEXT,
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "titleSelector" TEXT;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "publishedAt" TIMESTAMP(3);
