"use client";

import React from "react";

const VerRecibo = ({ recibo, isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  if (!recibo) {
    return <p>No se encontró el recibo.</p>;
  }
  const totalConvenios = recibo.listaConvenio.reduce((total, convenio) => total + (convenio.urPorMes || 0), 0);
  
  console.log(recibo)
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
          <button
            onClick={() => setIsOpen(false)}
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
              Datos del Recibo
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Número de Recibo:
                </span>
                <span className="text-white-600">{recibo.nroRecibo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Nombre Socio:
                </span>
                <span className="text-white-600">
                  {recibo.socio.nombreSocio}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Apellido Socio:
                </span>
                <span className="text-white-600">
                  {recibo.socio.apellidoSocio}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Número de CI.:
                </span>
                <span className="text-white-600">
                  {recibo.socio.cedulaSocio}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Fecha de Pago:
                </span>
                <span className="text-white-600">{recibo.fechaPago}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Fecha de Emision:
                </span>
                <span className="text-white-600">{recibo.fechaRecibo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Capital:</span>
                <span className="text-white-600">{recibo.capital}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Interés:</span>
                <span className="text-white-600">{recibo.interes}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Recargo:</span>
                <span className="text-white-600">{recibo.recargo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Convenio:</span>
                <span className="text-white-600">{totalConvenios}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">Subsidio:</span>
                <span className="text-white-600">
                  {recibo.subsidio?.subsidioUr ?? "Sin subsidio"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Cuota Social:
                </span>
                <span className="text-white-600">{recibo.cuotaSocial}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white-800">
                  Total Cuota del Mes:
                </span>
                <span className="text-white-600">{recibo.cuotaMensual}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerRecibo;
