import express from "express"
import cors from "cors"
import appointmentRoutes from "./routes/appointment.routes.js"
import dotenv from "dotenv"


const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()
app.use(cors({
  origin: "*"
}));
app.use(express.json())

app.use("/api", appointmentRoutes)



app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})