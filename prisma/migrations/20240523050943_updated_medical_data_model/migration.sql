/*
  Warnings:

  - You are about to drop the column `admitting_diagnosis` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `duration_of_problems` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `final_diagnosis` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `health_accessibility_problem` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `present_treatment_plan` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `previous_treatment` on the `patient_medical_data` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `patient_medical_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_medical_data` DROP COLUMN `admitting_diagnosis`,
    DROP COLUMN `duration_of_problems`,
    DROP COLUMN `final_diagnosis`,
    DROP COLUMN `health_accessibility_problem`,
    DROP COLUMN `present_treatment_plan`,
    DROP COLUMN `previous_treatment`,
    DROP COLUMN `remarks`,
    ADD COLUMN `created_by` VARCHAR(100) NULL,
    ADD COLUMN `creator_id` INTEGER NULL,
    ADD COLUMN `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `medical_data_note` VARCHAR(500) NULL,
    ADD COLUMN `medical_data_type` VARCHAR(100) NULL;
