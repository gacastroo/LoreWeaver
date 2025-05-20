/*
  Warnings:

  - Added the required column `usuarioId` to the `Universo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Universo` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Universo` ADD CONSTRAINT `Universo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
