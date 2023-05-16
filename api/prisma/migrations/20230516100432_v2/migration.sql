-- CreateTable
CREATE TABLE `ledgers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(500) NOT NULL,
    `owner` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ledgeracess` (
    `id` VARCHAR(191) NOT NULL,
    `ledgerid` VARCHAR(20) NOT NULL,
    `userid` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
