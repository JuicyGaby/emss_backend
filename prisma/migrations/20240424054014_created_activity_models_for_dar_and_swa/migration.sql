/*
  Warnings:

  - You are about to drop the column `remarks` on the `patient_activity_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_activity_logs` DROP COLUMN `remarks`;

-- CreateTable
CREATE TABLE `dar_activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_id` INTEGER NOT NULL,
    `activity` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `swa_activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `swa_id` INTEGER NOT NULL,
    `activity` VARCHAR(100) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_activity_logs` ADD CONSTRAINT `dar_activity_logs_dar_id_fkey` FOREIGN KEY (`dar_id`) REFERENCES `daily_activity_report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `swa_activity_logs` ADD CONSTRAINT `swa_activity_logs_swa_id_fkey` FOREIGN KEY (`swa_id`) REFERENCES `dar_swa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
