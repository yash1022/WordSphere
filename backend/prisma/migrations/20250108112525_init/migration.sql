/*
  Warnings:

  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_article_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_author_id_fkey`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `like`;
