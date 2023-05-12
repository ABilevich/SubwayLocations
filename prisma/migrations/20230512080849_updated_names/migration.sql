/*
  Warnings:

  - You are about to drop the column `isOpen` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `Store` table. All the data in the column will be lost.
  - Added the required column `state_id` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_stateId_fkey";

-- DropIndex
DROP INDEX "state_idx";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "isOpen",
DROP COLUMN "stateId",
ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "state_idx" ON "Store"("state_id");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
