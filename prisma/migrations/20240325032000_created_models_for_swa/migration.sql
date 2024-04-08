-- CreateTable
CREATE TABLE `swa_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_name` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dar_swa_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dar_swa_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `created_by` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dar_swa_services` ADD CONSTRAINT `dar_swa_services_dar_swa_id_fkey` FOREIGN KEY (`dar_swa_id`) REFERENCES `dar_swa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dar_swa_services` ADD CONSTRAINT `dar_swa_services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `swa_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
