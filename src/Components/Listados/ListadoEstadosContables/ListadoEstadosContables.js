"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllEstadosContables, deleteEstadoContable } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import VerEstadoContable from "@/Components/VerDetalles/VerEstadoContablePDF/VerEstadoContablePDF";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoEstadoContables = ({ setIdentificadorComponente }) => {
  const [allEstadosContables, setAllEstadosContables] = useState([]);
  const [estadoContableSeleccionado, setEstadoContableSeleccionado] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allEstadosContables);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchAllEstadosContables();
  }, []);

  const ajustarFecha = (fechaString) => {
    const date = new Date(fechaString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); 
    return date.toISOString().split('T')[0]; 
  };

  const fetchAllEstadosContables = async () => {
    try {
      const response = await getAllEstadosContables(cooperativa.idCooperativa);

      const estadosAjustados = response.map((estado) => {
        if (estado.fecha) {
          estado.fecha = ajustarFecha(estado.fecha);
        }
        return estado;
      });
  
      setAllEstadosContables(estadosAjustados);
    } catch (error) {
      console.error("Error al obtener los Estados Contables:", error);
    }
  };

  const handleVerEstadoContable = (estadoContable) => {
    setEstadoContableSeleccionado(estadoContable);
    setIsModalOpen(true);
  };

  const ordenarOptions = [
    {
      label: "Más Recientes",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(b.fecha) - new Date(a.fecha),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(a.fecha) - new Date(b.fecha),
    },
  ];

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarEstadosContables = [...allEstadosContables].sort(
        option.comparator
      );
      setAllEstadosContables(ordenarEstadosContables);
    }
  };
  const handleAgregarEstadoContable = () => {
    setIdentificadorComponente(33);
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
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2"></div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={handleAgregarEstadoContable}
                type="button"
                className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                AGREGAR ESTADO CONTABLE
              </button>

              <OrdenarPor
                options={ordenarOptions}
                buttonText="Ordenar por"
                onOptionSelect={handleSortChange}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-screen">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 hidden sm:table-row">
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Fecha Estado Contable
                  </th>
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Saldo Final en Pesos Uruguayos
                  </th>
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Saldo Final en Dólares USD
                  </th>
                  <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
                </tr>
              </thead>

              <tbody className="text-gray-600 dark:text-gray-100">
                {allEstadosContables?.map((estadoContable) => (
                  <tr
                    key={estadoContable.id}
                    className="border-b dark:border-gray-800 sm:table-row"
                  >
                    <td className="block sm:table-cell sm:p-3 py-2 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Fecha Estado Contable:
                      </span>
                      {new Date(estadoContable.fecha).toLocaleDateString()}
                    </td>
                    <td className="block sm:table-cell sm:p-3 py-2 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Saldo Final en Pesos Uruguayos:
                      </span>
                      {estadoContable.saldoFinalEnPesos}
                    </td>
                    <td className="block sm:table-cell sm:p-3 py-2 px-1">
                      <span className="sm:hidden font-semibold">
                        Saldo Final en Dólares USD:
                      </span>
                      {estadoContable.saldoFinalEnDolares}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end  md:table-cell">
                      <div className="relative inline-block text-left">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center hidden md:inline-flex">
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
                      </div>
                    </td>
                    <td className="px-4 py-3 flex justify-end gap-2 md:hidden">
                      <button
                        onClick={() => handleVerEstadoContable(estadoContable)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Ver Estado Contable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
