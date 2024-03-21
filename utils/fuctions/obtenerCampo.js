export const quitarAcentos = (cadena) => {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const encontrarColoniaEnDescripcion = (objColoniaZona, cadena) => {
  let coloniaNombre = "SIN COLONIA";
  cadena = cadena.toLowerCase(); // Convertir la cadena a minúsculas
  cadena = quitarAcentos(cadena); // Eliminar acentos de la cadena

  const arrayColoniasNombre = Object.keys(objColoniaZona);
  const arrayDeArraysPosiblesNombres = Object.values(objColoniaZona);

  arrayDeArraysPosiblesNombres.forEach((arrayPosiblesNombres, i) => {
    arrayPosiblesNombres.forEach((posibleNombre) => {
      let nombreNormalizado = posibleNombre.toLowerCase(); // Convertir la colonia a minúsculas
      nombreNormalizado = quitarAcentos(nombreNormalizado); // Eliminar acentos de la colonia
      if (cadena.includes(nombreNormalizado)) {
        coloniaNombre = arrayColoniasNombre[i];
      }
    });
  });

  return coloniaNombre;
};
