import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// Mock de Prisma
const mockFindMany = jest.fn();

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    historia: {
      findMany: mockFindMany
    }
  }))
}));

const { obtenerDatosMapa } = await import('../src/controllers/mapa.controller.js');

// App ficticia de Express
const app = express();
app.use(express.json());

// Middleware simulado que inyecta el usuario (como si viniera de autenticación)
app.use((req, res, next) => {
  req.usuario = { id: 1 }; // simulación de autenticación
  next();
});

// Ruta del mapa
app.get('/api/mapa', obtenerDatosMapa);

describe('GET /api/mapa', () => {
  it('debe generar y responder con datos del mapa', async () => {
    mockFindMany.mockResolvedValue([
      {
        id: 1,
        titulo: 'Historia A',
        capitulos: [
          {
            id_Capitulo: 10,
            titulo_capitulo: 'Cap 1',
            escenas: [
              { id_Escena: 100, titulo_escena: 'Escena 1' }
            ]
          }
        ],
        personajes: [
          {
            id_Personaje: 20,
            nombre_personaje: 'Personaje A',
            tags: [
              { tag: { id_Tag: 200, nombre_tag: 'Guerrero' } }
            ]
          }
        ],
        tags: [
          { id_Tag: 300, nombre_tag: 'Acción' }
        ]
      }
    ]);

    const response = await request(app).get('/api/mapa');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    const ids = response.body.map(e => e.data.id);
    expect(ids).toContain('h-1');
    expect(ids).toContain('c-10');
    expect(ids).toContain('e-100');
    expect(ids).toContain('p-20');
    expect(ids).toContain('t-200');
    expect(ids).toContain('t-300');
  });
});
