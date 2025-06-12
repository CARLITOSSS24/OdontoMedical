/** @jest-environment node */

import mongoose from "mongoose";
import dotenv from "dotenv";



dotenv.config();

describe("Prueba de conexión a MongoDB", () => {
  it("Debería conectarse correctamente a la base de datos", async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      expect(mongoose.connection.readyState).toBe(1); // Estado 1 significa "conectado"
    } catch (error) {
      throw new Error(`Error de conexión: ${error.message}`);
    } finally {
      await mongoose.disconnect(); // Cierra la conexión después de la prueba
    }
  });
});
