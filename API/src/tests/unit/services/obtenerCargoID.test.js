/** @jest-environment node */

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../../index.js";
import Cargo from "../../../models/modelOdoCargo.js";

describe("GET /api/cargo/:id", () => {
  let token;
  let cargoId;

  beforeAll(async () => {
    token = jwt.sign({ _id: "adminId", Permiso: "ADMIN" }, process.env.JWT_SECRET || "secreto");
    const cargo = await Cargo.create({ nombre: "Supervisor" });
    cargoId = cargo.id;
  });

  afterAll(async () => {
    await Cargo.findByIdAndDelete(cargoId);
  });

it("debería obtener un cargo por su ID", async () => {
  const res = await request(app)
    .get(`/api/cargo/${cargoId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("_id", cargoId.toString());
  expect(res.body).toHaveProperty("nombre", "Supervisor");
});

});
