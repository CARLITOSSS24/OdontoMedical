import request from 'supertest';
import app from '../../../index.js'; // No reiniciar el servidor aquí

describe('Prueba de conexión al servidor', () => {
  it('Debería responder con 200 en la ruta raíz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('<h1>ESTA ES LA API</h1>');
  });
});
