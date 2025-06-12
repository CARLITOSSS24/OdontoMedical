/** @jest-environment node */

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../../index.js";
import Cargo from "../../../models/modelOdoCargo.js"; // Asegúrate de que esta ruta es correcta

describe("PATCH /api/cargo/:id", () => {
  let token;
  let cargoId;

  beforeAll(async () => {
    token = jwt.sign(
      { _id: "adminTest123", Permiso: "ADMIN" },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );

    const crearRes = await request(app)
      .post("/api/cargo")
      .set("Authorization", `Bearer ${token}`)
      .send({ nombre: "Asistente" });

    cargoId = crearRes.body._id;
  });

  afterAll(async () => {
    if (cargoId) {
      await Cargo.findByIdAndDelete(cargoId);
    }
  });

  it("debería actualizar el nombre del cargo", async () => {
    const res = await request(app)
      .patch(`/api/cargo/${cargoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nombre: "Asistente Senior" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Cargo actualizado correctamente");
    expect(res.body.data.nombre).toBe("Asistente Senior");
  });
});
