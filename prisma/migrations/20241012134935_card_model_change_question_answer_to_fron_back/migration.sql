/*
  Warnings:

  - You are about to drop the column `answer` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `card` table. All the data in the column will be lost.
  - Added the required column `back` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` DROP COLUMN `answer`,
    DROP COLUMN `question`,
    ADD COLUMN `back` VARCHAR(191) NOT NULL,
    ADD COLUMN `front` VARCHAR(191) NOT NULL;
