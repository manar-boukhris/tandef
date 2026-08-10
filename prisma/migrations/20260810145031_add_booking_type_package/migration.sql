-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `bookingType` VARCHAR(191) NOT NULL DEFAULT 'wohnung',
    ADD COLUMN `packageName` VARCHAR(191) NOT NULL DEFAULT 'Basic';
