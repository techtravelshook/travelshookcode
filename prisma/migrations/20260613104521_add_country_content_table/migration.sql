-- CreateTable
CREATE TABLE `CountryContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `apiType` VARCHAR(191) NOT NULL,
    `section1Title` VARCHAR(191) NOT NULL,
    `section1Content` TEXT NOT NULL,
    `section2Title` VARCHAR(191) NOT NULL,
    `section2Content` TEXT NOT NULL,
    `faqs` JSON NOT NULL,

    UNIQUE INDEX `CountryContent_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
