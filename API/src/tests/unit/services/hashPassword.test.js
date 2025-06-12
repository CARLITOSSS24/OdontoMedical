import bcrypt from "bcryptjs";

describe("Prueba de encriptación de contraseña", () => {
  it("Debería encriptar correctamente la contraseña", async () => {
    const password = "password123";
    
    // Generar el hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar que la contraseña encriptada es diferente a la original
    expect(hashedPassword).not.toBe(password);

    // Verificar que el hash coincide con la contraseña original
    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
