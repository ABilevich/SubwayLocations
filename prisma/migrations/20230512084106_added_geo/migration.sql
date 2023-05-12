/*
  Warnings:

  - You are about to drop the column `coords` on the `Store` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "coords",
ADD COLUMN     "geo_coords" geometry(Point, 4326);

-- CreateIndex
CREATE INDEX "location_idx" ON "Store" USING GIST ("geo_coords");
