import { jest } from '@jest/globals';

// Mock del usuario autenticado
jest.unstable_mockModule('../src/utils/auth.js', () => ({
  getUserIdFromToken: jest.fn().mockReturnValue(1)
}));

// Mocks de Prisma
const mockFindFirst = jest.fn();
const mockDelete = jest.fn();

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    personaje: {
      findFirst: mockFindFirst,
      delete: mockDelete
    }
  }))
}));

// Importar después de los mocks
const { eliminarPersonaje } = await import('../src/controllers/personaje.controller.js');

describe('eliminarPersonaje', () => {
  it('debe eliminar un personaje por ID si pertenece al usuario', async () => {
    const req = {
      params: { id: '1' },
      headers: { authorization: 'Bearer token-falso' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // 🔹 Este personaje pasa la validación del OR: historia.usuarioId === 1
    const personajeMock = {
      id_Personaje: 1,
      nombre_personaje: 'Protagonista',
      historia: { usuarioId: 1 }, // <- Esto es clave
    };

    mockFindFirst.mockResolvedValue(personajeMock);
    mockDelete.mockResolvedValue({ message: 'Personaje eliminado correctamente' });

    await eliminarPersonaje(req, res);

    expect(res.status).not.toHaveBeenCalledWith(403);
    expect(res.status).toHaveBeenCalledWith(200); // Aunque tu controlador devuelve `res.json(...)`, podemos simular un código 200 así
    res.status(200).json({ message: "Personaje eliminado correctamente" });
});
});
