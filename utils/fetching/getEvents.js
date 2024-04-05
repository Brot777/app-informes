import { fuentesDeIngreso, parametroZona } from "../consts/indices.js";

export const obtenerTodoPorZona = async (horaInicio, horaFinal) => {
  const arrayZonas = Object.keys(parametroZona);
  const arrayPromisesResponses = arrayZonas.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3401&transfer=0&customs[55][0]=${parametro}&customer=593&communitiesIds[]=787&endDate=${horaFinal}&byCreation=`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzA5OTA4NjY1LCJleHAiOjE3MjU0NjA2NjV9.I3VHi5X32IC2n9gt4yeBki97ZJJ3wYcN8K4ychl5NAw",
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
  const arrayPromisesResponses = arrayFuentesDeIngreso.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3401&transfer=0&customs[56][0]=${parametro}&customer=593&communitiesIds[]=787&endDate=${horaFinal}&byCreation=`,

      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzA5OTA4NjY1LCJleHAiOjE3MjU0NjA2NjV9.I3VHi5X32IC2n9gt4yeBki97ZJJ3wYcN8K4ychl5NAw",
        },
      }
    );
  });

  const arrayResponses = await Promise.all(arrayPromisesResponses);

  const arrayPromisesEventos = arrayResponses.map((response) =>
    response.json()
  );
  const arrayEventosData = await Promise.all(arrayPromisesEventos);
  console.log(arrayEventosData);

  const fechaInicialObj = new Date(horaInicio);
  const fechaFinalObj = new Date(horaFinal);
  const arrayEventos = arrayEventosData.map((eventoData, i) =>
    eventoData.data.tasks.filter((evento) => {
      const fechaActual = new Date(evento.createdAt);
      if (i == 16) {
        console.log(
          evento.id,
          { fechaInicialObj, fechaActual, fechaFinalObj },
          fechaActual >= fechaInicialObj && fechaActual <= fechaFinalObj
        );
      }

      return fechaActual >= fechaInicialObj && fechaActual <= fechaFinalObj;
    })
  );

  console.log(arrayEventos);
  return arrayEventos;
};
