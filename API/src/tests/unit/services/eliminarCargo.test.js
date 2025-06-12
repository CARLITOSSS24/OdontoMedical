/** @jest-environment node */

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../../index.js";
import Cargo from "../../../models/modelOdoCargo.js";

describe("DELETE /api/cargo/:id", () => {
  let token;
  let cargoId;

  beforeAll(async () => {
    token = jwt.sign({ _id: "adminId", Permiso: "ADMIN" }, process.env.JWT_SECRET || "secreto");
    const cargo = await Cargo.create({ nombre: "Temporal" });
    cargoId = cargo._id;
  });

  it("debería eliminar el cargo por ID", async () => {
    const res = await request(app)
      .delete(`/api/cargo/${cargoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Cargo eliminado correctamente");
  });
  it("debería devolver 404 si el cargo no existe", async () => {
  const idInexistente = "000000000000000000000000"; 

  const res = await request(app)
    .delete(`/api/cargo/${idInexistente}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toMatch(/no encontrado/i);
});
it("debería devolver 403 si el usuario no tiene permiso ADMIN", async () => {
  const tokenSinPermiso = jwt.sign(
    { _id: "usuarioNoAdmin", Permiso: "USUARIO" },
    process.env.JWT_SECRET || "secreto"
  );

  // Usamos el ID de un cargo que ya fue creado en el `beforeAll`
  const res = await request(app)
    .delete(`/api/cargo/${cargoId}`)
    .set("Authorization", `Bearer ${tokenSinPermiso}`);

  expect(res.statusCode).toBe(403);
  expect(res.body.message).toMatch(/no tienes el rol adecuado/i);
});

});
