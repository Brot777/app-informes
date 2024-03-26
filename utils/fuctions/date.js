export const convertirFechaISOaDDMMAAAAHHMM = (fechaISO) => {
  let fecha = new Date(fechaISO);
  let mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, así que sumamos 1
  let dia = fecha.getDate();
  let año = fecha.getFullYear();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();

  // Asegurarse de que los valores de mes, día, hora y minuto tengan dos dígitos
  mes = mes < 10 ? "0" + mes : mes;
  dia = dia < 10 ? "0" + dia : dia;
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  let fechaFormateada =
    dia + "/" + mes + "/" + año + " " + horas + ":" + minutos;
  return fechaFormateada;
};

export const convertirFechaISOaHoraFecha = (fechaISO) => {
  let fecha = new Date(fechaISO);
  let mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, así que sumamos 1
  let dia = fecha.getDate();
  let año = fecha.getFullYear();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();

  // Asegurarse de que los valores de mes, día, hora y minuto tengan dos dígitos
  mes = mes < 10 ? "0" + mes : mes;
  dia = dia < 10 ? "0" + dia : dia;
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  let fechaFormateada =
    "HORA"+"_"+ horas+"_" + minutos + "-"+"FECHA"+"_" +dia+"-"+ mes + "-" + año ;
  return fechaFormateada;
};

export const obtenerDia = (fechaISO) => {
  let fecha = new Date(fechaISO);
  let dia = fecha.getDate();
  return dia;
};

export const obtenerMes = (fechaISO) => {
  let fecha = new Date(fechaISO);
  let mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, así que sumamos 1
  return mes;
};

export const obtenerAño = (fechaISO) => {
  let fecha = new Date(fechaISO);
  let año = fecha.getFullYear();
  return año;
};
