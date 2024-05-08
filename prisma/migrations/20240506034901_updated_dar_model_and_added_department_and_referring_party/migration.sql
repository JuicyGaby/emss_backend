/*
  Warnings:

  - You are about to alter the column `area` on the `daily_activity_report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `case_type` on the `daily_activity_report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` ADD COLUMN `department` VARCHAR(100) NULL,
    ADD COLUMN `referring_party` VARCHAR(100) NULL,
    MODIFY `area` INTEGER NULL,
    MODIFY `case_type` INTEGER NULL;
