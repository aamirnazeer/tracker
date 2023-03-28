/*
  Warnings:

  - Added the required column `comments` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entries` ADD COLUMN `comments` VARCHAR(500) NOT NULL;
