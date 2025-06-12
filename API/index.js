import corsConfig from "./src/config/corsOdoConfig.js";
import events from "events";
import express from "express";
import dotenv from "dotenv";
import port from "./src/config/bdD.js";  
import swaggerDocs from "./swagger.js";  
import modelOdoPermisos from "./src/routes/rutasOdoPermisos.js";
import rutasOdoHistoriales from "./src/routes/rutasOdoHistoriales.js";
import modelOdoServicios from "./src/routes/rutasOdoServicios.js";
import modelOdoUsers from "./src/routes/rutasOdoUser.js";
import modelOdoConsultorio from "./src/routes/rutasOdoConsultorios.js";
import modelOdoDoctora from "./src/routes/rutasOdoDoctora.js";
import rutasOdoCitas from "./src/routes/rutasOdoCitas.js"; 
import rutasOdoLogin from "./src/routes/rutasOdoLogin.js";

import mongoose from "mongoose";

dotenv.config();
events.setMaxListeners(20);

const app = express();
app.use(corsConfig);
app.use(express.json());

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Middleware para conectar a la base de datos en cada request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use("/api/", modelOdoPermisos);
app.use("/api/", rutasOdoHistoriales);
app.use("/api/", modelOdoServicios);
app.use("/api/", modelOdoUsers);
app.use("/api/", modelOdoConsultorio);
app.use("/api/", modelOdoDoctora);
app.use("/api/", rutasOdoCitas);
app.use("/api/", rutasOdoLogin);

app.get("/", (req, res) => {
  res.send("<h1>ESTA ES LA API (Serverless en Vercel)</h1>");
});

// Para Vercel, simplemente exportamos la app de Express
export default app;