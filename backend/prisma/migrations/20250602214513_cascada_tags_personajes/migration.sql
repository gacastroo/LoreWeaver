-- DropForeignKey
ALTER TABLE `Capitulo` DROP FOREIGN KEY `Capitulo_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje` DROP FOREIGN KEY `Personaje_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje_Tag` DROP FOREIGN KEY `Personaje_Tag_personajeId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje_Tag` DROP FOREIGN KEY `Personaje_Tag_tagId_fkey`;

-- DropIndex
DROP INDEX `Capitulo_historiaId_fkey` ON `Capitulo`;

-- DropIndex
DROP INDEX `Personaje_historiaId_fkey` ON `Personaje`;

-- DropIndex
DROP INDEX `Personaje_Tag_personajeId_fkey` ON `Personaje_Tag`;

-- DropIndex
DROP INDEX `Personaje_Tag_tagId_fkey` ON `Personaje_Tag`;

-- AlterTable
ALTER TABLE `Capitulo` MODIFY `historiaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tags` MODIFY `historiaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capitulo` ADD CONSTRAINT `Capitulo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_personajeId_fkey` FOREIGN KEY (`personajeId`) REFERENCES `Personaje`(`id_Personaje`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id_Tag`) ON DELETE CASCADE ON UPDATE CASCADE;
