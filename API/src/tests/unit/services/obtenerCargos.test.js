/** @jest-environment node */

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../../index.js"; // Asegúrate de que apunta al archivo correcto

describe("GET /api/cargo", () => {
  let token;

  beforeAll(() => {
    // Simula un usuario con permiso ADMIN
    const payload = {
      _id: "usuarioTest123",
      Permiso: "ADMIN", // Este permiso debe coincidir con lo que verifica tu middleware
    };

    token = jwt.sign(payload, process.env.JWT_SECRET || "secreto", {
      expiresIn: "1h",
    });
  });

  it("debería obtener todos los cargos exitosamente", async () => {
    const res = await request(app)
      .get("/api/cargo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debería devolver 403 si el usuario no tiene permiso ADMIN", async () => {
    const tokenSinPermiso = jwt.sign(
      { _id: "otroUsuario", permisos: [] },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/cargo")
      .set("Authorization", `Bearer ${tokenSinPermiso}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch("Acceso denegado: no tienes el rol adecuado");
  });

});
