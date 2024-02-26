-- CreateTable
CREATE TABLE `designations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation_name` VARCHAR(100) NOT NULL,
    `designation_code` VARCHAR(50) NOT NULL,
    `salary_grade` INTEGER NOT NULL,

    UNIQUE INDEX `designation_name_UNIQUE`(`designation_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
