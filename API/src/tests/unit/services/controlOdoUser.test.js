/** @jest-environment node */

import request from "supertest";
import app from "../../../index.js"; // Asegúrate de que la ruta sea correcta
import bcrypt from "bcryptjs";
import userSchema from "../../../models/modelOdoUser.js"; // Ajusta la ruta según tu estructura

describe("Pruebas del controlador de creación de usuario", () => {
  let testUser;

  beforeAll(async () => {
    // Eliminar solo el usuario de prueba si existe
      await userSchema.deleteMany({
    $or: [
      { Correo: "juan@example.com" },
      { Doc_identificacion: "12345678293" }
    ]
  });

    const hashedPassword = await bcrypt.hash("password123", 10);
    testUser = await userSchema.create({
      Nombre: "Juan",
      Apellido: "Pérez",
      Tipo_Doc: "CC",
      Doc_identificacion: "123456",
      Telefono: "3001234567",
      Correo: "juan@example.com",
      Clave: hashedPassword,
      Permiso: "6820f7a114cd039b43a1f666",
      Genero: "Masculino",
      Edad: 30,
    });
  });

  afterAll(async () => {
    // Eliminar solo el usuario de prueba después de la prueba
    await userSchema.deleteOne({ _id: testUser._id })
    ;
  });

    it("Debería fallar al crear un usuario si ocurre un error al enviar el correo", async () => {
    const userData = {
      Nombre: "Juan",
      Apellido: "Pérez",
      Tipo_Doc: "CC",
      Doc_identificacion: "12345678293",
      Telefono: "3001234567",
      Correo: "juan@example.com",
      Clave: "password123",
      Permiso: "6820f7a114cd039b43a1f666",
      Genero: "Masculino",
      Edad: 30,
    };

    const res = await request(app).post("/api/users").send(userData);
    console.log("Respuesta del servidor:", res.body);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error al enviar el correo de verificación. Intenta nuevamente.");
  });
;
});
