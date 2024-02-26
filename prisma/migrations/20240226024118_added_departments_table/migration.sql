-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_name` VARCHAR(100) NOT NULL,
    `dept_code` VARCHAR(50) NOT NULL,
    `dept_supervisor` INTEGER NULL,
    `dept_div` VARCHAR(100) NOT NULL,
    `dept_div_head` INTEGER NULL,

    UNIQUE INDEX `dept_name_UNIQUE`(`dept_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
