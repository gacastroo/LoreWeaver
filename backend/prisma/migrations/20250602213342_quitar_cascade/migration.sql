-- DropForeignKey
ALTER TABLE `Capitulo` DROP FOREIGN KEY `Capitulo_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Escena` DROP FOREIGN KEY `Escena_capituloId_fkey`;

-- DropForeignKey
ALTER TABLE `Escena` DROP FOREIGN KEY `Escena_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Historia` DROP FOREIGN KEY `Historia_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje` DROP FOREIGN KEY `Personaje_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje` DROP FOREIGN KEY `Personaje_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje_Tag` DROP FOREIGN KEY `Personaje_Tag_personajeId_fkey`;

-- DropForeignKey
ALTER TABLE `Personaje_Tag` DROP FOREIGN KEY `Personaje_Tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `ResetToken` DROP FOREIGN KEY `ResetToken_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Universo` DROP FOREIGN KEY `Universo_historiaId_fkey`;

-- DropForeignKey
ALTER TABLE `Universo` DROP FOREIGN KEY `Universo_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Capitulo_historiaId_fkey` ON `Capitulo`;

-- DropIndex
DROP INDEX `Escena_capituloId_fkey` ON `Escena`;

-- DropIndex
DROP INDEX `Escena_historiaId_fkey` ON `Escena`;

-- DropIndex
DROP INDEX `Historia_usuarioId_fkey` ON `Historia`;

-- DropIndex
DROP INDEX `Personaje_historiaId_fkey` ON `Personaje`;

-- DropIndex
DROP INDEX `Personaje_usuarioId_fkey` ON `Personaje`;

-- DropIndex
DROP INDEX `Personaje_Tag_personajeId_fkey` ON `Personaje_Tag`;

-- DropIndex
DROP INDEX `Personaje_Tag_tagId_fkey` ON `Personaje_Tag`;

-- DropIndex
DROP INDEX `ResetToken_usuarioId_fkey` ON `ResetToken`;

-- DropIndex
DROP INDEX `Tags_historiaId_fkey` ON `Tags`;

-- DropIndex
DROP INDEX `Universo_historiaId_fkey` ON `Universo`;

-- DropIndex
DROP INDEX `Universo_usuarioId_fkey` ON `Universo`;

-- AlterTable
ALTER TABLE `Capitulo` MODIFY `historiaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Escena` MODIFY `historiaId` INTEGER NULL,
    MODIFY `capituloId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tags` MODIFY `historiaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Historia` ADD CONSTRAINT `Historia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escena` ADD CONSTRAINT `Escena_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escena` ADD CONSTRAINT `Escena_capituloId_fkey` FOREIGN KEY (`capituloId`) REFERENCES `Capitulo`(`id_Capitulo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capitulo` ADD CONSTRAINT `Capitulo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Universo` ADD CONSTRAINT `Universo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Universo` ADD CONSTRAINT `Universo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_personajeId_fkey` FOREIGN KEY (`personajeId`) REFERENCES `Personaje`(`id_Personaje`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id_Tag`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetToken` ADD CONSTRAINT `ResetToken_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
