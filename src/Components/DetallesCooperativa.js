"use client";

import React, { useContext, useEffect, useState } from "react";
import { getCooperativaPorAdmin } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider.js";

const DetallesCooperativa = () => {
  const { miembro ,cooperativa } = useContext(MiembroContext);
  const [dataCooperativa , setDataCooperativa] = useState(null);
  const tesorero = cooperativa.tesorero
    ? `${cooperativa.tesorero.firstname} ${cooperativa.tesorero.lastname}`
    : "No especificado";
   
    const fetchCooperativa = async () => {
      try {
        const response = await getCooperativaPorAdmin(miembro.responseBody.id);
        setDataCooperativa(response);
      } catch (error) {
        console.error("Error al obtener los datos de la cooperativa:", error);
      }
    };

    useEffect(() => {
      if (miembro) {
        fetchCooperativa();
      }
    }, [miembro]);

  const descargarDocumento = () => {
    window.location.href = "/capital_interes.xls";
  };

  return (
    <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <div className="bg-blue-700 p-10 text-white">
        <h2 className="text-5xl font-bold">{dataCooperativa?.nombre}</h2>
        <p className="text-2xl">Estado: {dataCooperativa?.estadoCooperativa}</p>
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        <div className="p-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Información General
          </h3>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Dirección:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.direccion}, {dataCooperativa?.localidad},{" "}
              {dataCooperativa?.departamento}
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Teléfono:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.telefono}
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Viviendas Totales:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.cantidadViviendas}
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Cupos Libres:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.cuposLibre}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Autoridades
          </h3>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Presidente:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.nombrePresidente}
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Vicepresidente:
            </span>
            <span className="text-xl text-gray-700">
              {dataCooperativa?.nombreVicePresidente}
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-2xl text-gray-800">
              Tesorero:
            </span>
            <span className="text-xl text-gray-700">{tesorero}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-24">
        <button
          onClick={descargarDocumento}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Descargar Documento de Capital/Interés
        </button>
      </div>
    </div>
  );
};

export default DetallesCooperativa;
