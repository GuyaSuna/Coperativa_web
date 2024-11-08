import React, { useState } from "react";
import * as XLSX from "xlsx";
import { postCapitalInteres } from "@/Api/api";

const ExcelReader = ({ setInteresParm, setCapitalParm, cooperativa }) => {
  const [data, setData] = useState([]);
  const [capital, setCapital] = useState(0);
  const [interes, setInteres] = useState(0);
  const [capitalInteresEntities, setCapitalInteresEntities] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Validar que se ha seleccionado un archivo
    if (!file) {
      alert("Por favor, selecciona un archivo antes de continuar.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Eliminar las primeras dos filas (que podrían contener encabezados)
      jsonData = jsonData.slice(2);
      setData(jsonData);

      const capitalInteresEntities = jsonData.map((row) => ({
        interes: row[9] || 0,
        capital: row[8] || 0,
        fecha: new Date((row[0] - 25567) * 86400 * 1000).toISOString(),
      }));

      setCapitalInteresEntities(capitalInteresEntities);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      // Buscar datos de capital e interés para el mes actual
      const todayData = jsonData.find((row) => {
        const excelDate = new Date((row[0] - 25567) * 86400 * 1000);
        return (
          excelDate.getMonth() + 1 === currentMonth &&
          excelDate.getFullYear() === currentYear
        );
      });

      // Si hay datos para el mes actual, los asigna
      if (todayData) {
        setCapital(todayData[8]); // Capital
        setInteres(todayData[9]); // Interés
        setCapitalParm(todayData[8]);
        setInteresParm(todayData[9]);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleCpitalInteres = async () => {
    try {
      if (!capitalInteresEntities.length) {
        alert("No hay datos de capital e interés para enviar.");
        return;
      }

      if (cooperativa.listaCapitalInteres.length > 0) {
        const confirmOverwrite = window.confirm(
          "Esta cooperativa ya tiene datos de interés y capital. Los datos anteriores se eliminarán y se reemplazarán con los nuevos. ¿Deseas continuar?"
        );
        if (!confirmOverwrite) {
          return;
        }
      }

      const response = await postCapitalInteres(
        capitalInteresEntities,
        cooperativa.idCooperativa
      );

      alert("Datos de capital e interés actualizados con éxito.");

    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert(
        "Hubo un error al intentar actualizar los datos. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        <h2>Datos del archivo:</h2>
        {capital !== null && interes !== null ? (
          <div>
            <button
              className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
              onClick={handleCpitalInteres}
            >
              Agregar Capital-Interés
            </button>
            <p>
              <strong>Capital del mes actual:</strong> {capital}
            </p>
            <p>
              <strong>Interés del mes actual:</strong> {interes}
            </p>
          </div>
        ) : (
          <p>No se encontró capital e interés para el mes y año actuales.</p>
        )}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ExcelReader;
