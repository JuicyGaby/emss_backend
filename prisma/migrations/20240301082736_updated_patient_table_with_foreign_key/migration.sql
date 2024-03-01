/*
  Warnings:

  - You are about to drop the column `patient_id` on the `patient_interview` table. All the data in the column will be lost.
  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `patient_interview` DROP FOREIGN KEY `patient_interview_patient_id_fkey`;

-- AlterTable
ALTER TABLE `patient_interview` DROP COLUMN `patient_id`,
    MODIFY `admission_date_and_time` DATETIME NULL,
    MODIFY `basic_ward` VARCHAR(200) NULL,
    MODIFY `nonbasic_ward` VARCHAR(200) NULL,
    MODIFY `health_record_number` VARCHAR(200) NULL,
    MODIFY `mswd_number` VARCHAR(200) NULL,
    MODIFY `referring_party` VARCHAR(200) NULL,
    MODIFY `address` VARCHAR(200) NULL,
    MODIFY `contact_number` VARCHAR(200) NULL,
    MODIFY `informant` VARCHAR(200) NULL,
    MODIFY `relationship_to_patient` VARCHAR(200) NULL,
    MODIFY `informant_contact_number` VARCHAR(200) NULL,
    MODIFY `informant_address` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `patient_interview_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_patient_interview_id_fkey` FOREIGN KEY (`patient_interview_id`) REFERENCES `patient_interview`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
