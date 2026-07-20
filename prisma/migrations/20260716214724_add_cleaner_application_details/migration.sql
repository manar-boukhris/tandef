-- AlterTable
ALTER TABLE `cleanerapplication` ADD COLUMN `accountHolder` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `iban` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `rejectionNote` TEXT NULL,
    ADD COLUMN `services` TEXT NULL;
