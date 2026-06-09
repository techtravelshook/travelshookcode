-- CreateTable
CREATE TABLE `UmrahPackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `shortDesc` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `star` ENUM('STAR_3', 'STAR_4', 'STAR_5') NOT NULL,
    `type` ENUM('RAMADAN', 'MONTHLY', 'NORMAL', 'WOMEN', 'LUXURY', 'CHEAP') NOT NULL,
    `month` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL,
    `makkahHotel` VARCHAR(191) NOT NULL,
    `madinahHotel` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UmrahPackage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageInclusion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageExclusion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `packageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackageImage` ADD CONSTRAINT `PackageImage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `UmrahPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageInclusion` ADD CONSTRAINT `PackageInclusion_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `UmrahPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageExclusion` ADD CONSTRAINT `PackageExclusion_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `UmrahPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
