/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `regDesc` on the `ph_barangays` table. All the data in the column will be lost.
  - Added the required column `regCode` to the `ph_barangays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `ph_barangays` DROP COLUMN `regDesc`,
    ADD COLUMN `regCode` VARCHAR(50) NOT NULL;
