/*
  Warnings:

  - You are about to drop the column `particular1` on the `patient_monthly_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `particular2` on the `patient_monthly_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `total_monthly_expenses` on the `patient_monthly_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `water_source` on the `patient_monthly_expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_monthly_expenses` DROP COLUMN `particular1`,
    DROP COLUMN `particular2`,
    DROP COLUMN `total_monthly_expenses`,
    DROP COLUMN `water_source`,
    ADD COLUMN `clothing_cost` INTEGER NULL,
    ADD COLUMN `communication_cost` INTEGER NULL,
    ADD COLUMN `education_cost` INTEGER NULL,
    ADD COLUMN `food_water_cost` INTEGER NULL,
    ADD COLUMN `house_help_cost` INTEGER NULL,
    ADD COLUMN `house_lot_cost` INTEGER NULL,
    ADD COLUMN `medical_cost` INTEGER NULL,
    ADD COLUMN `others_cost` INTEGER NULL,
    ADD COLUMN `others_description` VARCHAR(255) NULL,
    ADD COLUMN `total_cost` INTEGER NULL,
    ADD COLUMN `transportation_cost` INTEGER NULL,
    ADD COLUMN `transportation_type` VARCHAR(50) NULL,
    MODIFY `light_source` VARCHAR(50) NULL,
    MODIFY `remarks` VARCHAR(500) NULL;
