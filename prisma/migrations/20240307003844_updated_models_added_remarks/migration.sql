-- AlterTable
ALTER TABLE `patient_interview` ADD COLUMN `remarks` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `patient_medical_data` ADD COLUMN `remarks` VARCHAR(255) NULL,
    MODIFY `duration_of_problems` VARCHAR(255) NULL,
    MODIFY `health_accessibility_problem` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `remarks` VARCHAR(255) NULL;
