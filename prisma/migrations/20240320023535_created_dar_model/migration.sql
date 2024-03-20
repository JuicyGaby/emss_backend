-- CreateTable
CREATE TABLE `daily_activity_report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admission_date` DATETIME(3) NOT NULL,
    `patient_name` VARCHAR(100) NULL,
    `age` VARCHAR(10) NULL,
    `sex` VARCHAR(10) NULL,
    `address` VARCHAR(255) NULL,
    `civil_status` VARCHAR(50) NULL,
    `area` VARCHAR(50) NULL,
    `case_type` VARCHAR(50) NULL,
    `indirect_contributor` VARCHAR(100) NULL,
    `direct_contributor` VARCHAR(100) NULL,
    `phic_classification` VARCHAR(50) NULL,
    `non_phic_classification` VARCHAR(50) NULL,
    `interview_start_time` VARCHAR(50) NULL,
    `interview_end_time` VARCHAR(50) NULL,
    `sectoral_grouping` VARCHAR(50) NULL,
    `educational_attainment` VARCHAR(50) NULL,
    `religion` VARCHAR(50) NULL,
    `occupation` VARCHAR(50) NULL,
    `household_size` VARCHAR(50) NULL,
    `monthly_income` VARCHAR(50) NULL,
    `referral_source` VARCHAR(50) NULL,
    `diagnosis` VARCHAR(50) NULL,
    `informant_name` VARCHAR(50) NULL,
    `relationship_to_patient` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
