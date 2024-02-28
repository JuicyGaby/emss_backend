-- CreateTable
CREATE TABLE `patient_interview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NULL,
    `interview_date` DATE NULL,
    `interview_time` TIME NULL,
    `admission_date_and_time` DATETIME NULL,
    `basic_ward` VARCHAR(50) NULL,
    `nonbasic_ward` VARCHAR(50) NULL,
    `health_record_number` VARCHAR(50) NULL,
    `mswd_number` VARCHAR(50) NULL,
    `referring_party` VARCHAR(50) NULL,
    `address` VARCHAR(50) NULL,
    `contact_number` VARCHAR(50) NULL,
    `informant` VARCHAR(50) NULL,
    `relationship_to_patient` VARCHAR(50) NULL,
    `informant_contact_number` VARCHAR(50) NULL,
    `informant_address` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_interview` ADD CONSTRAINT `patient_interview_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
