/*
  Warnings:

  - You are about to drop the column `contenido` on the `Historia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Capitulo` ADD COLUMN `contenido` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Historia` DROP COLUMN `contenido`;
