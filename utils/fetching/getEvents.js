import { fuentesDeIngreso, parametroZona } from "../consts/indices.js";

export const obtenerTodo = async (horaInicio, horaFinal) => {
  const arrayZonas = Object.keys(parametroZona);
  const horaInicioConMargenOBj = new Date(horaInicio);
  horaInicioConMargenOBj.setDate(horaInicioConMargenOBj.getDate() - 1);
  const horaInicioConMargenString = horaInicioConMargenOBj.toISOString();

  const responseTodas = await fetch(
    `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicioConMargenString}&taskType=3401&transfer=0&isFilter=true&customerId=593&communitiesIds[]=787&endDate=${horaFinal}&byCreation=`,
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
  const agregarFuenteYZona = (arrayEventos) => {
    const ecentosConZona = arrayEventos.map((evento) => {
      console.log(evento);
    });
  };
  /* 
  const agruparPorZona = (arrayEventos) => {
    // Objeto para agrupar ciudades por estado
    const agrupadoPorEstado = {};

    // Recorremos el array de ciudades
    ciudades.forEach((ciudad) => {
      const { estado } = ciudad;

      // Si el estado no existe en el objeto, lo creamos como array vacío
      if (!agrupadoPorEstado[estado]) {
        agrupadoPorEstado[estado] = [];
      }

      // Agregamos la ciudad a su respectivo estado
      agrupadoPorEstado[estado].push(ciudad);
    });

    // Convertimos el objeto en un array de arrays de ciudades
    return Object.values(agrupadoPorEstado);
  };

  const eventosAgrupados = agruparPorZona(arrayEventos); */

  console.log(arrayEventos);
  console.log(arrayEventos);
  return arrayEventos;
};

export const obtenerTodoPorZona = async (horaInicio, horaFinal) => {
  const arrayZonas = Object.keys(parametroZona);
  /* Margen */
  const horaFinalConMargenOBj = new Date(horaFinal);
  horaFinalConMargenOBj.setDate(horaFinalConMargenOBj.getDate() + 2);
  const horaFinalConMargenString = horaFinalConMargenOBj.toISOString();
  const arrayPromisesResponses = arrayZonas.map((parametro) => {
    return fetch(
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3401&transfer=0&customs[55][0]=${parametro}&customerId=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,
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
      `https://api-v2.pasalo.pro/api/v2/community-tasks/pins?startDate=${horaInicio}&taskType=3401&transfer=0&customs[56][0]=${parametro}&customerId=593&communitiesIds[]=787&endDate=${horaFinalConMargenString}&byCreation=`,

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
