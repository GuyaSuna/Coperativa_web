"use client";

import React from "react";

const VerSuplente = ({ suplente, socio, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
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
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-white-900 mb-4">
              Datos del Suplente
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Cédula:</span>
                <span className="text-white-600">
                  {suplente.cedulaSuplente}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Nombre:</span>
                <span className="text-white-600">
                  {suplente.nombreSuplente}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Apellido:</span>
                <span className="text-white-600">
                  {suplente.apellidoSuplente}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Teléfono:</span>
                <span className="text-white-600">
                  {suplente.telefonoSuplente}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Socio:</span>
                <span className="text-white-600">
                  {socio
                    ? `${socio.nombreSocio} ${socio.apellidoSocio}`
                    : "No disponible"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
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

export default VerSuplente;
