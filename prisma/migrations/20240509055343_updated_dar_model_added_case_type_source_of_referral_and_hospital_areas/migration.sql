/*
  Warnings:

  - You are about to drop the column `area` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `case_type` on the `daily_activity_report` table. All the data in the column will be lost.
  - You are about to drop the column `source_of_referral` on the `daily_activity_report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `daily_activity_report` DROP COLUMN `area`,
    DROP COLUMN `case_type`,
    DROP COLUMN `source_of_referral`,
    ADD COLUMN `area_id` INTEGER NULL,
    ADD COLUMN `case_type_id` INTEGER NULL,
    ADD COLUMN `source_of_referral_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `source_of_referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital_area` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `case_type` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `daily_activity_report` ADD CONSTRAINT `daily_activity_report_source_of_referral_id_fkey` FOREIGN KEY (`source_of_referral_id`) REFERENCES `source_of_referral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_activity_report` ADD CONSTRAINT `daily_activity_report_area_id_fkey` FOREIGN KEY (`area_id`) REFERENCES `hospital_area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_activity_report` ADD CONSTRAINT `daily_activity_report_case_type_id_fkey` FOREIGN KEY (`case_type_id`) REFERENCES `case_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
