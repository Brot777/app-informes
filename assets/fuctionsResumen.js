import { colonias, parametroZona } from "../utils/consts/indices.js";
import { obtenerTodoPorZona } from "../utils/fetching/getEvents.js";
import { encontrarColoniaEnDescripcion } from "../utils/fuctions/obtenerCampo.js";
let chart;

export const renderizarGrafica = (eventosPorZona) => {
  const arrayNombreZonas = Object.values(parametroZona);
  arrayNombreZonas.push("VILLA NUEVA");

  const faltas = eventosPorZona.map((evento, i) => evento.length);

  var ctx = document.getElementById("chartFaltasPorZona").getContext("2d");
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: arrayNombreZonas,
      datasets: [
        {
          label: "Faltas De agua",
          backgroundColor: "#3B7DDD",
          data: faltas,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  });
};

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

export const actualizarGrafica = async () => {
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
    ].includes(
      encontrarColoniaEnDescripcion(colonias["ZONA 6"], evento.description)
    )
      ? eventosChinautla.push(evento)
      : eventosSinChinautla.push(evento);
  }); // ZONA 6
  eventosPorZona[5] = eventosSinChinautla;
  eventosPorZona[22] = [...eventosPorZona[22], ...eventosChinautla];
  /* FIN REASIGNANDO CHINAUTLA*/

  renderizarGrafica(eventosPorZona);
  pintarConteoPorZona(eventosPorZona);
};
