/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(500) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `username_UNIQUE` ON `users`(`username`);
