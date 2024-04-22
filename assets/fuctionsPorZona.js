export const convertirArrayAcsv = (array) => {
  let csvContent = "";

  // Encabezado
  const headers = Object.keys(array[0]);
  csvContent += headers.map((header) => `"${header}"`).join(",") + "\r\n";

  // Datos
  array.forEach((item) => {
    const values = headers.map((header) => item[header]);
    csvContent += values.map((value) => `"${value}"`).join(",") + "\r\n";
  });
  console.log(csvContent);
  return csvContent;
};

export const escapeNewlines = (value) => {
  const str = `${value}`;
  return str.replace(/(\r\n|\n|\r)/gm, "\\n");
};

export const addEventMarker = () => {
  let $trZones = document.querySelectorAll(".patient-row");
  $trZones.forEach((tr) => {
    tr.addEventListener("click", async (e) => {
      tr.classList.toggle("table-danger");
      tr.classList.toggle("table-secondary");
    });
  });
};

export const ordenarPorColonia = () => {};
