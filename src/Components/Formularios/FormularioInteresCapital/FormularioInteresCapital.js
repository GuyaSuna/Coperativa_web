import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [capital, setCapital] = useState(null);
  const [interes, setInteres] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 

      setData(jsonData);

      const today = new Date();
      const currentMonth = today.getMonth() + 1; 
      const currentYear = today.getFullYear();

      const todayData = jsonData.find(row => {

        const excelDate = new Date((row[0] - 25567) * 86400 * 1000);
        return excelDate.getMonth() + 1 === currentMonth && excelDate.getFullYear() === currentYear;
      });

      if (todayData) {
        setCapital(todayData[8]);  // Capital
        setInteres(todayData[9]);  // Interés
      } else {
        console.log("No se encontró una fila para el mes y año actuales.");
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        <h2>Datos del archivo:</h2> 
        {capital !== null && interes !== null ? (
          <div>
            <p><strong>Capital del mes actual:</strong> {capital}</p>
            <p><strong>Interés del mes actual:</strong> {interes}</p>
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
