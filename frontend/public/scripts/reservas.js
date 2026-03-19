console.log("reservas.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  let horaSeleccionada = null;
  const fechaInput = document.getElementById("fecha");
  const horariosContainer = document.getElementById("horariosContainer");

  fechaInput?.addEventListener("change", async () => {
    const fecha = fechaInput.value;
    if (!fecha) return;

    try {
      const res = await fetch(`http://localhost:3000/api/availability?date=${fecha}`);
      const data = await res.json();
      renderHorarios(data.availableSlots);
    } catch (err) {
      console.error(err);
    }
  });

  function renderHorarios(slots) {
    horariosContainer.innerHTML = "";

    slots.forEach(hora => {
      const btn = document.createElement("button");
      btn.className = "hora";
      btn.textContent = hora;
      btn.type = "button";
      btn.onclick = () => {
        document.querySelectorAll(".hora").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        horaSeleccionada = hora;
      };
      horariosContainer.appendChild(btn);
    });
  }

  window.crearReserva = async function () {
    const tratamiento = document.getElementById("tratamiento").value;
    const fecha = document.getElementById("fecha").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    if (!tratamiento || !fecha || !horaSeleccionada) {
      alert("Completá tratamiento, fecha y horario");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tratamiento,
          fecha,
          hora: horaSeleccionada,
          nombre,
          apellido,
          telefono,
          email,
        }),
      });

      const data = await res.json();
      mostrarConfirmacion({ tratamiento, fecha, hora: horaSeleccionada, nombre, apellido });
      limpiarFormulario();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la reserva");
    }
  };

  function mostrarConfirmacion(reserva) {
    const modal = document.getElementById("modalConfirmacion");
    const texto = document.getElementById("textoConfirmacion");

    const fechaFormateada = new Date(reserva.fecha).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    texto.innerHTML = `
      Ya tenés tu turno agendado ✔️<br><br>
      <strong>${reserva.tratamiento}</strong><br>
      ${fechaFormateada} a las <strong>${reserva.hora}</strong><br><br>
      Paciente: ${reserva.nombre} ${reserva.apellido}
    `;

    modal.classList.add("show");
  }

  window.cerrarModal = function () {
    document.getElementById("modalConfirmacion").classList.remove("show");
  };

  function limpiarFormulario() {
    const campos = ["tratamiento", "fecha", "nombre", "apellido", "telefono", "email"];
    campos.forEach(id => (document.getElementById(id).value = ""));
    document.getElementById("horariosContainer").innerHTML = "";
  }
});