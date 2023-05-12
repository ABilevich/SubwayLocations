/*
  Warnings:

  - Added the required column `email_1` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_2` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fax_1` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fax_2` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open_hours` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number_1` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number_2` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinterest` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "email_1" TEXT NOT NULL,
ADD COLUMN     "email_2" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "fax_1" TEXT NOT NULL,
ADD COLUMN     "fax_2" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "open_hours" TEXT NOT NULL,
ADD COLUMN     "phone_number_1" TEXT NOT NULL,
ADD COLUMN     "phone_number_2" TEXT NOT NULL,
ADD COLUMN     "pinterest" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;
