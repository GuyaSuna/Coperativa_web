"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllSubsidios } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";

const ListadoSubsidios = ({ setIdentificadorComponente }) => {
  const [allSubsidios, setAllSubsidios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchAllSubsidios();
  }, []);

  const fetchAllSubsidios = async () => {
    try {
      const response = await getAllSubsidios(cooperativa.idCooperativa);
      setAllSubsidios(response);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener los subsidios:", error);
    }
  };

  return (
    <div className="sm:p-7 p-4">
      {allSubsidios.length === 0 ? (
        <div className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center ml-4">
            Todavía no existen subsidios
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-full items-center mb-7 relative">
            <Menu
              as="div"
              className="relative inline-block text-left justify-end"
            >
              <div>
                <MenuButton className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                  Ordenar por
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
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleOrderByFechaIngreso}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Fecha de Ingreso
                      </button>
                    )}
                  </MenuItem>
                  {/* Add more sorting options if needed */}
                </div>
              </MenuItems>
            </Menu>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Nombre Socio
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Cuota Total UR
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Subsidio UR
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Porcentaje
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Vigencia
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Fecha Otorgado
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Fecha Expira
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600 dark:text-gray-100">
              {allSubsidios?.map((subsidio) => (
                <tr key={subsidio.IdSubsidio}>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.socio.nombreSocio} {subsidio.socio.apellidoSocio}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.cuotaTotalUr}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.subsidioUr}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.porcentaje}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.vigenciaEnMeses} meses
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {new Date(subsidio.fechaOtorgado).toLocaleDateString()}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {new Date(subsidio.fechaExpira).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListadoSubsidios;
