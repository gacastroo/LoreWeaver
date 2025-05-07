import { jest } from '@jest/globals';

// Mocks de funciones externas
const mockGetUserIdFromToken = jest.fn().mockReturnValue(1);
const mockFindCapitulo = jest.fn();
const mockCreateEscena = jest.fn();

jest.unstable_mockModule('../src/utils/auth.js', () => ({
  getUserIdFromToken: mockGetUserIdFromToken
}));

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    capitulo: {
      findFirst: mockFindCapitulo
    },
    escena: {
      create: mockCreateEscena
    }
  }))
}));

// Importar el controlador después del mock
const { crearEscena } = await import('../src/controllers/escena.controller.js');

describe('crearEscena', () => {
  it('debe crear una escena si el capítulo pertenece al usuario', async () => {
    const req = {
      headers: { authorization: 'Bearer token-falso' },
      body: {
        titulo_escena: 'Escena de prueba',
        capituloId: 5,
        orden_escena: 1,
        universoId: null
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Simulamos que el capítulo sí pertenece al usuario 1
    mockFindCapitulo.mockResolvedValue({
      id_Capitulo: 5,
      historiaId: 2
    });

    const escenaCreada = {
      id_Escena: 99,
      titulo_escena: 'Escena de prueba',
      orden_escena: 1,
      historiaId: 2,
      capituloId: 5,
      universoId: null
    };

    mockCreateEscena.mockResolvedValue(escenaCreada);

    await crearEscena(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(escenaCreada);
  });
});
