/*
  Warnings:

  - You are about to drop the column `patient_family_composition_id` on the `patient_family_info` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `patient_family_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `patient_family_info` DROP FOREIGN KEY `patient_family_info_patient_family_composition_id_fkey`;

-- AlterTable
ALTER TABLE `patient_family_info` DROP COLUMN `patient_family_composition_id`,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `patient_family_info` ADD CONSTRAINT `patient_family_info_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
