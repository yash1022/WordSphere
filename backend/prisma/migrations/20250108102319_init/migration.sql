/*
  Warnings:

  - You are about to drop the column `count` on the `like` table. All the data in the column will be lost.
  - Made the column `original_author_id` on table `savedarticle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `savedarticle` DROP FOREIGN KEY `SavedArticle_original_author_id_fkey`;

-- AlterTable
ALTER TABLE `like` DROP COLUMN `count`;

-- AlterTable
ALTER TABLE `savedarticle` MODIFY `original_author_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SavedArticle` ADD CONSTRAINT `SavedArticle_original_author_id_fkey` FOREIGN KEY (`original_author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
