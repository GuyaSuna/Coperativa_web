"use client";
import React, { useState, useContext, useEffect } from "react";
import VerEstadoContable from "@/Components/VerDetalles/VerEstadoContablePDF/VerEstadoContablePDF";
import { getUltimoEstadoContable } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";

const InformesUsuario = ({}) => {
  const [estadoContable, setEstadoContable] = useState({});
  const [estadoContableSeleccionado, setEstadoContableSeleccionado] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  useEffect(() => {
    fetchUltimoEstadoContable();
  }, []);

  const handleVerEstadoContable = (estadoContable) => {
    setEstadoContableSeleccionado(estadoContable);
    setIsModalOpen(true);
  };

  const fetchUltimoEstadoContable = async () => {
    try {
      const response = await getUltimoEstadoContable();
      setEstadoContable(response);
    } catch (error) {
      console.error("Error al obtener los Estados Contables:", error);
    }
  };
  console.log("Ultimo estado contable", estadoContable);
  return (
    <div className="w-full 2xl:w-3/4 flex items-start justify-center px-8 md:px-32 lg:px-16 2xl:px-0 mx-auto mt-28">
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="dark:bg-white bg-slate-500 text-white dark:text-black shadow-4xl rounded-lg py-4 ">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Estado Contable</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => handleVerEstadoContable(estadoContable)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
            >
              Descargar Informe
            </button>

            {isModalOpen && (
              <VerEstadoContable
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                estadoContable={estadoContableSeleccionado}
              />
            )}
          </div>
        </div>
        <div className="dark:bg-white bg-slate-500 shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Balance Anual</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
              title="Purchase"
            >
              Descargar Informe
            </a>
          </div>
        </div>
        <div className="dark:bg-white bg-slate-500 shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Reajuste anual de cuota mensual</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
              title="Purchase"
            >
              Descargar Informe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformesUsuario;
