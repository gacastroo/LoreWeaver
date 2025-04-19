/*
  Warnings:

  - Added the required column `usuarioId` to the `Historia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Historia` ADD COLUMN `usuarioId` INTEGER;
UPDATE `Historia` SET `usuarioId` = 1;
ALTER TABLE `Historia` MODIFY `usuarioId` INTEGER NOT NULL;


-- AddForeignKey
ALTER TABLE `Historia` ADD CONSTRAINT `Historia_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
