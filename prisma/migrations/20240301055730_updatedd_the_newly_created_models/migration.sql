/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `regCode` on the `ph_barangays` table. All the data in the column will be lost.
  - You are about to drop the column `regCode` on the `ph_city_mun` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brgyCode]` on the table `ph_barangays` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[citymunCode]` on the table `ph_city_mun` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provCode]` on the table `ph_provinces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provCode` to the `ph_provinces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ph_barangays` DROP FOREIGN KEY `ph_barangays_regCode_fkey`;

-- DropForeignKey
ALTER TABLE `ph_city_mun` DROP FOREIGN KEY `ph_city_mun_regCode_fkey`;

-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- AlterTable
ALTER TABLE `ph_barangays` DROP COLUMN `regCode`;

-- AlterTable
ALTER TABLE `ph_city_mun` DROP COLUMN `regCode`;

-- AlterTable
ALTER TABLE `ph_provinces` ADD COLUMN `provCode` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ph_barangays_brgyCode_key` ON `ph_barangays`(`brgyCode`);

-- CreateIndex
CREATE UNIQUE INDEX `ph_city_mun_citymunCode_key` ON `ph_city_mun`(`citymunCode`);

-- CreateIndex
CREATE UNIQUE INDEX `ph_provinces_provCode_key` ON `ph_provinces`(`provCode`);

-- AddForeignKey
ALTER TABLE `ph_city_mun` ADD CONSTRAINT `ph_city_mun_provCode_fkey` FOREIGN KEY (`provCode`) REFERENCES `ph_provinces`(`provCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ph_barangays` ADD CONSTRAINT `ph_barangays_citymunCode_fkey` FOREIGN KEY (`citymunCode`) REFERENCES `ph_city_mun`(`citymunCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
