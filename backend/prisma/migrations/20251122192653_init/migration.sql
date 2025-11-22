-- AlterTable
ALTER TABLE "News" ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "newsId" TEXT;

-- CreateIndex
CREATE INDEX "News_processed_idx" ON "News"("processed");

-- CreateIndex
CREATE INDEX "Post_newsId_idx" ON "Post"("newsId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
