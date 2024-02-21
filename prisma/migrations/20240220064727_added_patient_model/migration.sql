-- CreateTable
CREATE TABLE `sample_patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(50) NOT NULL,
    `mname` VARCHAR(50) NULL,
    `lname` VARCHAR(50) NOT NULL,
    `birth_date` DATE NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sex` VARCHAR(10) NULL,
    `address` VARCHAR(150) NULL,
    `civil_status` VARCHAR(20) NULL,
    `age` INTEGER NULL,
    `education` ENUM('Elementary', 'HighSchool', 'Undergraduate', 'Vocational', 'PostGraduate') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
