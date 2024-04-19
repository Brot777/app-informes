import {
  Regiones,
  colonias,
  fuentesDeIngreso,
  idsSubtipoDeTarea,
  parametroZona,
} from "../utils/consts/indices.js";
import {
  obtenerTodoPorFuenteDeIngreso,
  obtenerTodoPorZona,
} from "../utils/fetching/getEvents.js";
import {
  convertirFechaISOaDDMMAAAAHHMM,
  convertirFechaISOaHoraFecha,
  obtenerAño,
  obtenerDia,
  obtenerMes,
} from "../utils/fuctions/date.js";
import { encontrarColoniaEnDescripcion } from "../utils/fuctions/obtenerCampo.js";
import { addEventMarker, escapeNewlines } from "./fuctionsPorZona.js";

/* VARIABLES GENERALES */
let dataGeneral = [];

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

  /* AGREGANDO FUENTE DE INGRESO */
  const eventosPorFuenteDeIngreso = await obtenerTodoPorFuenteDeIngreso(
    fechaInicioDeHoyISO,
    fechaActualISO
  );

  const arrayNombresFuenteDeIngreso = Object.values(fuentesDeIngreso);

  const eventosPorZonaConFuente = eventosPorZona.map((eventosZona) =>
    eventosZona.map((evento) => {
      let fuenteDeIngreso = "";
      eventosPorFuenteDeIngreso.forEach((eventosFuente, i) => {
        const eventoFind = eventosFuente.find(
          (eventoF) => eventoF.id == evento.id
        );
        eventoFind && (fuenteDeIngreso = arrayNombresFuenteDeIngreso[i]);
      });

      return {
        ...evento,
        fuenteDeIngreso: fuenteDeIngreso
          ? fuenteDeIngreso
          : "Alcaldia Auxiliar",
      };
    })
  );
  /* FIN AGREGANDO FUENTE DE INGRESO */

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZonaConFuente[11].forEach((evento) => {
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
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZonaConFuente[11] = eventosSinVillaNueva;
  eventosPorZonaConFuente.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  /* REASIGNANDO CHINAUTLA */
  const eventosChinautla = [];
  const eventosSinChinautla = [];
  eventosPorZonaConFuente[5].forEach((evento) => {
    [
      "SANTA LUISA",
      "SANTA FAZ",
      "SAN JULIAN",
      "SANTA MARTA",
      "SAUZALITO",
      "EL MOLINO",
      "SANTA ISABEL",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZonaConFuente[5] = eventosSinChinautla;
  eventosPorZonaConFuente[22] = [
    ...eventosPorZonaConFuente[22],
    ...eventosChinautla,
  ];
  /* FIN REASIGNANDO CHINAUTLA*/

  pintarEventosPorZona(eventosPorZonaConFuente);
});

/* RENDERIZADO DE ZONAS */
export const pintarEventosPorZona = (eventosPorZona) => {
  const $containerTables = document.getElementById("container-tables");
  $containerTables.innerHTML = "";
  const arrayNombreZonas = Object.values(parametroZona);
  arrayNombreZonas.push("VILLA NUEVA");
  const dataExportar = [];
  eventosPorZona.forEach((eventosZona, i) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titleCard = document.createElement("div");
    titleCard.classList.add("badge", "bg-dark", "w-100", "py-2");
    titleCard.innerHTML = `${arrayNombreZonas[i]} - FALTAS: ${eventosZona.length}`;
    if (eventosZona.length == 0) {
      return;
    }
    cardBody.appendChild(titleCard);

    const tableZone = document.createElement("table");
    tableZone.classList.add("table", "table-hover", "table-patients");

    tableZone.innerHTML = `<thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Tipo de Evento</th>
      <th scope="col">Tipo falta de Agua</th>
      <th scope="col" colspan="2">Descripcion</th>
      <th scope="col">Zona</th>
      <th scope="col">Colonia</th>
      <th scope="col">Fuente de Ingreso</th>
      <th scope="col">Fecha Creó</th>
      <th scope="col">Dia</th>
      <th scope="col">Mes</th>
      <th scope="col">Region</th>
      <th scope="col">Año</th>
    </tr>
  </thead>`;
    const tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody-events");
    eventosZona.forEach((task, j) => {
      const tr = document.createElement("tr");
      tr.classList.add("table-secondary");
      tr.classList.add("patient-row");
      tr.setAttribute("data-id", task.id);
      tr.setAttribute("id", task.id);
      tr.innerHTML = `
    <td>${task.id}</td>
    <td>Falta de Agua</td>
    <td>${idsSubtipoDeTarea[task.taskSubType.toString()] || "Domiciliar"}</td>
    <td colspan="2">${task.description}</td>
    <td>${arrayNombreZonas[i]}</td>
    <td>${encontrarColoniaEnDescripcion(
      colonias[arrayNombreZonas[i]],
      task.description
    )}</td>
    <td>${task.fuenteDeIngreso}</td>
    <td>${convertirFechaISOaDDMMAAAAHHMM(task.createdAt)}</td>
    <td>${obtenerDia(task.createdAt)}</td>
    <td>${obtenerMes(task.createdAt)}</td>
    <td>${Regiones[arrayNombreZonas[i]]}</td>
    <td>${obtenerAño(task.createdAt)}</td>
    `;
      tbody.appendChild(tr);

      dataExportar.push({
        Id: task.id,
        "Tipo de Evento": "Falta de Agua",
        "Tipo falta de Agua": idsSubtipoDeTarea[task.taskSubType.toString()],
        Descripcion: task.description,
        Zona: arrayNombreZonas[i],
        Colonia: encontrarColoniaEnDescripcion(
          colonias[arrayNombreZonas[i]],
          task.description
        ),
        "Fuente de Ingreso": task.fuenteDeIngreso,
        Fecha: convertirFechaISOaDDMMAAAAHHMM(task.createdAt),
        Dia: obtenerDia(task.createdAt),
        Mes: obtenerMes(task.createdAt),
        Region: Regiones[arrayNombreZonas[i]],
        Año: obtenerAño(task.createdAt),
      });
    });
    tableZone.appendChild(tbody);
    cardBody.appendChild(tableZone);
    card.appendChild(cardBody);
    $containerTables.appendChild(card);
  });
  addEventMarker();
  dataGeneral = dataExportar;
};

/* INPUTS TIPE DATE-TIME-LOCAL */
const horaInicioPorZona = document.getElementById("horaInicioPorZona");
const horaFinalPorZona = document.getElementById("horaFinalPorZona");

horaInicioPorZona.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioPorZona.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalPorZona.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);

  const eventosPorFuenteDeIngreso = await obtenerTodoPorFuenteDeIngreso(
    horaInicioIso,
    horaFinIso
  );

  const arrayNombresFuenteDeIngreso = Object.values(fuentesDeIngreso);

  const eventosPorZonaConFuente = eventosPorZona.map((eventosZona) =>
    eventosZona.map((evento) => {
      let fuenteDeIngreso = "";
      eventosPorFuenteDeIngreso.forEach((eventosFuente, i) => {
        const eventoFind = eventosFuente.find(
          (eventoF) => eventoF.id == evento.id
        );
        eventoFind && (fuenteDeIngreso = arrayNombresFuenteDeIngreso[i]);
      });

      return {
        ...evento,
        fuenteDeIngreso: fuenteDeIngreso
          ? fuenteDeIngreso
          : "Alcaldia Auxiliar",
      };
    })
  );

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZonaConFuente[11].forEach((evento) => {
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
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZonaConFuente[11] = eventosSinVillaNueva;
  eventosPorZonaConFuente.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  /* REASIGNANDO CHINAUTLA */
  const eventosChinautla = [];
  const eventosSinChinautla = [];
  eventosPorZonaConFuente[5].forEach((evento) => {
    [
      "SANTA LUISA",
      "SANTA FAZ",
      "SAN JULIAN",
      "SANTA MARTA",
      "SAUZALITO",
      "EL MOLINO",
      "SANTA ISABEL",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZonaConFuente[5] = eventosSinChinautla;
  eventosPorZonaConFuente[22] = [
    ...eventosPorZonaConFuente[22],
    ...eventosChinautla,
  ];
  /* FIN REASIGNANDO CHINAUTLA*/

  pintarEventosPorZona(eventosPorZonaConFuente);
});

horaFinalPorZona.addEventListener("change", async (e) => {
  // Obtener la hora actual en formato ISO
  const fechaActualISO = new Date().toISOString();
  // Obtener la hora de hoy a las 00:00 horas en formato ISO
  const hoyMedianoche = new Date();
  hoyMedianoche.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para obtener la medianoche
  const fechaInicioDeHoyISO = hoyMedianoche.toISOString();

  const horaInicio = horaInicioPorZona.value || fechaInicioDeHoyISO;
  const horaFin = horaFinalPorZona.value || fechaActualISO;

  const horaInicioIso = new Date(horaInicio).toISOString();
  const horaFinIso = new Date(horaFin).toISOString();

  const eventosPorZona = await obtenerTodoPorZona(horaInicioIso, horaFinIso);

  const eventosPorFuenteDeIngreso = await obtenerTodoPorFuenteDeIngreso(
    horaInicioIso,
    horaFinIso
  );

  const arrayNombresFuenteDeIngreso = Object.values(fuentesDeIngreso);

  const eventosPorZonaConFuente = eventosPorZona.map((eventosZona) =>
    eventosZona.map((evento) => {
      let fuenteDeIngreso = "";
      eventosPorFuenteDeIngreso.forEach((eventosFuente, i) => {
        const eventoFind = eventosFuente.find(
          (eventoF) => eventoF.id == evento.id
        );
        eventoFind && (fuenteDeIngreso = arrayNombresFuenteDeIngreso[i]);
      });

      return {
        ...evento,
        fuenteDeIngreso: fuenteDeIngreso
          ? fuenteDeIngreso
          : "Alcaldia Auxiliar",
      };
    })
  );

  /* AGREGANDO ZONA VILLA NUEVA */
  const eventosVillaNueva = [];
  const eventosSinVillaNueva = [];
  eventosPorZonaConFuente[11].forEach((evento) => {
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
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 12"], evento.description)
    )
      ? eventosVillaNueva.push(evento)
      : eventosSinVillaNueva.push(evento);
  }); // ZONA 12
  eventosPorZonaConFuente[11] = eventosSinVillaNueva;
  eventosPorZonaConFuente.push(eventosVillaNueva);
  /* FIN AGREGANDO ZONA VILLA NUEVA */

  /* REASIGNANDO CHINAUTLA */
  const eventosChinautla = [];
  const eventosSinChinautla = [];
  eventosPorZonaConFuente[5].forEach((evento) => {
    [
      "SANTA LUISA",
      "SANTA FAZ",
      "SAN JULIAN",
      "SANTA MARTA",
      "SAUZALITO",
      "EL MOLINO",
      "SANTA ISABEL",
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZonaConFuente[5] = eventosSinChinautla;
  eventosPorZonaConFuente[22] = [
    ...eventosPorZonaConFuente[22],
    ...eventosChinautla,
  ];
  /* FIN REASIGNANDO CHINAUTLA*/

  pintarEventosPorZona(eventosPorZonaConFuente);
});

/* BOTON DESCARGAR CSV */
const buttonDescargarPorZona = document.getElementById(
  "button-descargar-por-zona"
);
buttonDescargarPorZona.addEventListener("click", (e) => {
  // Escapar los saltos de línea en los valores de los campos
  dataGeneral.forEach((item) => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        item[key] = escapeNewlines(item[key]);
      }
    }
  });

  const csv = Papa.unparse(dataGeneral);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", "data.csv");
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

/* CACPTURAR PANTALLA */
document
  .getElementById("convertButton")
  .addEventListener("click", async (e) => {
    // Capturar el contenido del elemento específico
    const canvas = await html2canvas(
      document.getElementById("container-tables"),
      {
        width: document.documentElement.scrollWidth, // Ajustar el ancho de captura al ancho total del documento
        height: document.body.scrollHeight, // Capturar toda la altura del contenido
        scale: window.devicePixelRatio > 1 ? 2 : 1, // Escala dependiendo del dispositivo
      }
    );

    // Convertir la captura en un archivo PDF
    const pdfDoc = await PDFLib.PDFDocument.create();
    const pages = [];

    // Dividir el contenido en páginas si excede el límite de tamaño de página de jsPDF
    const MAX_PAGE_HEIGHT = 14400;
    const totalHeight = canvas.height;
    let y = 0;

    while (y < totalHeight) {
      const pageHeight = Math.min(totalHeight - y, MAX_PAGE_HEIGHT);
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width;
      newCanvas.height = pageHeight;
      const context = newCanvas.getContext("2d");
      context.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        pageHeight,
        0,
        0,
        canvas.width,
        pageHeight
      );
      const pngData = newCanvas.toDataURL("image/png");
      const pngImage = await pdfDoc.embedPng(pngData);
      const page = pdfDoc.addPage([canvas.width, pageHeight]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: pageHeight,
      });
      pages.push(page);
      y += pageHeight;
    }

    // Guardar el archivo PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `reporte_falta_de_agua-${convertirFechaISOaHoraFecha(
      new Date()
    )}.pdf`;
    link.click();
  });
