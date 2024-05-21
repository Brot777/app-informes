import { colonias } from "../utils/consts/indices.js";
import { obtenerTodoPorZona } from "../utils/fetching/getEvents.js";
import { encontrarColoniaEnDescripcion } from "../utils/fuctions/obtenerCampo.js";
import {
  actualizarGrafica,
  pintarConteoPorZona,
  renderizarGrafica,
} from "./fuctionsResumen.js";

/* VARIABLES GLOBALES */

let timer;

/* CARGA PAGINA */
document.addEventListener("DOMContentLoaded", async () => {
  await actualizarGrafica();
});

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
    [
      "ANEXO 3 CIUDAD REAL",
      "ANEXO 3 CIUDAD REAL II",
      "ANEXO VILLALOBOS I",
      "ANEXO VILLALOBOS II",
      "ASENTAMIENTO UNIDOS POR PAZ",
      "CIUDAD REAL",
      "CIUDAD REAL I",
      "CIUDAD REAL II",
      "MEZQUITAL",
      "MONTEMARIA",
      "MONTEMARIA I",
      "MONTEMARIA II",
      "MONTEMARIA III",
      "PORVENIR",
      "VILLA LOBOS",
      "VILLA LOBOS 1",
      "VILLA LOBOS 2",
      "VILLA LOBOS 3",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZona[11] = eventosSinVillaNueva;
  eventosPorZona.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  /* REASIGNANDO CHINAUTLA */
  const eventosChinautla = [];
  const eventosSinChinautla = [];
  eventosPorZona[5].forEach((evento) => {
    [
      "SANTA LUISA",
      "SANTA FAZ",
      "SAN JULIAN",
      "SANTA MARTA",
      "SAUZALITO",
      "EL MOLINO",
      "SANTA ISABEL",
      "FINCA SAN RAFAEL",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZona[5] = eventosSinChinautla;
  eventosPorZona[22] = [...eventosPorZona[22], ...eventosChinautla];
  /* FIN REASIGNANDO CHINAUTLA*/

  pintarConteoPorZona(eventosPorZona);
  renderizarGrafica(eventosPorZona);
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
    [
      "ANEXO 3 CIUDAD REAL",
      "ANEXO 3 CIUDAD REAL II",
      "ANEXO VILLALOBOS I",
      "ANEXO VILLALOBOS II",
      "ASENTAMIENTO UNIDOS POR PAZ",
      "CIUDAD REAL",
      "CIUDAD REAL I",
      "CIUDAD REAL II",
      "MEZQUITAL",
      "MONTEMARIA",
      "MONTEMARIA I",
      "MONTEMARIA II",
      "MONTEMARIA III",
      "PORVENIR",
      "VILLA LOBOS",
      "VILLA LOBOS 1",
      "VILLA LOBOS 2",
      "VILLA LOBOS 3",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZona[11] = eventosSinVillaNueva;
  eventosPorZona.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  /* REASIGNANDO CHINAUTLA */
  const eventosChinautla = [];
  const eventosSinChinautla = [];
  eventosPorZona[5].forEach((evento) => {
    [
      "SANTA LUISA",
      "SANTA FAZ",
      "SAN JULIAN",
      "SANTA MARTA",
      "SAUZALITO",
      "EL MOLINO",
      "SANTA ISABEL",
      "FINCA SAN RAFAEL",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZona[5] = eventosSinChinautla;
  eventosPorZona[22] = [...eventosPorZona[22], ...eventosChinautla];
  /* FIN REASIGNANDO CHINAUTLA*/

  pintarConteoPorZona(eventosPorZona);
  renderizarGrafica(eventosPorZona);
});

/* REFECHIN DE DATA CADA 5 MINUTOS */
setInterval(async () => {
  await actualizarGrafica();
}, 5 * 60 * 1000);
