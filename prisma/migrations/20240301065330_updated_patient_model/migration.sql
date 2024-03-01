/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `patients` MODIFY `civil_status` VARCHAR(100) NULL,
    MODIFY `first_name` VARCHAR(100) NULL,
    MODIFY `gender` VARCHAR(100) NULL,
    MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `living_arrangement` VARCHAR(100) NULL,
    MODIFY `middle_name` VARCHAR(100) NULL,
    MODIFY `monthly_income` VARCHAR(100) NULL,
    MODIFY `nationality` VARCHAR(100) NULL,
    MODIFY `occupation` VARCHAR(100) NULL,
    MODIFY `ph_membership_number` VARCHAR(100) NULL,
    MODIFY `ph_membership_type` VARCHAR(100) NULL;
