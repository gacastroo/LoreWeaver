import { jest } from '@jest/globals';

// Mock de Prisma
const mockFindMany = jest.fn();

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    historia: {
      findMany: mockFindMany
    }
  }))
}));

// Importar después de mockear
const { obtenerDatosMapa } = await import('../src/controllers/mapa.controller.js');
const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

describe('obtenerDatosMapa', () => {
  it('debe generar correctamente los datos del mapa', async () => {
    const req = {
      usuario: { id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // 🔹 Datos de prueba
    mockFindMany.mockResolvedValue([
      {
        id: 1,
        titulo: 'Historia de prueba',
        capitulos: [
          {
            id_Capitulo: 10,
            titulo_capitulo: 'Capítulo A',
            escenas: [
              { id_Escena: 100, titulo_escena: 'Escena X' }
            ]
          }
        ],
        personajes: [
          {
            id_Personaje: 20,
            nombre_personaje: 'Prota',
            tags: [
              {
                tag: { id_Tag: 200, nombre_tag: 'Héroe' }
              }
            ]
          }
        ],
        tags: [
          { id_Tag: 300, nombre_tag: 'Aventura' }
        ]
      }
    ]);

    await obtenerDatosMapa(req, res);

    // Verifica que haya respondido con datos (en formato Cytoscape)
    expect(res.json).toHaveBeenCalled();

    const elementos = res.json.mock.calls[0][0];
    const ids = elementos.map(e => e.data.id);

    expect(ids).toContain('h-1');        // historia
    expect(ids).toContain('c-10');       // capítulo
    expect(ids).toContain('e-100');      // escena
    expect(ids).toContain('p-20');       // personaje
    expect(ids).toContain('t-200');      // tag del personaje
    expect(ids).toContain('t-300');      // tag de la historia
  });

  it('debe manejar errores correctamente', async () => {
    const req = { usuario: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockFindMany.mockRejectedValue(new Error('DB error'));

    await obtenerDatosMapa(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al generar el mapa' });
  });
});
