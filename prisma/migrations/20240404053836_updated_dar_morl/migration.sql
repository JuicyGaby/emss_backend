-- AlterTable
ALTER TABLE `daily_activity_report` ADD COLUMN `indirect_contributor` VARCHAR(100) NULL,
    ADD COLUMN `non_phic_classification` VARCHAR(100) NULL,
    ADD COLUMN `phic_classification` VARCHAR(100) NULL,
    ADD COLUMN `sectoral_grouping` VARCHAR(100) NULL;
