-- AlterTable
ALTER TABLE `patient_monthly_expenses` ADD COLUMN `fuel_source_cost` VARCHAR(100) NULL DEFAULT '0',
    ADD COLUMN `fuel_source_type` VARCHAR(255) NULL DEFAULT '0',
    ADD COLUMN `light_source_cost` VARCHAR(100) NULL DEFAULT '0',
    ADD COLUMN `light_source_type` VARCHAR(255) NULL DEFAULT '0',
    ADD COLUMN `water_source_cost` VARCHAR(100) NULL DEFAULT '0',
    ADD COLUMN `water_source_type` VARCHAR(255) NULL DEFAULT '0',
    MODIFY `transportation_type` VARCHAR(300) NULL;
