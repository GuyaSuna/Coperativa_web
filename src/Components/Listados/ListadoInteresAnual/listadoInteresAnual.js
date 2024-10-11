"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import { getAllInteresAnual } from "@/Api/api";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";
import VerInteresAnual from "@/Components/VerDetalles/VerInteresAnual/verInteresAnual";

const ListadoInteresAnual = ({ setIdentificadorComponente }) => {
  const [listaInteresAnual, setListaInteresAnual] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(listaInteresAnual);
  const [selectedInteresAnual, setSelectedInteresAnual] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInteresAnual();
  }, []);

  const fetchInteresAnual = async () => {
    try {
      const interesAnualResponse = await getAllInteresAnual(
        cooperativa.idCooperativa
      );
      setListaInteresAnual(interesAnualResponse);
    } catch (error) {
      console.error("Error al obtener el interés anual:", error);
    }
  };

  const calcularInteresTotal = (listaInteresAnual) => {
    return listaInteresAnual.reduce((total, interesSocio) => {
      return total + (interesSocio.interes || 0);
    }, 0);
  };

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarSocios = [...listaInteresAnual].sort(option.comparator);
      setListaInteresAnual(ordenarSocios);
    }
  };

  const ordenarOptions = [
    {
      label: "Número vivienda",
      key: "nroSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroVivienda - b.nroVivienda,
    },
    {
      label: "Nombre Socio",
      key: "nombreSocio",
      icon: <SortIcon />,
      comparator: (a, b) => {
        const nombreA = a.socio?.nombreSocio || "";
        const nombreB = b.socio?.nombreSocio || "";
        return nombreA.localeCompare(nombreB);
      },
    },
    {
      label: "Cant. Dormitorios",
      key: "cantidadDormitorios",
      icon: <SortIcon />,
      comparator: (a, b) => a.cantidadDormitorios - b.cantidadDormitorios,
    },
  ];

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(listaInteresAnual);
    } else {
      const buscadorFiltrado = listaInteresAnual.filter((interesAnual) => {
        const añoInteres = new Date(interesAnual.fechaDatos).getFullYear();
        const añoBuscador = parseInt(buscador, 10);
        return añoInteres === añoBuscador;
      });

      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [listaInteresAnual, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const handleOpenModal = (interesAnual) => {
    setSelectedInteresAnual(interesAnual);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInteresAnual(null);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <OrdenarPor
            options={ordenarOptions}
            buttonText="Ordenar por"
            onOptionSelect={handleSortChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="hidden md:table-header-group">
            <tr className="text-gray-400">
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Año
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Cooperativa
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Interés Anual
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-100">
            {listaInteresAnual.map((interesAnual, index) => {
              const totalInteresAnual = calcularInteresTotal(
                interesAnual.listaInteresAnual
              );
              return (
                <tr
                  key={index}
                  className="md:table-row flex flex-col md:flex-row mb-4 md:mb-0 border-b md:border-none border-gray-200 dark:border-gray-800"
                >
                  <td className="md:table-cell flex md:flex-none sm:p-3 py-2 px-1">
                    <span className="block md:hidden font-bold">Año:</span>
                    <div className="ml-4 md:ml-0">{interesAnual.anio}</div>
                  </td>

                  <td className="md:table-cell flex md:flex-none sm:p-3 py-2 px-1">
                    <span className="block md:hidden font-bold">Cooperativa:</span>
                    <div className="ml-4 md:ml-0">{cooperativa.nombre}</div>
                  </td>

                  <td className="md:table-cell flex md:flex-none sm:p-3 py-2 px-1">
                    <span className="block md:hidden font-bold">Interés Anual:</span>
                    <div className="ml-4 md:ml-0">
                      {totalInteresAnual.toFixed(2)}
                    </div>
                  </td>

                  <td className="px-4 py-3 flex items-center justify-end md:table-cell">
                    <div className="relative inline-block text-left">
                      <Menu as="div" className="relative inline-block text-left">
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
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => handleOpenModal(interesAnual)}
                                className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
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
                      onClick={() => handleOpenModal(interesAnual)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal para ver el interés anual */}
      {isModalOpen && (
        <VerInteresAnual
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          interesAnual={selectedInteresAnual}
        />
      )}
    </div>
  );
};

export default ListadoInteresAnual;
