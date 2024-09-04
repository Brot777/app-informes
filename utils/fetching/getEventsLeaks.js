import { fuentesDeIngreso, parametroZona } from "../consts/indices.js";

export const obtenerTodoPorZona = async (horaInicio, horaFinal) => {
  const arrayZonas = Object.keys(parametroZona);
  /* Margen */
  const horaFinalConMargenOBj = new Date(horaFinal);
  horaFinalConMargenOBj.setDate(horaFinalConMargenOBj.getDate() + 2);
  const horaFinalConMargenString = horaFinalConMargenOBj.toISOString();
  const arrayPromisesResponses = arrayZonas.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3400&transfer=0&customs[55][0]=${parametro}&customer=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzI1NDY0NDE4LCJleHAiOjE3NDEwMTY0MTh9.GyugY_Cib3djzmIOHqjOgEn5zs6YiwBE4BCl6fqkaww",
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
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3400&transfer=0&customs[56][0]=${parametro}&customer=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,

      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNSwiaWF0IjoxNzI1NDY0NDE4LCJleHAiOjE3NDEwMTY0MTh9.GyugY_Cib3djzmIOHqjOgEn5zs6YiwBE4BCl6fqkaww",
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
