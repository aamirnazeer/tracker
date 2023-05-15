/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `email` VARCHAR(45) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(45) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(45) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `Users`(`email`);
