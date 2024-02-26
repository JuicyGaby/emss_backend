-- CreateTable
CREATE TABLE `employee_access_rights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `access_right_id` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_access_rights` ADD CONSTRAINT `employee_access_rights_access_right_id_fkey` FOREIGN KEY (`access_right_id`) REFERENCES `access_rights`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
