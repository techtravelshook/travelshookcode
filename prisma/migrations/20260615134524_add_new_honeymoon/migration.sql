-- CreateTable
CREATE TABLE `Package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `shortDesc` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `durationDays` INTEGER NOT NULL,
    `durationNights` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `star` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Package_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `durationNights` INTEGER NOT NULL,
    `starRating` INTEGER NOT NULL,
    `roomType` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `packageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FlightDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departureCities` JSON NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `airlines` JSON NOT NULL,
    `classOption` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,

    UNIQUE INDEX `FlightDetail_packageId_key`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transportation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `routeDetails` TEXT NOT NULL,
    `extras` TEXT NOT NULL,
    `packageId` INTEGER NOT NULL,

    UNIQUE INDEX `Transportation_packageId_key`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisaAssistance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supportedRegion` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `requiredDocuments` JSON NOT NULL,
    `packageId` INTEGER NOT NULL,

    UNIQUE INDEX `VisaAssistance_packageId_key`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sightseeing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` JSON NOT NULL,
    `romanticExperiences` JSON NOT NULL,
    `guideIncluded` BOOLEAN NOT NULL DEFAULT true,
    `packageId` INTEGER NOT NULL,

    UNIQUE INDEX `Sightseeing_packageId_key`(`packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlightDetail` ADD CONSTRAINT `FlightDetail_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transportation` ADD CONSTRAINT `Transportation_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisaAssistance` ADD CONSTRAINT `VisaAssistance_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
