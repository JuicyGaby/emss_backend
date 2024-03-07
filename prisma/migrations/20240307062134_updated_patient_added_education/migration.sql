/*
  Warnings:

  - You are about to drop the `patient_educ_attainment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `patient_educ_attainment` DROP FOREIGN KEY `patient_educ_attainment_patient_id_fkey`;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `education_status` VARCHAR(100) NULL,
    ADD COLUMN `highest_education_level` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `patient_educ_attainment`;
