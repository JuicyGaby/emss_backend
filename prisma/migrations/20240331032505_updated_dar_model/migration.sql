/*
  Warnings:

  - You are about to drop the column `address` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `admission_date` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `case_type` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `civil_status` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `contributor_type` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `educational_attainment` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `household_size` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `informant_name` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `interview_end_time` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `interview_start_time` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_income` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `non_phic_classification` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `patient_name` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `phic_classification` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `referral_source` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `relationship_to_patient` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `sectoral_grouping` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `daily_activity_report` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `daily_activity_report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` DROP COLUMN `address`,
    DROP COLUMN `admission_date`,
    DROP COLUMN `age`,
    DROP COLUMN `area`,
    DROP COLUMN `case_type`,
    DROP COLUMN `civil_status`,
    DROP COLUMN `contributor_type`,
    DROP COLUMN `diagnosis`,
    DROP COLUMN `educational_attainment`,
    DROP COLUMN `household_size`,
    DROP COLUMN `informant_name`,
    DROP COLUMN `interview_end_time`,
    DROP COLUMN `interview_start_time`,
    DROP COLUMN `monthly_income`,
    DROP COLUMN `non_phic_classification`,
    DROP COLUMN `occupation`,
    DROP COLUMN `patient_name`,
    DROP COLUMN `phic_classification`,
    DROP COLUMN `referral_source`,
    DROP COLUMN `relationship_to_patient`,
    DROP COLUMN `religion`,
    DROP COLUMN `sectoral_grouping`,
    DROP COLUMN `sex`,
    ADD COLUMN `creator_id` INTEGER NULL,
    ADD COLUMN `patient_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `daily_activity_report` ADD CONSTRAINT `daily_activity_report_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
