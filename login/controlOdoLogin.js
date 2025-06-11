import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import userSchema from '../models/modelOdoUser.js'; 
import { loginSchema } from '../validators/validatorOdoLogin.js'; 

const router = express.Router();
const Login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { Correo, Clave } = req.body;

    const user = await userSchema.findOne({ Correo });
    
    if (!user) {
      return res.status(400).json({ message: "Correo o clave incorrectos." });
    }

    const isMatch = await bcrypt.compare(Clave, user.Clave);
    if (!isMatch) {
      return res.status(400).json({ message: "Correo o clave incorrectos." });
    }
    return res.status(200).json({ message: "Inicio de sesión exitoso" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
};
export default Login;
