/*
  Warnings:

  - Added the required column `lastStudied` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deck` ADD COLUMN `lastStudied` DATETIME(3) NOT NULL;
