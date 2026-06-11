/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `flight` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Flight_slug_key` ON `Flight`(`slug`);
