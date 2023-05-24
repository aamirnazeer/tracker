/*
  Warnings:

  - You are about to drop the column `ownderId` on the `ledgers` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `ledgers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ledgers` DROP FOREIGN KEY `ledgers_ownderId_fkey`;

-- AlterTable
ALTER TABLE `ledgers` DROP COLUMN `ownderId`,
    ADD COLUMN `ownerId` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `ledgers` ADD CONSTRAINT `ledgers_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
