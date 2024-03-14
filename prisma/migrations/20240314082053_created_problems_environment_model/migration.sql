-- CreateTable
CREATE TABLE `patient_problems_environment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `lack_regular_food` JSON NULL,
    `nutritionally_inadequate_food` JSON NULL,
    `documented_malnutrition` JSON NULL,
    `absence_of_shelter` JSON NULL,
    `inadequate_shelter` JSON NULL,
    `unemployment` JSON NULL,
    `underemployment` JSON NULL,
    `inappropiate_employment` JSON NULL,
    `insufficient_community_resources` JSON NULL,
    `insufficient_provide_resources` JSON NULL,
    `no_personal_transportation` JSON NULL,
    `no_problems` JSON NULL,
    `absence_of_affectional_support` JSON NULL,
    `inadequate_support_system` JSON NULL,
    `excessive_support_system` JSON NULL,
    `problems_presented` VARCHAR(255) NULL,
    `reasons_psychosocial_counselling` VARCHAR(255) NOT NULL,
    `assesment_findings` VARCHAR(255) NOT NULL,
    `recommended_intervention` VARCHAR(255) NOT NULL,
    `action_taken` VARCHAR(255) NOT NULL,
    `person_emergency` VARCHAR(255) NOT NULL,
    `relationship_to_patient` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `contact_number` VARCHAR(255) NOT NULL,
    `interviewed_by` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_problems_environment` ADD CONSTRAINT `patient_problems_environment_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
