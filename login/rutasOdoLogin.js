import express from "express"
import Login from "../controller/controlOdoLogin.js";

const router = express.Router();

router.post("/login", Login);

export default router;


// import express from "express";
// import { login } from "../config/controlOdoAutenticacion.js";

// const rutasOdoLogin = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   - name: Login Autenticador
//  *     description: Endpointa para manejar la autenticación de usuarios
//  */

// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Autenticar usuario
//  *     description: Permite a un usuario iniciar sesión con su correo y contraseña.
//  *     tags: [Login Autenticador]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - Correo
//  *               - Clave
//  *             properties:
//  *               Correo:
//  *                 type: string
//  *                 description: Correo electrónico del usuario.
//  *               Clave:
//  *                 type: string
//  *                 description: Contraseña del usuario.
//  *             example:
//  *               Correo: "usuario@ejemplo.com"
//  *               Clave: "12345"
//  *     responses:
//  *       200:
//  *         description: Login correcto.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                   description: Token JWT generado para la autenticación.
//  *             example:
//  *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *       400:
//  *         description: Credenciales incorrectas.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: Detalle del error.
//  *             example:
//  *               message: "Usuario no encontrado o clave incorrecta."
//  *       500:
//  *         description: Error interno del servidor.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: Mensaje de error.
//  *             example:
//  *               message: "Error en el servidor."
//  */
// rutasOdoLogin.post("/login", login);

// export default rutasOdoLogin;
