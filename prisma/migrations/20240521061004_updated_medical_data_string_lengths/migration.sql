-- AlterTable
ALTER TABLE `patient_medical_data` MODIFY `admitting_diagnosis` VARCHAR(1000) NULL,
    MODIFY `final_diagnosis` VARCHAR(1000) NULL,
    MODIFY `duration_of_problems` VARCHAR(1000) NULL,
    MODIFY `previous_treatment` VARCHAR(1000) NULL,
    MODIFY `present_treatment_plan` VARCHAR(1000) NULL,
    MODIFY `health_accessibility_problem` VARCHAR(1000) NULL,
    MODIFY `remarks` VARCHAR(1000) NULL;
