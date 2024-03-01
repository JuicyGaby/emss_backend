/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `psgcCode` on the `ph_barangays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `ph_barangays` DROP COLUMN `psgcCode`;
