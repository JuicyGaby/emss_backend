/*
  Warnings:

  - You are about to drop the column `date` on the `dar_notes` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `dar_notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dar_notes` DROP COLUMN `date`,
    DROP COLUMN `note`,
    ADD COLUMN `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `note_body` VARCHAR(500) NULL,
    ADD COLUMN `note_title` VARCHAR(100) NULL;
