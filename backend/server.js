import express from "express"
import cors from "cors"
import appointmentRoutes from "./routes/appointment.routes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", appointmentRoutes)

app.listen(3000, () => {
console.log("Servidor corriendo en http://localhost:3000")
})