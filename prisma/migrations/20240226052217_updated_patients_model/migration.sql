/*
  Warnings:

  - You are about to alter the column `fname` on the `patients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `lname` on the `patients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `address` VARCHAR(150) NULL,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `birth_date` DATE NULL,
    ADD COLUMN `civil_status` VARCHAR(20) NULL,
    ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `education_attainment` VARCHAR(50) NULL,
    ADD COLUMN `is_active` TINYINT NOT NULL DEFAULT 1,
    ADD COLUMN `mname` VARCHAR(50) NULL,
    ADD COLUMN `sex` VARCHAR(10) NULL,
    MODIFY `fname` VARCHAR(50) NOT NULL,
    MODIFY `lname` VARCHAR(50) NOT NULL;
