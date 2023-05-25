-- AddForeignKey
ALTER TABLE `catagories` ADD CONSTRAINT `catagories_ledgerid_fkey` FOREIGN KEY (`ledgerid`) REFERENCES `ledgers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
