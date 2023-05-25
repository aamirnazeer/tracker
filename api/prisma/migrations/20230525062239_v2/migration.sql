-- CreateTable
CREATE TABLE `defaultuserledger` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(100) NOT NULL,
    `ledgerId` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `defaultuserledger` ADD CONSTRAINT `defaultuserledger_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defaultuserledger` ADD CONSTRAINT `defaultuserledger_ledgerId_fkey` FOREIGN KEY (`ledgerId`) REFERENCES `ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
