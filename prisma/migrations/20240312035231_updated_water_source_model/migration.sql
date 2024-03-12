/*
  Warnings:

  - You are about to drop the column `deep_well` on the `patient_water_source` table. All the data in the column will be lost.
  - You are about to drop the column `faucet` on the `patient_water_source` table. All the data in the column will be lost.
  - You are about to drop the column `spring` on the `patient_water_source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `patient_water_source` DROP COLUMN `deep_well`,
    DROP COLUMN `faucet`,
    DROP COLUMN `spring`,
    ADD COLUMN `private_artesian_well` VARCHAR(100) NULL,
    ADD COLUMN `public_artesian_well` VARCHAR(100) NULL,
    ADD COLUMN `water_district` VARCHAR(100) NULL;
