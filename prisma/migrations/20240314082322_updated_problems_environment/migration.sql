/*
  Warnings:

  - Added the required column `remarks` to the `patient_problems_environment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient_problems_environment` ADD COLUMN `remarks` VARCHAR(255) NOT NULL;
