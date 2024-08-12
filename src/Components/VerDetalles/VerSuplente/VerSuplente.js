"use client";

import React from "react";

const VerSuplente = ({ suplente, socio, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/3 p-4">
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
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Cedula del Suplente
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Nombre
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Apellido
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Telefono
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Pertenece al Socio
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-100">
              <tr>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">
                    {suplente.cedulaSuplente}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {suplente.nombreSuplente}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {suplente.apellidoSuplente}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  {suplente.telefonoSuplente}
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    {socio
                      ? `${socio.nombreSocio} ${socio.apellidoSocio}`
                      : "No disponible"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VerSuplente;
