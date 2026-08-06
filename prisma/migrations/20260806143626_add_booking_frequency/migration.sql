-- DropIndex
DROP INDEX `Address_userId_fkey` ON `Address`;

-- DropIndex
DROP INDEX `Availability_cleanerId_fkey` ON `Availability`;

-- DropIndex
DROP INDEX `Booking_cleanerId_fkey` ON `Booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `Booking`;

-- DropIndex
DROP INDEX `PasswordResetToken_userId_fkey` ON `PasswordResetToken`;

-- DropIndex
DROP INDEX `PaymentMethod_userId_fkey` ON `PaymentMethod`;

-- DropIndex
DROP INDEX `Review_cleanerId_fkey` ON `Review`;

-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `frequency` VARCHAR(191) NOT NULL DEFAULT 'Einmalig',
    ADD COLUMN `frequencyNote` TEXT NULL;
