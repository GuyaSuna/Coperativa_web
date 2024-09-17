"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllEstadosContables, deleteEstadoContable } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import VerEstadoContable from "@/Components/VerDetalles/VerEstadoContablePDF/VerEstadoContablePDF";

const ListadoEstadoContables = ({}) => {
  const [allEstadosContables, setAllEstadosContables] = useState([]);
  const [estadoContableSeleccionado, setEstadoContableSeleccionado] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchAllEstadosContables();
  }, []);

  const fetchAllEstadosContables = async () => {
    try {
      const response = await getAllEstadosContables(cooperativa.idCooperativa);
      setAllEstadosContables(response);
    } catch (error) {
      console.error("Error al obtener los Estados Contables:", error);
    }
  };

  const handleVerEstadoContable = (estadoContable) => {
    setEstadoContableSeleccionado(estadoContable);
    setIsModalOpen(true);
  };

  return (
    <div className="sm:p-7 p-4">
      {allEstadosContables.length === 0 ? (
        <div className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center ml-4">
            Todavía no existen Estados Contables.
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
                        Fecha del Estado Contable
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Fecha Estado Contable
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Saldo Final en Pesos Uruguayos
                </th>
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Saldo Final en Dólares USD
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600 dark:text-gray-100">
              {allEstadosContables?.map((estadoContable) => (
                <tr key={estadoContable.id}>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {new Date(estadoContable.fecha).toLocaleDateString()}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {estadoContable.saldoFinalEnPesos}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {estadoContable.saldoFinalEnDolares}
                  </td>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    <Menu as="div" className="relative inline-block text-left">
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
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleVerEstadoContable(estadoContable)
                              }
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
              ))}
            </tbody>
          </table>
          {isModalOpen && (
            <VerEstadoContable
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              estadoContable={estadoContableSeleccionado}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListadoEstadoContables;
