/*
  Warnings:

  - You are about to alter the column `date` on the `entries` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `entries` MODIFY `date` DATETIME NOT NULL;
