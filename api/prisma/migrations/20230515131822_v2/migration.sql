/*
  Warnings:

  - You are about to drop the column `usersId` on the `entries` table. All the data in the column will be lost.
  - Added the required column `userId` to the `entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `entries_usersId_fkey`;

-- AlterTable
ALTER TABLE `entries` DROP COLUMN `usersId`,
    ADD COLUMN `userId` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
