/*
  Warnings:

  - Made the column `patient_id` on table `patient_interview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `patient_interview` DROP FOREIGN KEY `patient_interview_patient_id_fkey`;

-- AlterTable
ALTER TABLE `patient_interview` MODIFY `patient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `patient_interview` ADD CONSTRAINT `patient_interview_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
