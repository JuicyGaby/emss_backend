/*
  Warnings:

  - You are about to alter the column `full_name` on the `patient_family_composition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to alter the column `civil_status` on the `patient_family_composition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(50)`.
  - You are about to alter the column `relationship` on the `patient_family_composition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(150)`.
  - You are about to alter the column `educational_attainment` on the `patient_family_composition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to alter the column `occupation` on the `patient_family_composition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE `patient_family_composition` MODIFY `full_name` VARCHAR(100) NULL,
    MODIFY `age` VARCHAR(100) NULL,
    MODIFY `civil_status` VARCHAR(50) NULL,
    MODIFY `relationship` VARCHAR(150) NULL,
    MODIFY `educational_attainment` VARCHAR(100) NULL,
    MODIFY `occupation` VARCHAR(150) NULL;
