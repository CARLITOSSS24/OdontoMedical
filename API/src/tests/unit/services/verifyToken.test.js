import request from "supertest"
import app from "../../../index";
describe('GET /api/doctoras', () => {
  it('debería rechazar el acceso sin token válido', async () => {
    const res = await request(app)
      .get('/api/doctora')
      .set('Authorization', 'Bearer token_invalido');

      console.log(res.body)

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Token no válido/i);
  });
});
