-- CreateTable
CREATE TABLE `dar_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_id` INTEGER NOT NULL,
    `note` VARCHAR(255) NULL,
    `created_by` VARCHAR(100) NULL,
    `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_notes` ADD CONSTRAINT `dar_notes_dar_id_fkey` FOREIGN KEY (`dar_id`) REFERENCES `daily_activity_report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
