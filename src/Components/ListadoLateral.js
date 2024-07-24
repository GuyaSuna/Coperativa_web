"use client";
import React, { useState, useEffect } from "react";
import { getAllSocios } from "@/Api/api";
import Buscador from "./Buscador";

const ListadoLateral = ({idCooperativa}) => {
  const [socios, setSocios] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(socios);

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      const response = await getAllSocios(idCooperativa);
      setSocios(response);
      console.log("SOCIOS", response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(socios);
    } else {
      const buscadorFiltrado = socios.filter((socio) =>
        socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [socios, buscador]);
  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
      <div className="text-x dark:text-gray-400 text-black tracking-wider">
        SOCIOS
      </div>
      <Buscador value={buscador} onChange={handleChangeBuscador} />
      <div className="space-y-4 mt-3">
        {buscadorFiltrado.map((socio) => (
          <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 focus:outline-none">
            <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <a className="mr-2">{socio.nombreSocio}</a>
              <a>{socio.apellidoSocio}</a>
            </div>
            <div className="flex items-center w-full">
              <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">
                Capital
              </div>
              <div className="ml-auto text-xs text-gray-500">
                ${socio.capitalSocio}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListadoLateral;
