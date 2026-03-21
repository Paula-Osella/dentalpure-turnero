import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointment.routes.js";
import dotenv from "dotenv";

dotenv.config(); // 👈 mejor arriba

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 CORS configurado
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// 👇 rutas
app.use("/api", appointmentRoutes);

// 👇 opcional pero MUY útil para probar
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto ${PORT}");
});