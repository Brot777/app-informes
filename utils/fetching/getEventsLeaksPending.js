import { fuentesDeIngreso, parametroZona } from "../consts/indices.js";
import { estaMarcaMedidorEnDescripcion } from "../fuctions/obtenerCampo.js";

const agregarFuenteYZona = (arrayEventos) => {
  const initialArraysTodosPorZona = {
    1397: [],
    1398: [],
    1399: [],
    1400: [],
    1401: [],
    1402: [],
    1403: [],
    1404: [],
    1405: [],
    1406: [],
    1407: [],
    1408: [],
    1409: [],
    1410: [],
    1411: [],
    1412: [],
    1413: [],
    1414: [],
    1415: [],
    1416: [],
    1417: [],
    1418: [],
    1419: [],
    1499: [],
    1500: [],
    1501: [],
  };
  arrayEventos.forEach((evento) => {
    let valueCustomZona;
    let valueFuenteDeIngreso = "Alcaldia Auxiliar";
    let eventoModificado = { ...evento };

    /* VALIDAR SI ES FUENTE VERIFICACION */
    estaMarcaMedidorEnDescripcion(evento.description) &&
      (valueFuenteDeIngreso = "Verificación");

    evento.TaskCustomFields.forEach((customField) => {
      initialArraysTodosPorZona[customField.value] &&
        (valueCustomZona = customField.value);
      fuentesDeIngreso[customField.value] &&
        (valueFuenteDeIngreso = fuentesDeIngreso[customField.value]);
    });
    eventoModificado.fuenteDeIngreso = valueFuenteDeIngreso;

    valueCustomZona
      ? initialArraysTodosPorZona[valueCustomZona].push(eventoModificado)
      : console.log(evento);
  });
  console.log(Object.values(initialArraysTodosPorZona).length);
  return Object.values(initialArraysTodosPorZona);
};

export const obtenerTodo = async (horaInicio, horaFinal) => {
  /* Margen */
  const horaFinalConMargenOBj = new Date(horaFinal);
  horaFinalConMargenOBj.setDate(horaFinalConMargenOBj.getDate() + 2);
  const horaFinalConMargenString = horaFinalConMargenOBj.toISOString();

  const responseTodas = await fetch(
    `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskStatus[]=3528&taskType=3400&transfer=0&endDate=${horaFinalConMargenString}&customerId=593&communitiesIds[]=787&byCreation=`,
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzI1NTQ1MjY2LCJleHAiOjE3NDEwOTcyNjZ9.3RCwLGdlwM2Qi5oZc67yz-zh_gAI4mcatFQrd8-GTgc",
      },
    }
  );

  const todosLosEventos = await responseTodas.json();

  const fechaInicialObj = new Date(horaInicio);
  const fechaFinalObj = new Date(horaFinal);
  const arrayEventos = todosLosEventos.data.tasks.filter((evento) => {
    const fechaActual = new Date(evento.createdAt);
    return fechaActual >= fechaInicialObj && fechaActual <= fechaFinalObj;
  });

  const eventosConZona = agregarFuenteYZona(arrayEventos);

  console.log(eventosConZona);

  return eventosConZona;
};

export const obtenerTodoPorZona = async (horaInicio, horaFinal) => {
  const arrayZonas = Object.keys(parametroZona);
  /* Margen */
  const horaFinalConMargenOBj = new Date(horaFinal);
  horaFinalConMargenOBj.setDate(horaFinalConMargenOBj.getDate() + 2);
  const horaFinalConMargenString = horaFinalConMargenOBj.toISOString();
  const arrayPromisesResponses = arrayZonas.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskStatus[]=3528&taskType=3400&transfer=0&customs[55][0]=${parametro}&customerId=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzI1NTQ1MjY2LCJleHAiOjE3NDEwOTcyNjZ9.3RCwLGdlwM2Qi5oZc67yz-zh_gAI4mcatFQrd8-GTgc",
        },
      }
    );
  });

  const arrayResponses = await Promise.all(arrayPromisesResponses);

  const arrayPromisesEventos = arrayResponses.map((response) =>
    response.json()
  );
  const arrayEventosData = await Promise.all(arrayPromisesEventos);
  const fechaInicialObj = new Date(horaInicio);
  const fechaFinalObj = new Date(horaFinal);
  const arrayEventos = arrayEventosData.map((eventoData) =>
    eventoData.data.tasks.filter((evento) => {
      const fechaActual = new Date(evento.createdAt);
      return fechaActual >= fechaInicialObj && fechaActual <= fechaFinalObj;
    })
  );
  return arrayEventos;
};

export const obtenerTodoPorFuenteDeIngreso = async (horaInicio, horaFinal) => {
  const arrayFuentesDeIngreso = Object.keys(fuentesDeIngreso);
  /* Margen */
  const horaFinalConMargenOBj = new Date(horaFinal);
  horaFinalConMargenOBj.setDate(horaFinalConMargenOBj.getDate() + 2);
  const horaFinalConMargenString = horaFinalConMargenOBj.toISOString();
  const arrayPromisesResponses = arrayFuentesDeIngreso.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskStatus[]=3528&taskType=3400&transfer=0&customs[56][0]=${parametro}&customerId=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,

      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzI1NTQ1MjY2LCJleHAiOjE3NDEwOTcyNjZ9.3RCwLGdlwM2Qi5oZc67yz-zh_gAI4mcatFQrd8-GTgc",
        },
      }
    );
  });

  const arrayResponses = await Promise.all(arrayPromisesResponses);

  const arrayPromisesEventos = arrayResponses.map((response) =>
    response.json()
  );
  const arrayEventosData = await Promise.all(arrayPromisesEventos);

  const fechaInicialObj = new Date(horaInicio);
  const fechaFinalObj = new Date(horaFinal);
  const arrayEventos = arrayEventosData.map((eventoData, i) =>
    eventoData.data.tasks.filter((evento) => {
      const fechaActual = new Date(evento.createdAt);

      return fechaActual >= fechaInicialObj && fechaActual <= fechaFinalObj;
    })
  );
  return arrayEventos;
};
