-- AlterTable
ALTER TABLE `daily_activity_report` ADD COLUMN `created_by` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `dar_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_id` INTEGER NOT NULL,
    `created_by` VARCHAR(100) NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dar_swa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admission_date` DATETIME(3) NULL,
    `created_by` VARCHAR(100) NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_services` ADD CONSTRAINT `dar_services_dar_id_fkey` FOREIGN KEY (`dar_id`) REFERENCES `daily_activity_report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
