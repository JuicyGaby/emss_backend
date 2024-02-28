/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `interview_time` VARCHAR(50) NULL,
    MODIFY `admission_date_and_time` DATETIME NULL;
