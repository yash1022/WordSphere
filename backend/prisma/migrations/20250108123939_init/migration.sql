/*
  Warnings:

  - You are about to drop the column `count` on the `like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `like` DROP COLUMN `count`;
