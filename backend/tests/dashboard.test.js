import { jest } from '@jest/globals';

const mockFindMany = jest.fn();
const mockCountTags = jest.fn();

jest.unstable_mockModule('../src/lib/prisma.js', () => ({
  prisma: {
    historia: {
      findMany: mockFindMany
    },
    tags: {
      count: mockCountTags
    }
  }
}));

const { obtenerEstadisticas } = await import('../src/controllers/dashboard.controller.js');

describe('obtenerEstadisticas', () => {
  it('debe devolver el total de palabras y tags correctamente', async () => {
    const req = {
      user: { id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockFindMany.mockResolvedValue([
      { contenido: 'Primera historia de prueba' }, // 4 palabras
      { contenido: 'Segunda con más palabras aún' } // 5 palabras
    ]);

    mockCountTags.mockResolvedValue(3);

    await obtenerEstadisticas(req, res);

    expect(res.json).toHaveBeenCalledWith({
      palabras: 9,
      tags: 3
    });
  });

  it('debe manejar errores correctamente', async () => {
    const req = { user: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockFindMany.mockRejectedValue(new Error('Error'));

    await obtenerEstadisticas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
  });
});
