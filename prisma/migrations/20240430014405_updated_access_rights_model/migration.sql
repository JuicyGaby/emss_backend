/*
  Warnings:

  - You are about to drop the column `can_create` on the `access_rights` table. All the data in the column will be lost.
  - You are about to drop the column `can_delete` on the `access_rights` table. All the data in the column will be lost.
  - You are about to drop the column `can_manage` on the `access_rights` table. All the data in the column will be lost.
  - You are about to drop the column `can_update` on the `access_rights` table. All the data in the column will be lost.
  - You are about to drop the column `can_view` on the `access_rights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `access_rights` DROP COLUMN `can_create`,
    DROP COLUMN `can_delete`,
    DROP COLUMN `can_manage`,
    DROP COLUMN `can_update`,
    DROP COLUMN `can_view`,
    ADD COLUMN `can_manage_assesment_tool` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `can_manage_dar` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `can_manage_social_worker` TINYINT NOT NULL DEFAULT 0;
