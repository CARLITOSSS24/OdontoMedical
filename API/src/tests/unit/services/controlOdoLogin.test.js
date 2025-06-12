/** @jest-environment node */

import request from "supertest";
import app from "../../../index.js"; 
import bcrypt from "bcryptjs";
import userSchema from "../../../models/modelOdoUser.js";

describe("Pruebas del inicio de sesión", () => {
  let testUser;

  beforeAll(async () => {
    await userSchema.deleteMany({ Correo: /@test\.com$/ });


    const hashedPassword = await bcrypt.hash("password123", 10);
    testUser = await userSchema.create({
      Nombre: "Juan",
      Apellido: "Pérez",
      Tipo_Doc: "CC",
      Doc_identificacion: "12345678",
      Telefono: "3001234567",
      Correo: "juan@test.com",
      Clave: hashedPassword,
      Permiso: "6820f7a114cd039b43a1f666",
      Genero: "Masculino",
      Edad: 30,
    });
  });

  afterAll(async () => {
    await userSchema.findByIdAndDelete(testUser._id); // Limpiar la base de datos después de la prueba
  });

  it("Debería iniciar sesión con credenciales correctas y devolver un token", async () => {
    const res = await request(app).post("/api/login").send({
      Correo: "juan@test.com",
      Clave: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("Inicio de sesión exitoso");
  });

  it("Debería rechazar credenciales incorrectas", async () => {
    const res = await request(app).post("/api/login").send({
      Correo: "juan@test.com",
      Clave: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Correo o clave incorrectos.");
  });

  it("Debería rechazar login sin correo o clave", async () => {
    const res = await request(app).post("/api/login").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message"); // Debería contener un mensaje de error
  });
});
