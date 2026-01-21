const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

const dataFile = path.join(__dirname, '../data/items.json');

const dataDir = path.dirname(dataFile);

beforeEach(() => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(dataFile, JSON.stringify([]));
});

describe('Items API', () => {

  test('GET /health should return ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/items should return empty array', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/items should create new item', async () => {
    const newItem = {
      title: 'Inception',
      type: 'film',
      genres: ['thriller'],
      poster: 'https://example.com/poster.jpg'
    };

    const res = await request(app)
      .post('/api/items')
      .send(newItem);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Inception');
    expect(res.body.genres).toContain('thriller');
  });

  test('DELETE /api/items/:id should delete item', async () => {
    const createRes = await request(app)
      .post('/api/items')
      .send({ title: 'Matrix', type: 'film' });

    const id = createRes.body.id;

    const deleteRes = await request(app)
      .delete(`/api/items/${id}`);

    expect(deleteRes.statusCode).toBe(204);
  });

});