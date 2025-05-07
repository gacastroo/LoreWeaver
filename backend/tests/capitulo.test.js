import { jest } from '@jest/globals';

// Mock de la función getUserIdFromToken
const mockGetUserIdFromToken = jest.fn().mockReturnValue(1);

// Mocks de Prisma
const mockCreateCapitulo = jest.fn();
const mockFindHistoria = jest.fn();

jest.unstable_mockModule('../src/utils/auth.js', () => ({
  getUserIdFromToken: mockGetUserIdFromToken
}));

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    capitulo: {
      create: mockCreateCapitulo,
    },
    historia: {
      findFirst: mockFindHistoria
    }
  }))
}));

// Importar después de mockear
const { crearCapitulo } = await import('../src/controllers/capitulo.controller.js');
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

describe('crearCapitulo', () => {
  it('debe crear un nuevo capítulo correctamente', async () => {
    const req = {
      body: {
        titulo_capitulo: 'Capítulo 1',
        historiaId: 1
      },
      headers: { authorization: 'Bearer token-falso' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // ✅ Simula que la historia pertenece al usuario con ID 1
    mockFindHistoria.mockResolvedValue({
      id: 1,
      usuarioId: 1
    });

    // ✅ Simula que el capítulo se crea correctamente
    const capituloCreado = {
      id: 1,
      titulo_capitulo: 'Capítulo 1',
      historiaId: 1,
      universoId: null
    };

    mockCreateCapitulo.mockResolvedValue(capituloCreado);

    await crearCapitulo(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(capituloCreado);
  });
});
