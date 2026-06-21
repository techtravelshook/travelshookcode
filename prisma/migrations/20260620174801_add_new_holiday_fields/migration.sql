/*
  Warnings:

  - Added the required column `bestTimeToVisit` to the `HolidayBreaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `HolidayBreaks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `HolidayBreaks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `holidaybreaks` ADD COLUMN `bestTimeToVisit` VARCHAR(191) NOT NULL,
    ADD COLUMN `desc` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Highlight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `holidayBreakId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_holidayBreakId_fkey` FOREIGN KEY (`holidayBreakId`) REFERENCES `HolidayBreaks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
