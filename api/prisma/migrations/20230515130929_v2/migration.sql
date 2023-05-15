/*
  Warnings:

  - You are about to drop the column `userId` on the `entries` table. All the data in the column will be lost.
  - Added the required column `usersId` to the `entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Entries_catagoryId_fkey` ON `entries`;

-- DropIndex
DROP INDEX `Entries_userId_fkey` ON `entries`;

-- AlterTable
ALTER TABLE `entries` DROP COLUMN `userId`,
    ADD COLUMN `usersId` VARCHAR(20) NOT NULL,
    MODIFY `catagoryId` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_catagoryId_fkey` FOREIGN KEY (`catagoryId`) REFERENCES `catagories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
