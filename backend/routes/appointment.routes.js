import express from "express"
import { createAppointment, getAvailability  } from "../controllers/appointment.controller.js"

const router = express.Router()

router.post("/appointments", createAppointment)
router.get("/availability", getAvailability)

export default router