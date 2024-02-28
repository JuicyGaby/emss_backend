/*
  Warnings:

  - You are about to drop the column `address` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `fname` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `mname` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `designations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `first_name` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_access_rights` ADD COLUMN `employee_department` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `address`,
    DROP COLUMN `fname`,
    DROP COLUMN `is_active`,
    DROP COLUMN `lname`,
    DROP COLUMN `mname`,
    ADD COLUMN `contact_number` VARCHAR(20) NULL,
    ADD COLUMN `educational_status` VARCHAR(50) NULL,
    ADD COLUMN `first_name` VARCHAR(50) NOT NULL,
    ADD COLUMN `gender` VARCHAR(50) NULL,
    ADD COLUMN `last_name` VARCHAR(50) NOT NULL,
    ADD COLUMN `living_arrangement` VARCHAR(50) NULL,
    ADD COLUMN `middle_name` VARCHAR(50) NULL,
    ADD COLUMN `monthly_income` VARCHAR(50) NULL,
    ADD COLUMN `nationality` VARCHAR(50) NULL,
    ADD COLUMN `occupation` VARCHAR(50) NULL,
    ADD COLUMN `ph_membership_number` VARCHAR(50) NULL,
    ADD COLUMN `ph_membership_type` VARCHAR(50) NULL,
    ADD COLUMN `place_of_birth` VARCHAR(100) NULL,
    ADD COLUMN `religion` VARCHAR(50) NULL,
    MODIFY `civil_status` VARCHAR(50) NULL;

-- DropTable
DROP TABLE `departments`;

-- DropTable
DROP TABLE `designations`;

-- CreateTable
CREATE TABLE `patient_permanent_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `region` VARCHAR(50) NULL,
    `province` VARCHAR(50) NULL,
    `district` VARCHAR(50) NULL,
    `municipality` VARCHAR(50) NULL,
    `barangay` VARCHAR(50) NULL,
    `purok` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_temporary_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `region` VARCHAR(50) NULL,
    `province` VARCHAR(50) NULL,
    `district` VARCHAR(50) NULL,
    `municipality` VARCHAR(50) NULL,
    `barangay` VARCHAR(50) NULL,
    `purok` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_educ_attainment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `highest_educ_level` VARCHAR(50) NULL,
    `educational_status` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_permanent_address` ADD CONSTRAINT `patient_permanent_address_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_temporary_address` ADD CONSTRAINT `patient_temporary_address_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_educ_attainment` ADD CONSTRAINT `patient_educ_attainment_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
