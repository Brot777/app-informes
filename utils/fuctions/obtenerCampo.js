const normalizarTexto = (texto) => {
  const textoEnMinusculas = texto.toLowerCase();
  const textoSinAcentos = textoEnMinusculas
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const textoSinEspacionAdicionales = textoSinAcentos
    .trim()
    .replace(/\s+/g, " ");
  return textoSinEspacionAdicionales;
};

export const encontrarColoniaEnDescripcion = (objColoniaZona, cadena) => {
  let coloniaNombre = "SIN COLONIA";
  cadena = normalizarTexto(cadena); // Normaliza cadena

  const arrayColoniasNombre = Object.keys(objColoniaZona);
  const arrayDeArraysPosiblesNombres = Object.values(objColoniaZona);

  arrayDeArraysPosiblesNombres.forEach((arrayPosiblesNombres, i) => {
    arrayPosiblesNombres.forEach((posibleNombre) => {
      const nombreNormalizado = normalizarTexto(posibleNombre); // Eliminar acentos de la colonia
      if (cadena.includes(nombreNormalizado)) {
        coloniaNombre = arrayColoniasNombre[i];
      }
    });
  });

  return coloniaNombre;
};
