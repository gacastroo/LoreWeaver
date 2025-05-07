import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/utils/auth.js', () => ({
  getUserIdFromToken: jest.fn().mockReturnValue(1)
}));

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    capitulo: {
      create: jest.fn()
    }
  }))
}));

const { getUserIdFromToken } = await import('../src/utils/auth.js');
const { PrismaClient } = await import('@prisma/client');
const { crearCapitulo } = await import('../src/controllers/capitulo.controller.js');

const prisma = new PrismaClient();

describe('crearCapitulo', () => {
  it('debe devolver error si falta el título del capítulo', async () => {
    const req = {
      body: {
        historiaId: 1
      },
      headers: { authorization: 'Bearer token-falso' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await crearCapitulo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El título y la historia son obligatorios.' });
});
});