-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "coords" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "state_idx" ON "Store"("stateId");

-- CreateIndex
CREATE INDEX "city_idx" ON "Store"("city");

-- CreateIndex
CREATE INDEX "country_idx" ON "Store"("country");
