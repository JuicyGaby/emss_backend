/*
  Warnings:

  - You are about to drop the column `fuel_source` on the `patient_monthly_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `light_source` on the `patient_monthly_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `water_source` on the `patient_monthly_expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_monthly_expenses` DROP COLUMN `fuel_source`,
    DROP COLUMN `light_source`,
    DROP COLUMN `water_source`;

-- CreateTable
CREATE TABLE `patient_fuel_source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_monthly_expenses_id` INTEGER NOT NULL,
    `gas` VARCHAR(100) NULL,
    `kerosene` VARCHAR(100) NULL,
    `charcoal` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_light_source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_monthly_expenses_id` INTEGER NOT NULL,
    `electric` VARCHAR(100) NULL,
    `kerosene` VARCHAR(100) NULL,
    `candle` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_water_source` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_monthly_expenses_id` INTEGER NOT NULL,
    `faucet` VARCHAR(100) NULL,
    `deep_well` VARCHAR(100) NULL,
    `spring` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_fuel_source` ADD CONSTRAINT `patient_fuel_source_patient_monthly_expenses_id_fkey` FOREIGN KEY (`patient_monthly_expenses_id`) REFERENCES `patient_monthly_expenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_light_source` ADD CONSTRAINT `patient_light_source_patient_monthly_expenses_id_fkey` FOREIGN KEY (`patient_monthly_expenses_id`) REFERENCES `patient_monthly_expenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_water_source` ADD CONSTRAINT `patient_water_source_patient_monthly_expenses_id_fkey` FOREIGN KEY (`patient_monthly_expenses_id`) REFERENCES `patient_monthly_expenses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
