"use client";

import React, { useState, useEffect, useContext } from "react";
import { deleteSubsidio, getAllSubsidios } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerSubsidio from "@/Components/VerDetalles/VerSubsidio/VerSubsidio.js";
import Buscador from "@/Components/Buscador";
import OrdenarPor from "@/Components/OrdenarPor";
import SortIcon from "@mui/icons-material/Sort";

const ListadoSubsidios = ({ setSubsidio, setIdentificadorComponente }) => {
  const [allSubsidios, setAllSubsidios] = useState([]);
  const [subsidioSeleccionado, setSubsidioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allSubsidios);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchAllSubsidios();
  }, []);

  const fetchAllSubsidios = async () => {
    try {
      const response = await getAllSubsidios(cooperativa.idCooperativa);
      const subsidioDataFilter = response.filter(
        (subsidio) => subsidio.socio && subsidio.socio.archivado == false
      );
      setAllSubsidios(subsidioDataFilter);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener los subsidios:", error);
    }
  };

  const handleVerSubsidio = (subsidio) => {
    setSubsidioSeleccionado(subsidio);
    setIsModalOpen(true);
    console.log("Ver subsidio", subsidio);
  };

  const handleEliminarSubsidio = async (idSubsidio) => {
    try {
      const data = await deleteSubsidio(idSubsidio);
      fetchAllSubsidios();
    } catch (e) {
      throw ("Fallo al eliminar el subsidio", e.error);
    }
  };

  const handleModificarSubsidio = (subsidio) => {
    setSubsidio(subsidio);
    setIdentificadorComponente(19);
    console.log("Modificar subsidio", subsidio);
  };

  const ordenarOptions = [
    {
      label: "Vigencia",
      key: "vigenciaEnMeses",
      icon: <SortIcon />,
      comparator: (a, b) => a.vigenciaEnMeses - b.vigenciaEnMeses,
    },
    {
      label: "Más Recientes",
      key: "fechaOtorgado",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(b.fechaOtorgado) - new Date(a.fechaOtorgado),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(a.fechaOtorgado) - new Date(b.fechaOtorgado),
    },
  ];

  const handleSortChange = (option) => {
    console.log("Orden seleccionado:", option.label);
    const ordenarSubsidios = [...allSubsidios].sort(option.comparator);
    setAllSubsidios(ordenarSubsidios);
  };

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allSubsidios);
    } else {
      const buscadorFiltrado = allSubsidios.filter((subsidio) =>
        subsidio.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allSubsidios, buscador]);

  const handleAgregarSubsidio = () => {
    setIdentificadorComponente(16);
  };
  return (
    <div className="sm:p-7 p-4">
      {allSubsidios.length === 0 ? (
        <div className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center ml-4">
            Todavía no existen Subsidios
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <Buscador value={buscador} onChange={handleChangeBuscador} />
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={handleAgregarSubsidio}
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
                AGREGAR SUBSIDIO
              </button>

              <OrdenarPor
                options={ordenarOptions}
                buttonText="Ordenar por"
                onOptionSelect={handleSortChange}
              />
            </div>
          </div>

          {/* Tabla responsive */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-100 block md:table">
              <thead className="text-xs text-gray-400 uppercase hidden md:table-header-group">
                <tr className="hidden sm:table-row">
                  <th scope="col" className="px-4 py-3 text-center">
                    Nombre Socio
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Cuota Total UR
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Subsidio UR
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Porcentaje
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Vigencia
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Fecha Otorgado
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Fecha Expira
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="block md:table-row-group">
                {buscadorFiltrado?.map((subsidio) => (
                  <tr
                    key={subsidio.idSubsidio}
                    className="border-b border-gray-200 dark:border-gray-800 md:table-row"
                  >
                    <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Nombre Socio:
                      </span>
                      {subsidio.socio?.nombreSocio}{" "}
                      {subsidio.socio?.apellidoSocio}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Cuota Total UR:
                      </span>
                      {subsidio.cuotaTotalUr}
                    </td>
                    <td className="block sm:table-cell px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Subsidio UR:
                      </span>
                      {subsidio.subsidioUr}
                    </td>
                    <td className="block sm:table-cell px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Porcentaje:
                      </span>
                      {subsidio.porcentaje}
                    </td>
                    <td className="block sm:table-cell px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">Vigencia:</span>
                      {subsidio.vigenciaEnMeses} meses
                    </td>
                    <td className="block sm:table-cell px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Fecha Otorgado:
                      </span>
                      {new Date(subsidio.fechaOtorgado).toLocaleDateString()}
                    </td>
                    <td className="block sm:table-cell px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <span className="sm:hidden font-semibold">
                        Fecha Expira:
                      </span>
                      {new Date(subsidio.fechaExpira).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end md:table-cell">
                      <div className="relative inline-block text-left">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center">
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
                          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                <button
                                  onClick={() => handleVerSubsidio(subsidio)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Ver Detalle
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() =>
                                    handleEliminarSubsidio(subsidio.idSubsidio)
                                  }
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Eliminar
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() =>
                                    handleModificarSubsidio(subsidio)
                                  }
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                        onClick={() => handleVerSubsidio(subsidio)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Ver Detalle
                      </button>
                      <button
                        onClick={() =>
                          handleEliminarSubsidio(subsidio.idSubsidio)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleModificarSubsidio(subsidio)}
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
            <VerSubsidio
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              subsidio={subsidioSeleccionado}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListadoSubsidios;
