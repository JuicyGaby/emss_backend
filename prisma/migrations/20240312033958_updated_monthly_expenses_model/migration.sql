-- AlterTable
ALTER TABLE `patient_monthly_expenses` ADD COLUMN `water_source` VARCHAR(100) NULL,
    MODIFY `light_source` VARCHAR(100) NULL,
    MODIFY `fuel_source` VARCHAR(100) NULL,
    MODIFY `transportation_type` VARCHAR(100) NULL;
