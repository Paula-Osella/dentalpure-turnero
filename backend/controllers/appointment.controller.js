import fs from "fs"
import path from "path"
import { Appointment } from "../models/Appointment.model.js"

const filePath = path.resolve("data/appointments.json")

export const createAppointment = (req, res) => {

try {

const newAppointment = new Appointment(req.body)

// read file
const data = fs.readFileSync(filePath, "utf-8")

const appointments = JSON.parse(data)

// add new booking
appointments.push(newAppointment)

// save again
fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2))

res.status(201).json({
message: "Appointment saved successfully",
appointment: newAppointment
})

} catch (error) {

res.status(500).json({
error: "Error saving appointment"
})

}

}

export const getAvailability = (req, res) => {

try {

const { date } = req.query

// read existing bookings
const data = fs.readFileSync(filePath, "utf-8")
const appointments = JSON.parse(data)

// all possible clinic time slots
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

// get already booked slots for that day
const bookedSlots = appointments
.filter(a => a.fecha === date)
.map(a => a.hora)

// calculate available time slots
const availableSlots = allSlots.filter(
slot => !bookedSlots.includes(slot)
)
res.json({
date,
availableSlots
})

} catch (error) {

res.status(500).json({
error: "Error calculating availability"
})

}

}
