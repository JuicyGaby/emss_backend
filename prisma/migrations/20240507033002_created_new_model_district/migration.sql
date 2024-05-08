-- CreateTable
CREATE TABLE `ph_districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disDesc` VARCHAR(50) NOT NULL,
    `provCode` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ph_districts` ADD CONSTRAINT `ph_districts_provCode_fkey` FOREIGN KEY (`provCode`) REFERENCES `ph_provinces`(`provCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
