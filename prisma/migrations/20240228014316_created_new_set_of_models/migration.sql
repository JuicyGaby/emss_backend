-- CreateTable
CREATE TABLE `patient_family_composition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `full_name` VARCHAR(50) NULL,
    `age` INTEGER NULL,
    `birth_date` DATE NULL,
    `civil_status` VARCHAR(50) NULL,
    `relationship` VARCHAR(50) NULL,
    `educational_attainment` VARCHAR(50) NULL,
    `occupation` VARCHAR(50) NULL,
    `monthly_income` VARCHAR(50) NULL,
    `other_source_of_income` VARCHAR(50) NULL,
    `household_size` INTEGER NULL,
    `total_household_income` VARCHAR(50) NULL,
    `per_capita_income` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_mswd_classification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `main_classification` VARCHAR(50) NULL,
    `sub_classification` VARCHAR(50) NULL,
    `membership_to_marginalized_sector` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_monthly_expenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `particular1` JSON NULL,
    `particular2` JSON NULL,
    `patient_id` INTEGER NOT NULL,
    `light_source` JSON NULL,
    `fuel_source` VARCHAR(50) NULL,
    `water_source` VARCHAR(50) NULL,
    `total_monthly_expenses` VARCHAR(50) NULL,
    `remarks` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_medical_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `admitting_diagnosis` VARCHAR(255) NULL,
    `final_diagnosis` VARCHAR(255) NULL,
    `duration_of_problems` VARCHAR(50) NULL,
    `previous_treatment` VARCHAR(255) NULL,
    `present_treatment_plan` VARCHAR(255) NULL,
    `health_accessibility_problem` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_health_and_mental_health` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `abscence_of_adequate_health_services` JSON NULL,
    `inaccessibility_of_health_services` JSON NULL,
    `abscence_of_support_health_services` JSON NULL,
    `absence_of_adequate_mental_services` JSON NULL,
    `inaccessibility_of_mental_services` JSON NULL,
    `absence_of_support_mental_services` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient_family_composition` ADD CONSTRAINT `patient_family_composition_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_mswd_classification` ADD CONSTRAINT `patient_mswd_classification_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_monthly_expenses` ADD CONSTRAINT `patient_monthly_expenses_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_medical_data` ADD CONSTRAINT `patient_medical_data_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_health_and_mental_health` ADD CONSTRAINT `patient_health_and_mental_health_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
