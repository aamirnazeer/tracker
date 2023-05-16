-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `entries_catagoryId_fkey`;

-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `entries_userId_fkey`;

-- AlterTable
ALTER TABLE `entries` MODIFY `catagoryId` VARCHAR(100) NOT NULL,
    MODIFY `userId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `ledgeracess` MODIFY `ledgerid` VARCHAR(100) NOT NULL,
    MODIFY `userid` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `ledgers` MODIFY `owner` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_catagoryId_fkey` FOREIGN KEY (`catagoryId`) REFERENCES `catagories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
