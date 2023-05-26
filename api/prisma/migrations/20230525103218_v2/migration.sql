/*
  Warnings:

  - You are about to drop the column `typeId` on the `entries` table. All the data in the column will be lost.
  - You are about to drop the `transactiontype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transactionType` to the `entries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `entries` DROP FOREIGN KEY `entries_typeId_fkey`;

-- AlterTable
ALTER TABLE `entries` DROP COLUMN `typeId`,
    ADD COLUMN `transactionType` INTEGER NOT NULL;

-- DropTable
DROP TABLE `transactiontype`;
