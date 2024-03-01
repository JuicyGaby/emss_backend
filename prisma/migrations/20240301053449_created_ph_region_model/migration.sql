/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- CreateTable
CREATE TABLE `ph_regions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `psgcCode` VARCHAR(50) NOT NULL,
    `regDesc` VARCHAR(50) NOT NULL,
    `regCode` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
