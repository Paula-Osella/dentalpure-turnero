export class Appointment {

constructor({
nombre,
apellido,
telefono,
email,
tratamiento,
fecha,
hora
}){

this.nombre = nombre
this.apellido = apellido
this.telefono = telefono
this.email = email
this.tratamiento = tratamiento
this.fecha = fecha
this.hora = hora
this.createdAt = new Date()

}

}