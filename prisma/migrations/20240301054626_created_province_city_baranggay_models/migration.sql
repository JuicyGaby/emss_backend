/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[regCode]` on the table `ph_regions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- CreateTable
CREATE TABLE `ph_provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `psgcCode` VARCHAR(50) NOT NULL,
    `provDesc` VARCHAR(50) NOT NULL,
    `regCode` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ph_city_mun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `psgcCode` VARCHAR(50) NOT NULL,
    `citymunDesc` VARCHAR(50) NOT NULL,
    `regDesc` VARCHAR(50) NOT NULL,
    `provCode` VARCHAR(50) NOT NULL,
    `citymunCode` VARCHAR(50) NOT NULL,
    `regCode` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ph_barangays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `psgcCode` VARCHAR(50) NOT NULL,
    `brgyDesc` VARCHAR(50) NOT NULL,
    `regDesc` VARCHAR(50) NOT NULL,
    `provCode` VARCHAR(50) NOT NULL,
    `citymunCode` VARCHAR(50) NOT NULL,
    `brgyCode` VARCHAR(50) NOT NULL,
    `regCode` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ph_regions_regCode_key` ON `ph_regions`(`regCode`);

-- AddForeignKey
ALTER TABLE `ph_provinces` ADD CONSTRAINT `ph_provinces_regCode_fkey` FOREIGN KEY (`regCode`) REFERENCES `ph_regions`(`regCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ph_city_mun` ADD CONSTRAINT `ph_city_mun_regCode_fkey` FOREIGN KEY (`regCode`) REFERENCES `ph_regions`(`regCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ph_barangays` ADD CONSTRAINT `ph_barangays_regCode_fkey` FOREIGN KEY (`regCode`) REFERENCES `ph_regions`(`regCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
