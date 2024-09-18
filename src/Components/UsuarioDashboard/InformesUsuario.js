"use client";
import React from "react";

const InformesUsuario = () => {
  return (
    <div className="w-full 2xl:w-3/4 flex items-start justify-center px-8 md:px-32 lg:px-16 2xl:px-0 mx-auto mt-28">
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="dark:bg-white bg-blue-900 shadow-4xl rounded-lg py-4 ">
          <p className="text-xl text-center font-bold text-blue-600">Informe</p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-gray-700">
              <span x-text="basicPrice">Estado Contable</span>
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
        <div className="dark:bg-white bg-blue-900 shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-blue-600">Informe</p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-gray-700">
              <span x-text="basicPrice">Blance Anual</span>
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
        <div className="bg-white shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-blue-600">Informe</p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-gray-700">
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
