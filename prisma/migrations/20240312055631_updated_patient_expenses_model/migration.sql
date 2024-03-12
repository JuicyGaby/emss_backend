/*
  Warnings:

  - A unique constraint covering the columns `[patient_id]` on the table `patient_monthly_expenses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `patient_monthly_expenses_patient_id_key` ON `patient_monthly_expenses`(`patient_id`);
