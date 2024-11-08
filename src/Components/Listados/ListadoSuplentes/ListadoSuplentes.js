"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  getAllSuplentes,
  deleteSuplente,
  getAllSocios,
} from "../../../Api/api";
import { MiembroContext } from "@/Provider/provider.js";
import VerSuplente from "../../VerDetalles/VerSuplente/VerSuplente";
import Buscador from "@/Components/Buscador";
import OrdenarPor from "@/Components/OrdenarPor";
import SortIcon from "@mui/icons-material/Sort";

const ListadoSuplentes = ({ setSuplente, setIdentificadorComponente }) => {
  const [allSuplentes, setAllSuplentes] = useState([]);
  const [allSocios, setAllSocios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [suplenteSeleccionado, setSuplenteSeleccionado] = useState(null); // Estado para el s
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allSuplentes);

  useEffect(() => {
    fetchDatosDeLaLista();
  }, []);

  const fetchDatosDeLaLista = async () => {
    try {
      const suplentesResponse = await getAllSuplentes();

      const sociosResponse = await getAllSocios(cooperativa.idCooperativa);

      // Filtrar socios archivados que tengan suplentes
      const suplentesArchivados = sociosResponse
        .filter(
          (socio) => socio.archivado === false && socio.suplenteEntity !== null
        )
        .map((socio) => socio.suplenteEntity);

      setAllSocios(sociosResponse);
      setAllSuplentes(suplentesArchivados);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleModificar = (suplente) => {
    setSuplente(suplente);
    setIdentificadorComponente(10);
  };

  const handleVerSuplente = (suplente, socio) => {
    setSuplenteSeleccionado(suplente);
    setSocioSeleccionado(socio);
    setIsModalOpen(true);
  };

  const handleEliminar = async (cedulaSuplente) => {
    try {
      const data = await deleteSuplente(cedulaSuplente);

      fetchDatosDeLaLista();
    } catch (e) {
      console.error("Fallo al eliminar el suplente:", e);
    }
  };

  const getSocioPorSuplente = (cedulaSuplente) => {
    const socio = allSocios.find(
      (socio) => socio.suplenteEntity?.cedulaSuplente === cedulaSuplente
    );

    return socio;
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allSuplentes);
    } else {
      const buscadorFiltrado = allSuplentes.filter((suplente) =>
        suplente.nombreSuplente.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allSuplentes, buscador]);
  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  const ordenarOptions = [
    {
      label: "Número Cedula",
      key: "cedulaSuplente",
      icon: <SortIcon />,
      comparator: (a, b) => a.cedulaSuplente - b.cedulaSuplente,
    },
    {
      label: "Nombre",
      key: "nombreSuplente",
      icon: <SortIcon />,
      comparator: (a, b) => a.nombreSuplente.localeCompare(b.nombreSuplente),
    },
  ];

  const handleSortChange = (option) => {
    const ordenarSuplentes = [...allSuplentes].sort(option.comparator);
    setAllSuplentes(ordenarSuplentes);
  };
  const handleAgregarSuplente = () => {
    setIdentificadorComponente(7);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarSuplente}
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
            AGREGAR SUPLENTE
          </button>

          <OrdenarPor
            options={ordenarOptions}
            buttonText="Ordenar por"
            onOptionSelect={handleSortChange}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 block md:table">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b hidden md:table-header-group">
            <tr className="hidden sm:table-row">
              <th scope="col" className="px-4 py-3">
                Cédula
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Socio
              </th>
              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group">
            {buscadorFiltrado.map((suplente) => {
              const socio = getSocioPorSuplente(suplente.cedulaSuplente);
              return (
                <tr
                  className="border-b dark:border-gray-700 block md:table-row"
                  key={suplente.cedulaSuplente}
                >
                  <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className="sm:hidden font-semibold">
                      Cédula:{"  "}{" "}
                    </span>
                    {suplente.cedulaSuplente}
                  </td>
                  <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className="sm:hidden font-semibold">
                      Nombre:{"  "}
                    </span>
                    {suplente.nombreSuplente} {suplente.apellidoSuplente}
                  </td>
                  <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className="sm:hidden font-semibold">
                      Socio:{"  "}
                    </span>
                    {socio?.nombreSocio} {socio?.apellidoSocio}
                  </td>
                  <td className="block sm:table-cell px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleVerSuplente(suplente, socio)}
                      className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center shadow-md hover:scale-[1.02] transition-transform"
                    >
                      Ver
                    </button>
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end md:table-cell">
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
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() =>
                                  handleEliminar(suplente.cedulaSuplente)
                                }
                                className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                              >
                                Eliminar
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => handleModificar(suplente)}
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
                      onClick={() => handleEliminar(suplente.cedulaSuplente)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleModificar(suplente)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerSuplente
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          suplente={suplenteSeleccionado}
          socio={socioSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoSuplentes;
