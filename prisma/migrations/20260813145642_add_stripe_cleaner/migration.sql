-- AlterTable
ALTER TABLE `Cleaner` ADD COLUMN `stripeAccountId` VARCHAR(191) NULL,
    ADD COLUMN `stripeOnboarded` BOOLEAN NOT NULL DEFAULT false;
