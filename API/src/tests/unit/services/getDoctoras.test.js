import request from "supertest";
import app from "../../../index.js";

describe('GET /api/doctoras', () => {
  it('debería requerir token de autorización', async () => {
    const res = await request(app).get('/api/doctora');
    expect(res.statusCode).toBe(401); // o 403 dependiendo de tu middleware
  });
});
