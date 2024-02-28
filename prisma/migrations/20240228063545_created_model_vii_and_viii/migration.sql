/*
  Warnings:

  - You are about to alter the column `admission_date_and_time` on the `patient_interview` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `patient_interview` MODIFY `admission_date_and_time` DATETIME NULL;

-- CreateTable
CREATE TABLE `patient_safety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `voice_crime_in_community` JSON NULL,
    `unsafe_working_conditions` JSON NULL,
    `unsafe_codition_home` JSON NULL,
    `absence_of_adequate_safety_services` JSON NULL,
    `natural_disasters` JSON NULL,
    `human_created_disasters` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_assessment_of_social_functioning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `parent` JSON NULL,
    `spouse` JSON NULL,
    `child` JSON NULL,
    `sibling` JSON NULL,
    `other_family_member` JSON NULL,
    `significant_others` JSON NULL,
    `lover` JSON NULL,
    `friend` JSON NULL,
    `neighbor` JSON NULL,
    `member` JSON NULL,
    `worker_paid_economy` JSON NULL,
    `worker_home` JSON NULL,
    `worker_volunteer` JSON NULL,
    `student` JSON NULL,
    `consumer` JSON NULL,
    `inpatient` JSON NULL,
    `outpatient` JSON NULL,
    `er_patient` JSON NULL,
    `prisoner` JSON NULL,
    `immigrant_legal` JSON NULL,
    `immigrant_undocumented` JSON NULL,
    `imigrant_refugee` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_safety` ADD CONSTRAINT `patient_safety_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_assessment_of_social_functioning` ADD CONSTRAINT `patient_assessment_of_social_functioning_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
