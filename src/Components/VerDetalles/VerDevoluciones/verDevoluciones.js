"use client";

import React from "react";

const VerDevoluciones = ({ devolucion, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
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
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Datos de la Devolución
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Nro. de Devolución: </span>
                <span className="text-gray-300">{devolucion.idDevolucion}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="text-gray-300">{devolucion.totalDevolucionUr}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Socio Titular: </span>
                <span className="text-gray-300">
                  {devolucion?.socio?.nombreSocio && devolucion?.socio?.apellidoSocio
                    ? `${devolucion.socio.nombreSocio} ${devolucion.socio.apellidoSocio}`
                    : "Sin socio"}
                </span>
              </div>
              <div className="space-y-2">
                <span className="font-medium">Motivo de la Devolución: </span>
                <span className="text-gray-300">{devolucion.motivo || "No especificado"}</span>
              </div>
              <div className="space-y-2">
                <span className="font-medium">Fecha de Devolución: </span>
                <span className="text-gray-300">{devolucion.fechaInicio || "No disponible"}</span>
              </div>
              <div className="space-y-2">
                <span className="font-medium">Vigencia en Recibos: </span>
                <span className="text-gray-300">{devolucion.vigenciaEnRecibos || "No disponible"}</span>
              </div>
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
      </div>
    </>
  );
};

export default VerDevoluciones;
