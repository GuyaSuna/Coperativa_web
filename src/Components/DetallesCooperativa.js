"use client";

import React, { useContext } from "react";
import { MiembroContext } from "@/Provider/provider.js";

const DetallesCooperativa = () => {
  const { cooperativa } = useContext(MiembroContext);
  const tesorero = cooperativa.tesorero
    ? `${cooperativa.tesorero.firstname} ${cooperativa.tesorero.lastname}`
    : "No especificado";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
        {/* Encabezado */}
        <div className="bg-blue-700 p-10 text-white">
          <h2 className="text-5xl font-bold">{cooperativa.nombre}</h2>
          <p className="text-2xl">Estado: {cooperativa.estadoCooperativa}</p>
        </div>

        {/* Contenido */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          <div className="p-6">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Información General</h3>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Dirección:</span>
              <span className="text-xl text-gray-700">
                {cooperativa.direccion}, {cooperativa.localidad}, {cooperativa.departamento}
              </span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Teléfono:</span>
              <span className="text-xl text-gray-700">{cooperativa.telefono}</span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Viviendas Totales:</span>
              <span className="text-xl text-gray-700">{cooperativa.cantidadViviendas}</span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Cupos Libres:</span>
              <span className="text-xl text-gray-700">{cooperativa.cuposLibre}</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Autoridades</h3>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Presidente:</span>
              <span className="text-xl text-gray-700">{cooperativa.nombrePresidente}</span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Vicepresidente:</span>
              <span className="text-xl text-gray-700">{cooperativa.nombreVicePresidente}</span>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="font-semibold text-2xl text-gray-800">Tesorero:</span>
              <span className="text-xl text-gray-700">{tesorero}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesCooperativa;
