/*
  Warnings:

  - You are about to drop the `sample_patients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sample_patients`;

-- CreateTable
CREATE TABLE `AccessRight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
