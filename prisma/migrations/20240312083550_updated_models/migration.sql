/*
  Warnings:

  - You are about to alter the column `clothing_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `communication_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `education_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `food_water_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `house_help_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `house_lot_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `medical_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `others_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `others_description` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `total_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `transportation_cost` on the `patient_monthly_expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `patient_fuel_source` MODIFY `gas` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `kerosene` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `charcoal` VARCHAR(100) NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `patient_light_source` MODIFY `electric` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `kerosene` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `candle` VARCHAR(100) NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `patient_monthly_expenses` MODIFY `clothing_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `communication_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `education_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `food_water_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `house_help_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `house_lot_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `medical_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `others_cost` VARCHAR(100) NULL,
    MODIFY `others_description` VARCHAR(100) NULL,
    MODIFY `total_cost` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `transportation_cost` VARCHAR(100) NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `patient_water_source` MODIFY `private_artesian_well` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `public_artesian_well` VARCHAR(100) NULL DEFAULT '0',
    MODIFY `water_district` VARCHAR(100) NULL DEFAULT '0';
