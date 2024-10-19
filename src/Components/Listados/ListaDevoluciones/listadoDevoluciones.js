"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAlldevoluciones } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider.js";

const ListadoDevoluciones = () => {
  const { cooperativa } = useContext(MiembroContext);
  const [devoluciones, setDevoluciones] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(devoluciones);

  useEffect(() => {
    fetchAllDevoluciones();
  }, []);

  const fetchAllDevoluciones = async () => {
    try {
      const response = await getAlldevoluciones(cooperativa.idCooperativa);
      setDevoluciones(response);
    } catch (error) {
      console.error("Error al obtener las devoluciones:", error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(devoluciones);
    } else {
      const filtrado = devoluciones.filter((devolucion) =>
        devolucion.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(filtrado);
    }
  }, [devoluciones, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            value={buscador}
            onChange={handleChangeBuscador}
            placeholder="Buscar por nombre de socio"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr>
              <th className="px-4 py-3">Fecha Inicio</th>
              <th className="px-4 py-3">Pago Devolución</th>
              <th className="px-4 py-3">Total Devolución</th>
              <th className="px-4 py-3">Nombre Socio</th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado.map((devolucion) => (
              <tr key={devolucion.idDevolucion} className="border-b dark:border-gray-700">
                <td className="px-4 py-3">{devolucion.fechaInicio}</td>
                <td className="px-4 py-3">{devolucion.pagoDevolucion}</td>
                <td className="px-4 py-3">{devolucion.totalDevolucionUr}</td>
                <td className="px-4 py-3">
                  {devolucion.socio?.nombreSocio || "Sin socio"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoDevoluciones;
