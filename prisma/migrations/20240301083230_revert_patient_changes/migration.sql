/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `patient_interview_id` on the `patients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_patient_interview_id_fkey`;

-- AlterTable
ALTER TABLE `patient_interview` ADD COLUMN `patient_id` INTEGER NULL,
    MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `patients` DROP COLUMN `patient_interview_id`;

-- AddForeignKey
ALTER TABLE `patient_interview` ADD CONSTRAINT `patient_interview_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
