import { jest } from '@jest/globals';

// Mock de la función getUserIdFromToken (aunque no se usa en el controlador, por si acaso)
const mockGetUserIdFromToken = jest.fn().mockReturnValue(1);

// Mock de Prisma
const mockFindMany = jest.fn();

jest.unstable_mockModule('../src/utils/auth.js', () => ({
  getUserIdFromToken: mockGetUserIdFromToken
}));

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    historia: {
      findMany: mockFindMany
    }
  }))
}));

// Importar después de mockear
const { obtenerHistorias } = await import('../src/controllers/historia.controller.js');
const { PrismaClient } = await import('@prisma/client');

describe('obtenerHistorias', () => {
  it('debe devolver las historias del usuario', async () => {
    const req = {
      headers: { authorization: 'Bearer token-falso' },
      usuario: { id: 1 } // ✅ necesario
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Datos de prueba
    const historiasDePrueba = [
      { id: 1, titulo: 'Historia 1', usuarioId: 1 }
    ];

    mockFindMany.mockResolvedValue(historiasDePrueba);

    await obtenerHistorias(req, res);

    expect(res.status).not.toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(historiasDePrueba);
  });
});
