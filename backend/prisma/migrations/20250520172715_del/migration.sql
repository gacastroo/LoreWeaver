/*
  Warnings:

  - Added the required column `usuarioId` to the `Personaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Personaje` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
