/*
  Warnings:

  - You are about to alter the column `date_created` on the `daily_activity_report` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` MODIFY `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
