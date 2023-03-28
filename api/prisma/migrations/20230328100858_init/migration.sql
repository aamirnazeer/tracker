/*
  Warnings:

  - Added the required column `username` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entries` ADD COLUMN `username` VARCHAR(45) NOT NULL;

-- AddForeignKey
ALTER TABLE `Entries` ADD CONSTRAINT `Entries_username_fkey` FOREIGN KEY (`username`) REFERENCES `Users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
