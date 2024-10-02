"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import { getAllInteresAnual } from "@/Api/api";

const ListadoInteresAnual = ({ setIdentificadorComponente }) => {
  const [listaInteresAnual, setListaInteresAnual] = useState([]);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchInteresAnual();
  }, []);

  const fetchInteresAnual = async () => {
    try {
      const interesAnualResponse = await getAllInteresAnual(cooperativa.idCooperativa);
      setListaInteresAnual(interesAnualResponse);
      console.log("Interés anual recibido:", interesAnualResponse);
    } catch (error) {
      console.error("Error al obtener el interés anual:", error);
    }
  };

  // Función para sumar los intereses anuales de los socios para cada año
  const calcularInteresTotal = (listaInteresAnual) => {
    return listaInteresAnual.reduce((total, interesSocio) => {
      return total + (interesSocio.interes || 0); // Asegurarse de que porcentaje esté presente
    }, 0);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex w-full items-center mb-7">
        <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
          Interés Anual por Cooperativa
          <svg
            viewBox="0 0 24 24"
            className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Año</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Cooperativa</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Interés Anual </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {listaInteresAnual.map((interesAnual, index) => {
            const totalInteresAnual = calcularInteresTotal(interesAnual.listaInteresAnual);
            return (
              <tr key={index}>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">{interesAnual.anio}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">{cooperativa.nombre}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">{totalInteresAnual.toFixed(2)}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <Menu as="div" className="relative inline-block text-left justify-end">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => console.log("Ver detalle:", interesAnual)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Ver Detalle
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoInteresAnual;
