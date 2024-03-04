-- AlterTable
ALTER TABLE `patient_family_composition` MODIFY `full_name` VARCHAR(200) NULL,
    MODIFY `civil_status` VARCHAR(200) NULL,
    MODIFY `relationship` VARCHAR(200) NULL,
    MODIFY `educational_attainment` VARCHAR(200) NULL,
    MODIFY `occupation` VARCHAR(200) NULL,
    MODIFY `monthly_income` VARCHAR(200) NULL,
    MODIFY `other_source_of_income` VARCHAR(200) NULL;
