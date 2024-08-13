"use client";

import React, { useContext } from "react";
import { MiembroContext } from "@/Provider/provider.js";

const VerVivienda = ({ vivienda, isOpen, onClose }) => {
  const { cooperativa } = useContext(MiembroContext);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="sm:p-7 p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400">
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Nro. de Vivienda
                  </th>
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Dormitorios
                  </th>
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Socio Titular
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-100">
                <tr>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {vivienda.nroVivienda}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {vivienda.cantidadDormitorios}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {vivienda?.socioTitular?.nombreSocio &&
                    vivienda?.socioTitular?.apellidoSocio
                      ? `${vivienda.socioTitular.nombreSocio} ${vivienda.socioTitular.apellidoSocio}`
                      : "Sin socio"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerVivienda;
