/*
  Warnings:

  - Added the required column `easeFactor` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` ADD COLUMN `easeFactor` INTEGER NOT NULL,
    ADD COLUMN `interval` INTEGER NOT NULL,
    ADD COLUMN `nextReview` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
