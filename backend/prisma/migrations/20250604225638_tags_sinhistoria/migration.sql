/*
  Warnings:

  - You are about to drop the column `historiaId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_historiaId_fkey`;

-- DropIndex
DROP INDEX `Tags_historiaId_fkey` ON `Tags`;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `historiaId`;
