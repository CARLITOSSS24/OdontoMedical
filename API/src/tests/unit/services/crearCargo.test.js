/** @jest-environment node */

import request from "supertest";
import app from "../../../index.js";
import jwt from "jsonwebtoken";
import Cargo from "../../../models/modelOdoCargo.js"; // Asegúrate de que esta ruta es correcta
import mongoose from "mongoose";

let token;
let cargoCreadoId; // Aquí almacenamos el ID del cargo creado

beforeAll(() => {
  const payload = { Correo: "carlitosojeda59@gmail.com", Permiso: "ADMIN" };
  token = jwt.sign(payload, process.env.JWT_SECRET || "secreto", { expiresIn: "1h" });
});

afterAll(async () => {
  // Eliminamos el cargo creado durante la prueba
  if (cargoCreadoId) {
    await Cargo.findByIdAndDelete(cargoCreadoId);
  }
  // Si estás usando Mongoose y es el final de todas las pruebas:
  await mongoose.connection.close();
});

describe("POST /api/cargo", () => {
  it("debería crear un cargo exitosamente", async () => {
    const res = await request(app)
      .post("/api/cargo")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nombre: "ADMIN"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nombre).toBe("ADMIN");

    // Guardamos el ID para eliminarlo después
    cargoCreadoId = res.body._id;
  });

it("debería fallar si falta un campo requerido", async () => {
  const res = await request(app)
    .post("/api/cargo")
    .set("Authorization", `Bearer ${token}`) 
    .send({
      descripcion: "" 
    });

  expect(res.statusCode).toBe(400); 
  expect(res.body.message).toMatch("El nombre del cargo es obligatorio");
});

});
