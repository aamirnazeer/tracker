-- CreateTable
CREATE TABLE `Catagories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `type_UNIQUE`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount` INTEGER NOT NULL,
    `catagoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Entries` ADD CONSTRAINT `Entries_catagoryId_fkey` FOREIGN KEY (`catagoryId`) REFERENCES `Catagories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
