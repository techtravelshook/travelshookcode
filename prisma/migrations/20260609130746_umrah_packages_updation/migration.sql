-- AlterTable
ALTER TABLE `umrahpackage` ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `star` ENUM('STAR_1', 'STAR_2', 'STAR_3', 'STAR_4', 'STAR_5') NOT NULL;

-- CreateTable
CREATE TABLE `HolidayPackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `shortDesc` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `star` ENUM('STAR_1', 'STAR_2', 'STAR_3', 'STAR_4', 'STAR_5') NOT NULL,
    `type` ENUM('HOLIDAY', 'CITY_BREAK', 'INCLUSIVE_HOLIDAY', 'BEACH_HOLIDAY', 'FAMILY_HOLIDAY', 'Last_Minute_Holidays') NOT NULL,
    `month` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL,
    `makkahHotel` VARCHAR(191) NULL,
    `madinahHotel` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HolidayPackage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayPackageImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `slideTitle` VARCHAR(191) NULL,
    `slideDesc` VARCHAR(191) NULL,
    `holidayPackageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayPackageItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `holidayPackageId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `originalPrice` DOUBLE NULL,
    `rating` DOUBLE NULL,
    `reviews` INTEGER NULL,
    `duration` VARCHAR(191) NULL,
    `accent` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayBreaks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `shortDesc` TEXT NOT NULL,
    `rating` ENUM('STAR_1', 'STAR_2', 'STAR_3', 'STAR_4', 'STAR_5') NOT NULL,
    `type` ENUM('HOLIDAY', 'CITY_BREAK', 'INCLUSIVE_HOLIDAY', 'BEACH_HOLIDAY', 'FAMILY_HOLIDAY', 'Last_Minute_Holidays') NOT NULL,
    `month` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayBreakImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `holidayBreakId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayBreakFeatures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `holidayBreakId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HolidayPackageImage` ADD CONSTRAINT `HolidayPackageImage_holidayPackageId_fkey` FOREIGN KEY (`holidayPackageId`) REFERENCES `HolidayPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HolidayPackageItem` ADD CONSTRAINT `HolidayPackageItem_holidayPackageId_fkey` FOREIGN KEY (`holidayPackageId`) REFERENCES `HolidayPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HolidayBreakImage` ADD CONSTRAINT `HolidayBreakImage_holidayBreakId_fkey` FOREIGN KEY (`holidayBreakId`) REFERENCES `HolidayBreaks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HolidayBreakFeatures` ADD CONSTRAINT `HolidayBreakFeatures_holidayBreakId_fkey` FOREIGN KEY (`holidayBreakId`) REFERENCES `HolidayBreaks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
