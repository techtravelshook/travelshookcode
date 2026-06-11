/*
  Warnings:

  - Added the required column `apiType` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `flight` ADD COLUMN `apiType` VARCHAR(191) NOT NULL;
