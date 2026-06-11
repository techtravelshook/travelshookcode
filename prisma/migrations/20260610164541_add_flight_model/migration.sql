-- CreateTable
CREATE TABLE `Flight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripType` VARCHAR(191) NOT NULL,
    `airlineName` VARCHAR(191) NOT NULL,
    `airlineLogo` VARCHAR(191) NOT NULL,
    `departureCode` VARCHAR(191) NOT NULL,
    `departureCity` VARCHAR(191) NOT NULL,
    `destinationCode` VARCHAR(191) NOT NULL,
    `destinationCity` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `dates` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
