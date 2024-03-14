-- AlterTable
ALTER TABLE `patient_descrimination` ADD COLUMN `Age` JSON NULL,
    ADD COLUMN `Dependency_Status` JSON NULL,
    ADD COLUMN `Disability_Status` JSON NULL,
    ADD COLUMN `Ethnicity` JSON NULL,
    ADD COLUMN `Lifestyle` JSON NULL,
    ADD COLUMN `Marital_Status` JSON NULL,
    ADD COLUMN `NonCitizen` JSON NULL,
    ADD COLUMN `Religion` JSON NULL,
    ADD COLUMN `Sex` JSON NULL,
    ADD COLUMN `Sexual_Orientation` JSON NULL,
    ADD COLUMN `Veteran_Status` JSON NULL;
