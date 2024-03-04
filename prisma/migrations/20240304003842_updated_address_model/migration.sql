/*
  Warnings:

  - You are about to drop the column `address_type` on the `patient_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_address` DROP COLUMN `address_type`,
    ADD COLUMN `adress_type` VARCHAR(150) NULL,
    MODIFY `region` VARCHAR(150) NULL,
    MODIFY `province` VARCHAR(150) NULL,
    MODIFY `district` VARCHAR(150) NULL,
    MODIFY `municipality` VARCHAR(150) NULL,
    MODIFY `barangay` VARCHAR(150) NULL,
    MODIFY `purok` VARCHAR(150) NULL;
