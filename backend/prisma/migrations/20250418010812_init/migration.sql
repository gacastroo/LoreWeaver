-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personaje` (
    `id_Personaje` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_personaje` VARCHAR(191) NOT NULL,
    `descripcion_personaje` VARCHAR(191) NOT NULL,
    `historiaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Personaje`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Escena` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenido` VARCHAR(191) NOT NULL,
    `capituloId` INTEGER NOT NULL,
    `historiaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Capitulo` (
    `id_Capitulo` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_capitulo` VARCHAR(191) NOT NULL,
    `orden_capitulo` VARCHAR(191) NOT NULL,
    `universoId` INTEGER NOT NULL,
    `historiaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Capitulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Universo` (
    `id_Universo` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_universo` VARCHAR(191) NOT NULL,
    `descripcion_universo` VARCHAR(191) NOT NULL,
    `historiaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Universo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id_Tag` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_tag` VARCHAR(191) NOT NULL,
    `historiaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_Tag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personaje_Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personajeId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Personaje` ADD CONSTRAINT `Personaje_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escena` ADD CONSTRAINT `Escena_capituloId_fkey` FOREIGN KEY (`capituloId`) REFERENCES `Capitulo`(`id_Capitulo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escena` ADD CONSTRAINT `Escena_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capitulo` ADD CONSTRAINT `Capitulo_universoId_fkey` FOREIGN KEY (`universoId`) REFERENCES `Universo`(`id_Universo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capitulo` ADD CONSTRAINT `Capitulo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Universo` ADD CONSTRAINT `Universo_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_historiaId_fkey` FOREIGN KEY (`historiaId`) REFERENCES `Historia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_personajeId_fkey` FOREIGN KEY (`personajeId`) REFERENCES `Personaje`(`id_Personaje`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personaje_Tag` ADD CONSTRAINT `Personaje_Tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id_Tag`) ON DELETE RESTRICT ON UPDATE CASCADE;
