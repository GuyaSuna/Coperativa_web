"use client";

import React from "react";

const VerSocio = ({ isOpen, onClose, socio }) => {
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
          <div className="p-6">
            <h3 className="text-2xl font-bold text-black-900 mb-4">
              Detalles del Socio
            </h3>
            <table className="w-full text-left">
              <tbody className="text-gray-600 dark:text-gray-100">
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Nombre:
                  </td>
                  <td className="py-2 px-3">
                    {socio.nombreSocio} {socio.apellidoSocio}
                  </td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Número de Socio:
                  </td>
                  <td className="py-2 px-3">{socio.nroSocio}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Capital:
                  </td>
                  <td className="py-2 px-3">${socio.capitalSocio}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Fecha de Ingreso:
                  </td>
                  <td className="py-2 px-3">{socio.fechaIngreso}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Teléfono:
                  </td>
                  <td className="py-2 px-3">{socio.telefono}</td>
                </tr>
                {socio.suplenteEntity && (
                  <>
                    <tr>
                      <td
                        colSpan="2"
                        className="font-semibold text-black-900 py-4"
                      >
                        Datos del Suplente
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Nombre:
                      </td>
                      <td className="py-2 px-3">
                        {socio.suplenteEntity.nombreSuplente}{" "}
                        {socio.suplenteEntity.apellidoSuplente}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Número de Cédula:
                      </td>
                      <td className="py-2 px-3">
                        {socio.suplenteEntity.cedulaSuplente}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Teléfono:
                      </td>
                      <td className="py-2 px-3">
                        {socio.suplenteEntity.telefonoSuplente}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
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
    </>
  );
};

export default VerSocio;
