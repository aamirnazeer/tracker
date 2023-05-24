/*
  Warnings:

  - You are about to drop the column `owner` on the `ledgers` table. All the data in the column will be lost.
  - Added the required column `ledgerid` to the `catagories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ledgerId` to the `entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `entries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownderId` to the `ledgers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `type_UNIQUE` ON `catagories`;

-- AlterTable
ALTER TABLE `catagories` ADD COLUMN `isDeleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `ledgerid` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `entries` ADD COLUMN `isDeleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `ledgerId` VARCHAR(100) NOT NULL,
    ADD COLUMN `typeId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `ledgeracess` ADD COLUMN `isDeleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ledgers` DROP COLUMN `owner`,
    ADD COLUMN `isDeleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `ownderId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isDeleted` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `transactionType` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ledgers` ADD CONSTRAINT `ledgers_ownderId_fkey` FOREIGN KEY (`ownderId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ledgeracess` ADD CONSTRAINT `ledgeracess_ledgerid_fkey` FOREIGN KEY (`ledgerid`) REFERENCES `ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ledgeracess` ADD CONSTRAINT `ledgeracess_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `transactionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entries` ADD CONSTRAINT `entries_ledgerId_fkey` FOREIGN KEY (`ledgerId`) REFERENCES `ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
