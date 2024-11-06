import React, { useContext, useState, useEffect } from "react";
import { MiembroContext } from "@/Provider/provider";
import { getViviendaPorSocio } from "@/Api/api";

const DatosVivienda = () => {
  const { miembro } = useContext(MiembroContext);
  const [datoVivienda, setDatoVivienda] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");

  useEffect(() => {
    setCedulaSocio(miembro.responseBody.socio.cedulaSocio);
  }, [miembro]);

  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const data = await getViviendaPorSocio(cedulaSocio);
        setDatoVivienda(data);
      } catch (error) {
        console.error(`An error has occurred in fetchVivienda: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchVivienda();
    }
  }, [cedulaSocio]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-lg shadow-md flex-1 h-full">
      <h2 className="text-2xl font-semibold mb-4">Datos de la Vivienda</h2>
      <div className="space-y-4">
        <p>
          <strong>Nro Vivienda:</strong> {datoVivienda.nroVivienda || 'No disponible'}
        </p>
        <hr className="border-gray-300 dark:border-gray-600" />
        <p>
          <strong>Cantidad Dormitorios:</strong> {datoVivienda.cantidadDormitorios || 'No disponible'}
        </p>
        <hr className="border-gray-300 dark:border-gray-600" />
        <p>
          <strong>Valor de la Vivienda:</strong> {datoVivienda.valorVivienda || 'No disponible'}
        </p>
        <hr className="border-gray-300 dark:border-gray-600" />
      </div>
    </div>
  );
};

export default DatosVivienda;
