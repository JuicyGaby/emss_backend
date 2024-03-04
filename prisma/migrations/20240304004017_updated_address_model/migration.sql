/*
  Warnings:

  - You are about to drop the column `adress_type` on the `patient_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_address` DROP COLUMN `adress_type`,
    ADD COLUMN `address_type` VARCHAR(150) NULL;
