/*
  Warnings:

  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `accessright` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accessright` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `employees`;
