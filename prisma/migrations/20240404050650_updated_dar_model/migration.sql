/*
  Warnings:

  - You are about to drop the column `created_by` on the `dar_swa_services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` ADD COLUMN `area` VARCHAR(100) NULL,
    ADD COLUMN `case_type` VARCHAR(100) NULL,
    ADD COLUMN `diagnosis` VARCHAR(100) NULL,
    ADD COLUMN `house_hold_size` VARCHAR(100) NULL,
    ADD COLUMN `informant` VARCHAR(100) NULL,
    ADD COLUMN `interview_end_time` VARCHAR(100) NULL,
    ADD COLUMN `interview_start_time` VARCHAR(100) NULL,
    ADD COLUMN `relationship_to_patient` VARCHAR(100) NULL,
    ADD COLUMN `remarks` VARCHAR(255) NULL,
    ADD COLUMN `source_of_referral` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `dar_swa_services` DROP COLUMN `created_by`;
