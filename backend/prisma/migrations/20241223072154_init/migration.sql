-- AlterTable
ALTER TABLE `savedarticle` ADD COLUMN `original_author_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `SavedArticle` ADD CONSTRAINT `SavedArticle_original_author_id_fkey` FOREIGN KEY (`original_author_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
