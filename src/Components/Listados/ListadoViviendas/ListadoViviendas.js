"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllViviendas, deleteVivienda } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerVivienda from "@/Components/VerDetalles/VerVivienda/VerVivienda.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoViviendas = ({
  setVivienda,
  setNroVivienda,
  setIdentificadorComponente,
}) => {
  const { cooperativa } = useContext(MiembroContext);
  const [viviendas, setAllViviendas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viviendaSeleccionada, setViviendaSeleccionada] = useState(null);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(viviendas);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };
  useEffect(() => {
    fetchAllViviendas();
  }, []);

  const fetchAllViviendas = async () => {
    try {
      const response = await getAllViviendas(cooperativa.idCooperativa);
      setAllViviendas(response);
      console.log(response, "Viviendas");
    } catch (error) {
      console.error("Error al obtener las viviendas:", error);
    }
  };

  const handleModificar = (nroVivienda) => {
    setNroVivienda(nroVivienda);
    setIdentificadorComponente(5);
  };
  const handleVerDetalles = (vivienda) => {
    setVivienda(vivienda);
    setViviendaSeleccionada(vivienda);
    setIsModalOpen(true);
  };

  const handleEliminar = async (nroVivienda) => {
    try {
      const data = await deleteVivienda(nroVivienda);
      console.log(data);
      fetchAllViviendas();
    } catch (e) {
      throw ("Fallo al eliminar la vivienda ", e.error);
    }
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(viviendas);
    } else {
      const buscadorFiltrado = viviendas.filter((vivienda) =>
        vivienda.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [viviendas, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
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

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarSocios = [...viviendas].sort(option.comparator);
      setAllViviendas(ordenarSocios);
    }
  };
  const handleAgregarVivienda = () => {
    setIdentificadorComponente(2);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarVivienda}
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
            AGREGAR VIVIENDA
          </button>

          <OrdenarPor
            options={ordenarOptions}
            buttonText="Ordenar por"
            onOptionSelect={handleSortChange}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr className="hidden sm:table-row">
              <th scope="col" className="px-4 py-3 text-center">
                Nro Vivienda
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre Socio
              </th>
              <th scope="col" className="px-4 py-3">
                Cantidad Dormitorios
              </th>
              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado?.map((vivienda) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={vivienda.nroVivienda}
              >
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Nro Vivienda:</span>
                  {vivienda.nroVivienda}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Nombre Socio:</span>
                  {vivienda?.socio?.nombreSocio &&
                  vivienda?.socio?.apellidoSocio
                    ? `${vivienda.socio.nombreSocio} ${vivienda.socio.apellidoSocio}`
                    : "Sin socio"}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  <span className="sm:hidden font-semibold">
                    Cantidad Dormitorios:
                  </span>
                  {vivienda.cantidadDormitorios}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleVerDetalles(vivienda)}
                    className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center justify-end  md:table-cell">
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
                              onClick={() =>
                                handleEliminar(vivienda.nroVivienda)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleModificar(vivienda.nroVivienda)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Modificar
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </td>
                <td className="px-4 py-3 flex justify-end gap-2 md:hidden">
                  <button
                    onClick={() => handleEliminar(vivienda.nroVivienda)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleModificar(vivienda.nroVivienda)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <VerVivienda
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vivienda={viviendaSeleccionada}
        />
      )}
    </div>
  );
};

export default ListadoViviendas;
