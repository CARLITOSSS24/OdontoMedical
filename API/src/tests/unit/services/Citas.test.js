import request from "supertest";
import app from "../../../index.js"; 

describe('POST /api/users/', () => {
  it('debería retornar error si los campos están vacíos', async () => {
    const res = await request(app).post('/api/users').send({
      Nombre: "Juan",
      Apellido: "Pérez",
      Tipo_Doc: "CC",
      Doc_identificacion: "123456",
      Telefono: "3001234567",
      Correo: "juan@example.com",
      Clave: '',
      Permiso: "6820f7a114cd039b43a1f666",
      Genero: "Masculino",
      Edad: 30,
    });

    console.log(res.body)

  expect(res.statusCode).toBe(400); // o 422 si usas esa convención
expect(res.body).toHaveProperty('details');
expect(Array.isArray(res.body.details)).toBe(true);
expect(res.body.details.length).toBeGreaterThan(0);
expect(res.body.message).toBe("Error de validación");

  });
});
