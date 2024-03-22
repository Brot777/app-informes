import {
  Regiones,
  idsSubtipoDeTarea,
  parametroZona,
} from "../utils/consts/indices.js";
import { obtenerTodoPorZona } from "../utils/fetching/getEvents.js";
import {
  convertirFechaISOaDDMMAAAAHHMM,
  obtenerAño,
  obtenerDia,
  obtenerMes,
} from "../utils/fuctions/date.js";
import { formatEventsTableAll } from "./fuctionsIndex.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  console.log(fechaActualISO, fechaInicioDeHoyISO);

  const eventosPorZona = await obtenerTodoPorZona(
    fechaInicioDeHoyISO,
    fechaActualISO
  );
  const arrayNombreZonas = Object.values(parametroZona);

  let eventosTotales = [];
  eventosPorZona.forEach((eventosZona, i) => {
    const newEventosZona = eventosZona.map((evento) => {
      return { ...evento, zona: arrayNombreZonas[i] };
    });
    eventosTotales = eventosTotales.concat(newEventosZona);
  });

  eventosTotales = eventosTotales.toSorted(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  console.log(eventosTotales);
  renderEvents(eventosTotales);
});

export const renderEvents = (tasks) => {
  const $containerPatients = document.getElementById("container-events");
  $containerPatients.innerHTML = "";
  $containerPatients.innerHTML = ` <thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Tipo de Evento</th>
    <th scope="col">Tipo falta de Agua</th>
    <th scope="col" colspan="4">Descripcion</th>
    <th scope="col">Zona</th>
    <th scope="col">Fecha Creó</th>
    <th scope="col">Dia</th>
    <th scope="col">Mes</th>
    <th scope="col">Region</th>
    <th scope="col">Año</th>
  </tr>
</thead>`;
  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody-events");
  tasks.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("table-secondary");
    tr.classList.add("patient-row");
    tr.setAttribute("data-id", task.id);
    tr.innerHTML = `
    <td>${task.id}</td>
    <td>Falta de Agua</td>
    <td>${idsSubtipoDeTarea[task.taskSubType.toString()]}</td>
    <td colspan="4">${task.description}</td>
    <td>${task.zona}</td>
    <td>${convertirFechaISOaDDMMAAAAHHMM(task.createdAt)}</td>
    <td>${obtenerDia(task.createdAt)}</td>
    <td>${obtenerMes(task.createdAt)}</td>
    <td>${Regiones[task.zona]}</td>
    <td>${obtenerAño(task.createdAt)}</td>
    `;
    tbody.appendChild(tr);
  });
  $containerPatients.appendChild(tbody);
};

/* INPUTS TIPE DATE-TIME-LOCAL */
const horaInicioTodas = document.getElementById("horaInicioTodas");
const horaFinalTodas = document.getElementById("horaFinalTodas");

horaInicioTodas.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioTodas.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalTodas.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);
  const arrayNombreZonas = Object.values(parametroZona);
  let eventosTotales = [];
  eventosPorZona.forEach((eventosZona, i) => {
    const newEventosZona = eventosZona.map((evento) => {
      return { ...evento, zona: arrayNombreZonas[i] };
    });
    eventosTotales = eventosTotales.concat(newEventosZona);
  });

  eventosTotales = eventosTotales.toSorted(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  console.log(eventosTotales);
  renderEvents(eventosTotales);
});

horaFinalTodas.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioTodas.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalTodas.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);
  const arrayNombreZonas = Object.values(parametroZona);
  let eventosTotales = [];
  eventosPorZona.forEach((eventosZona, i) => {
    const newEventosZona = eventosZona.map((evento) => {
      return { ...evento, zona: arrayNombreZonas[i] };
    });
    eventosTotales = eventosTotales.concat(newEventosZona);
  });

  eventosTotales = eventosTotales.toSorted(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  console.log(eventosTotales);
  renderEvents(eventosTotales);
});
