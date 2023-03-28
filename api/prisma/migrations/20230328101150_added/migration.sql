/*
  Warnings:

  - You are about to drop the column `username` on the `entries` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `Entries_username_fkey`;

-- AlterTable
ALTER TABLE `entries` DROP COLUMN `username`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Entries` ADD CONSTRAINT `Entries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
