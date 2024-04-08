/*
  Warnings:

  - You are about to drop the column `created_by` on the `dar_services` table. All the data in the column will be lost.
  - You are about to drop the column `dar_id` on the `dar_services` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `dar_services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `dar_services` DROP FOREIGN KEY `dar_services_dar_id_fkey`;

-- AlterTable
ALTER TABLE `dar_services` DROP COLUMN `created_by`,
    DROP COLUMN `dar_id`,
    DROP COLUMN `date_created`,
    ADD COLUMN `service_name` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `dar_case_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_service_id` INTEGER NOT NULL,
    `dar_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_case_services` ADD CONSTRAINT `dar_case_services_dar_service_id_fkey` FOREIGN KEY (`dar_service_id`) REFERENCES `dar_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dar_case_services` ADD CONSTRAINT `dar_case_services_dar_id_fkey` FOREIGN KEY (`dar_id`) REFERENCES `daily_activity_report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
