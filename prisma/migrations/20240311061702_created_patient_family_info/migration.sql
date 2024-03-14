/*
  Warnings:

  - You are about to drop the column `household_size` on the `patient_family_composition` table. All the data in the column will be lost.
  - You are about to drop the column `other_source_of_income` on the `patient_family_composition` table. All the data in the column will be lost.
  - You are about to drop the column `per_capita_income` on the `patient_family_composition` table. All the data in the column will be lost.
  - You are about to drop the column `total_household_income` on the `patient_family_composition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_family_composition` DROP COLUMN `household_size`,
    DROP COLUMN `other_source_of_income`,
    DROP COLUMN `per_capita_income`,
    DROP COLUMN `total_household_income`;

-- CreateTable
CREATE TABLE `patient_family_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_family_composition_id` INTEGER NOT NULL,
    `other_source_of_income` VARCHAR(200) NULL,
    `household_size` VARCHAR(50) NULL,
    `total_household_income` VARCHAR(50) NULL,
    `per_capita_income` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_family_info` ADD CONSTRAINT `patient_family_info_patient_family_composition_id_fkey` FOREIGN KEY (`patient_family_composition_id`) REFERENCES `patient_family_composition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
