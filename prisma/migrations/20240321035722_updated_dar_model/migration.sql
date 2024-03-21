/*
  Warnings:

  - You are about to drop the column `direct_contributor` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `indirect_contributor` on the `daily_activity_report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` DROP COLUMN `direct_contributor`,
    DROP COLUMN `indirect_contributor`,
    ADD COLUMN `contributor_type` VARCHAR(50) NULL;
