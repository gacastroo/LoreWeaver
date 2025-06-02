/*
  Warnings:

  - Made the column `historiaId` on table `Capitulo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `historiaId` on table `Tags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Capitulo` DROP FOREIGN KEY `Capitulo_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje` DROP FOREIGN KEY `Personaje_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_historiaId_fkey`;

-- DropIndex
DROP INDEX `Capitulo_historiaId_fkey` ON `Capitulo`;

-- DropIndex
DROP INDEX `Personaje_historiaId_fkey` ON `Personaje`;

-- DropIndex
DROP INDEX `Tags_historiaId_fkey` ON `Tags`;

-- AlterTable
ALTER TABLE `Capitulo` MODIFY `historiaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tags` MODIFY `historiaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capitulo` ADD CONSTRAINT `Capitulo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
