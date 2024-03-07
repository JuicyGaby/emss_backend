/*
  Warnings:

  - You are about to drop the column `sub_classification` on the `patient_mswd_classification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_health_and_mental_health` ADD COLUMN `remarks` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `patient_mswd_classification` DROP COLUMN `sub_classification`,
    ADD COLUMN `main_classification_type` VARCHAR(100) NULL,
    ADD COLUMN `remarks` VARCHAR(255) NULL,
    ADD COLUMN `sub_classification_type` VARCHAR(50) NULL,
    MODIFY `main_classification` VARCHAR(100) NULL,
    MODIFY `membership_to_marginalized_sector` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `patient_descrimination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `discrimination_type` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_descrimination` ADD CONSTRAINT `patient_descrimination_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
