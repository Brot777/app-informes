import { colonias, parametroZona } from "../utils/consts/indices.js";
import { obtenerTodoPorZona } from "../utils/fetching/getEvents.js";
import { encontrarColoniaEnDescripcion } from "../utils/fuctions/obtenerCampo.js";

/* CARGA PAGINA */
document.addEventListener("DOMContentLoaded", async () => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const eventosPorZona = await obtenerTodoPorZona(
    fechaInicioDeHoyISO,
    fechaActualISO
  );

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZona[11].forEach((evento) => {
    ["MEZQUITAL", "VILLA LOBOS 1", "CIUDAD REAL"].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZona[11] = eventosSinVillaNueva;
  eventosPorZona.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  pintarConteoPorZona(eventosPorZona);
});

/* RENDERIZADO DE ZONAS */
export const pintarConteoPorZona = (eventosPorZona) => {
  const tableConteo = document.getElementById("container-conteo-zonas");
  tableConteo.innerHTML = "";

  tableConteo.innerHTML = ` <thead>
  <tr>
    <th scope="col">Zona</th>
    <th scope="col">Faltas</th>
  </tr>
</thead>`;

  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody-events");
  const arrayNombreZonas = Object.values(parametroZona);
  arrayNombreZonas.push("VILLA NUEVA");
  let contadorFaltasTotales = 0;
  eventosPorZona.forEach((evento, i) => {
    const tr = document.createElement("tr");
    tr.classList.add("table-secondary");
    tr.classList.add("patient-row");
    tr.setAttribute("data-id", evento.id);
    tr.innerHTML = `
    <td>${arrayNombreZonas[i]}</td>
    <td>${evento.length}</td>
    `;
    tbody.appendChild(tr);
    contadorFaltasTotales += evento.length;
  });

  const tr = document.createElement("tr");
  tr.classList.add("table-secondary");
  tr.classList.add("patient-row");
  tr.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${contadorFaltasTotales}</strong></td>
    `;
  tbody.appendChild(tr);

  tableConteo.appendChild(tbody);
};

/* INPUTS TIPE DATE-TIME-LOCAL */
const horaInicioResumen = document.getElementById("horaInicioResumen");
const horaFinalResumen = document.getElementById("horaFinalResumen");

horaInicioResumen.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioResumen.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalResumen.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZona[11].forEach((evento) => {
    ["MEZQUITAL", "VILLA LOBOS 1", "CIUDAD REAL"].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZona[11] = eventosSinVillaNueva;
  eventosPorZona.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  pintarConteoPorZona(eventosPorZona);
});

horaFinalResumen.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioResumen.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalResumen.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZona[11].forEach((evento) => {
    ["MEZQUITAL", "VILLA LOBOS 1", "CIUDAD REAL"].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZona[11] = eventosSinVillaNueva;
  eventosPorZona.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  pintarConteoPorZona(eventosPorZona);
});
