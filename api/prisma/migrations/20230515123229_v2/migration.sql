/*
  Warnings:

  - The primary key for the `catagories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `entries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `refreshtokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `Entries_catagoryId_fkey`;

-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `Entries_userId_fkey`;

-- AlterTable
ALTER TABLE `catagories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `entries` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `refreshtokens` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
