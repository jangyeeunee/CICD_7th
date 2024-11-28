-- RenameIndex
ALTER TABLE `user_store_review` RENAME INDEX `user_store_review_store_id_fkey` TO `store_id`;

-- RenameIndex
ALTER TABLE `user_store_review` RENAME INDEX `user_store_review_user_id_fkey` TO `user_id`;
