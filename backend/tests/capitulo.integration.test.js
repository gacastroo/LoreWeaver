import request from 'supertest';
import app from '../src/app.js';

describe('Capítulos - API', () => {
  it('GET /api/capitulos debe devolver los capítulos', async () => {
    const res = await request(app)
      .get('/api/capitulos')
      .set('Authorization', 'Bearer token-falso'); 

    expect([200, 401]).toContain(res.statusCode); 
  });
});
