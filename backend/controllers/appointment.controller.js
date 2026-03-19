import fs from "fs"
import path from "path"
import { Appointment } from "../models/Appointment.model.js"

const filePath = path.resolve("data/appointments.json")

export const createAppointment = (req, res) => {

try {

const newAppointment = new Appointment(req.body)

// leer archivo
const data = fs.readFileSync(filePath, "utf-8")

const appointments = JSON.parse(data)

// agregar nueva reserva
appointments.push(newAppointment)

// guardar nuevamente
fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2))

res.status(201).json({
message: "Reserva guardada correctamente",
appointment: newAppointment
})

} catch (error) {

res.status(500).json({
error: "Error al guardar reserva"
})

}

}

export const getAvailability = (req, res) => {

try {

const { date } = req.query

// leer reservas existentes
const data = fs.readFileSync(filePath, "utf-8")
const appointments = JSON.parse(data)

// horarios posibles del consultorio
const allSlots = [
"09:00",
"09:30",
"10:00",
"10:30",
"11:00",
"11:30",
"12:00",
"12:30"
]

// obtener turnos ya reservados ese día
const bookedSlots = appointments
.filter(a => a.fecha === date)
.map(a => a.hora)

// calcular horarios disponibles
const availableSlots = allSlots.filter(
slot => !bookedSlots.includes(slot)
)
res.json({
date,
availableSlots
})

} catch (error) {

res.status(500).json({
error: "Error calculando disponibilidad"
})

}

}