/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `education_attainment` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `educational_status` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the `patient_permanent_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient_temporary_address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `patient_permanent_address` DROP FOREIGN KEY `patient_permanent_address_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `patient_temporary_address` DROP FOREIGN KEY `patient_temporary_address_patient_id_fkey`;

-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `education_attainment`,
    DROP COLUMN `educational_status`;

-- DropTable
DROP TABLE `patient_permanent_address`;

-- DropTable
DROP TABLE `patient_temporary_address`;

-- CreateTable
CREATE TABLE `patient_education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `education` VARCHAR(50) NULL,
    `educational_status` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `address_type` ENUM('PERMANENT', 'TEMPORARY') NOT NULL,
    `region` VARCHAR(50) NULL,
    `province` VARCHAR(50) NULL,
    `district` VARCHAR(50) NULL,
    `municipality` VARCHAR(50) NULL,
    `barangay` VARCHAR(50) NULL,
    `purok` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_education` ADD CONSTRAINT `patient_education_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_address` ADD CONSTRAINT `patient_address_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
