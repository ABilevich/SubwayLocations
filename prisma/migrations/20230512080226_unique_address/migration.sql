/*
  Warnings:

  - A unique constraint covering the columns `[street_address]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `street_address` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "street_address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_street_address_key" ON "Store"("street_address");
