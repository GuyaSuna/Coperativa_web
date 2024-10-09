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
  const [archivedSubsidios, setArchivedSubsidios] = useState([]);
  const [subsidioSeleccionado, setSubsidioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allSubsidios);
  const [showArchived, setShowArchived] = useState(false); // Estado para mostrar subsidios archivados
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchAllSubsidios();
  }, []);

  const fetchAllSubsidios = async () => {
    try {
      const response = await getAllSubsidios(cooperativa.idCooperativa);
      const activeSubsidios = response.filter(
        (subsidio) => subsidio.socio && subsidio.socio.archivado === false
      );
      const archivedSubsidios = response.filter(
        (subsidio) => subsidio.socio && subsidio.socio.archivado === true
      );
      setAllSubsidios(activeSubsidios);
      setArchivedSubsidios(archivedSubsidios);
      setBuscadorFiltrado(activeSubsidios); // Inicializa el buscador con subsidios activos
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
      await deleteSubsidio(idSubsidio);
      fetchAllSubsidios();
    } catch (e) {
      console.error("Fallo al eliminar el subsidio", e.error);
    }
  };

  const handleModificarSubsidio = (subsidio) => {
    setSubsidio(subsidio);
    setIdentificadorComponente(19);
    console.log("Modificar subsidio", subsidio);
  };

  const handleArchivar = (subsidio) => {
    console.log("Archivar subsidio", subsidio);
    // Implementar la lógica de archivo aquí
  };

  const handleDevolucionCapital = (subsidio) => {
    console.log("Asignar devolución de capital", subsidio);
    // Implementar la lógica de devolución de capital aquí
  };

  const handlePagoDevolucion = (subsidio) => {
    console.log("Pagar devolución", subsidio);
    // Implementar la lógica de pago de devolución aquí
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
    const ordenarSubsidios = [...(showArchived ? archivedSubsidios : allSubsidios)].sort(option.comparator);
    setBuscadorFiltrado(ordenarSubsidios);
  };

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  useEffect(() => {
    const subsidiosAFiltrar = showArchived ? archivedSubsidios : allSubsidios;
    if (buscador === "") {
      setBuscadorFiltrado(subsidiosAFiltrar);
    } else {
      const buscadorFiltrado = subsidiosAFiltrar.filter((subsidio) =>
        subsidio.socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allSubsidios, archivedSubsidios, buscador, showArchived]);

  const handleAgregarSubsidio = () => {
    setIdentificadorComponente(16);
  };

  const toggleShowArchived = () => {
    setShowArchived(!showArchived);
    setBuscador(""); // Resetear el buscador al cambiar entre estados
  };

  return (
    <div className="sm:p-7 p-4">
      {allSubsidios.length === 0 && archivedSubsidios.length === 0 ? (
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
              {/* Botón para mostrar subsidios archivados */}
              <button
                onClick={toggleShowArchived}
                className="flex items-center justify-center text-white bg-green-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                {showArchived ? "Mostrar Activos" : "Mostrar Archivados"}
              </button>

              <OrdenarPor
                options={ordenarOptions}
                buttonText="Ordenar por"
                onOptionSelect={handleSortChange}
              />
            </div>
          </div>

          {/* Tabla responsive */}
          <div className="overflow-x-auto h-screen">
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
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {buscadorFiltrado.length === 0 ? (
                  <tr className="border-b dark:border-gray-700 md:border-b-0 md:dark:border-gray-600">
                    <td colSpan="6" className="text-center py-4">
                      No hay subsidios que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  buscadorFiltrado.map((subsidio) => (
                    <tr
                      key={subsidio.idSubsidio}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-3 text-center">
                        {subsidio.socio.nombreSocio}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {subsidio.cuotaTotalUr}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {subsidio.subsidioUr}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {subsidio.porcentaje}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {subsidio.vigenciaEnMeses}
                      </td>
                      <td className="px-4 py-3 text-center flex justify-center">
                        {/* Menu con opciones para cada subsidio */}
                        <Menu as="div" className="relative inline-block text-left">
                          <MenuButton className="bg-gray-300 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center">
                            ⋮
                          </MenuButton>
                          <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {subsidio.socio.archivado ? (
                              <>
                                <MenuItem>
                                  <button
                                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                    onClick={() => handleDevolucionCapital(subsidio)}
                                  >
                                    Asignar devolución de capital
                                  </button>
                                </MenuItem>
                                <MenuItem>
                                  <button
                                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                    onClick={() => handlePagoDevolucion(subsidio)}
                                  >
                                    Pagar devolución
                                  </button>
                                </MenuItem>
                              </>
                            ) : (
                              <>
                                {subsidio.socio.cedulaSocio !== miembro.responseBody.socio.cedulaSocio && (
                                  <MenuItem>
                                    <button
                                      className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                      onClick={() => handleArchivar(subsidio)}
                                    >
                                      Archivar
                                    </button>
                                  </MenuItem>
                                )}
                                <MenuItem>
                                  <button
                                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                    onClick={() => handleModificarSubsidio(subsidio)}
                                  >
                                    Modificar
                                  </button>
                                </MenuItem>
                                <MenuItem>
                                  <button
                                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                                    onClick={() => handleCrearRecibo(subsidio)}
                                  >
                                    Crear Recibo
                                  </button>
                                </MenuItem>
                              </>
                            )}
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {isModalOpen && (
        <VerSubsidio
          subsidio={subsidioSeleccionado}
          setIsOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ListadoSubsidios;
