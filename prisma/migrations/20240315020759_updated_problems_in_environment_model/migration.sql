/*
  Warnings:

  - You are about to alter the column `person_emergency` on the `patient_problems_environment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `relationship_to_patient` on the `patient_problems_environment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `address` on the `patient_problems_environment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `contact_number` on the `patient_problems_environment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `interviewed_by` on the `patient_problems_environment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `patient_problems_environment` MODIFY `problems_presented` VARCHAR(1000) NULL,
    MODIFY `reasons_psychosocial_counselling` VARCHAR(1000) NULL,
    MODIFY `assesment_findings` VARCHAR(500) NULL,
    MODIFY `recommended_intervention` VARCHAR(500) NULL,
    MODIFY `action_taken` VARCHAR(500) NULL,
    MODIFY `person_emergency` VARCHAR(100) NULL,
    MODIFY `relationship_to_patient` VARCHAR(100) NULL,
    MODIFY `address` VARCHAR(100) NULL,
    MODIFY `contact_number` VARCHAR(100) NULL,
    MODIFY `interviewed_by` VARCHAR(100) NULL;
