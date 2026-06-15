/*
  Warnings:

  - Added the required column `section1img` to the `CountryContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section2img` to the `CountryContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `countrycontent` ADD COLUMN `section1img` VARCHAR(191) NOT NULL,
    ADD COLUMN `section2img` VARCHAR(191) NOT NULL;
