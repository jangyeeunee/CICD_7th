/*
  Warnings:

  - Added the required column `complete` to the `user_mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_mission` ADD COLUMN `complete` INTEGER NOT NULL;
