/*
  Warnings:

  - You are about to drop the column `admission_date` on the `dar_swa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dar_swa` DROP COLUMN `admission_date`;

-- CreateTable
CREATE TABLE `dar_swa_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_swa_id` INTEGER NOT NULL,
    `note_title` VARCHAR(100) NULL,
    `note_body` VARCHAR(500) NULL,
    `created_by` VARCHAR(100) NULL,
    `creator_id` INTEGER NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_swa_notes` ADD CONSTRAINT `dar_swa_notes_dar_swa_id_fkey` FOREIGN KEY (`dar_swa_id`) REFERENCES `dar_swa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
