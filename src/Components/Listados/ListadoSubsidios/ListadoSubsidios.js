"use client";

import React, { useState, useEffect, useContext } from "react";
import { deleteSubsidio, getAllSubsidios } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerSubsidio from "@/Components/VerDetalles/VerSubsidio/VerSubsidio.js";

const ListadoSubsidios = ({ setSubsidio, setIdentificadorComponente }) => {
  const [allSubsidios, setAllSubsidios] = useState([]);
  const [subsidioSeleccionado, setSubsidioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // agregar boton para archivar subsidio o cancelar subsidio
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
                <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600 dark:text-gray-100">
              {allSubsidios?.map((subsidio) => (
                <tr key={subsidio.idSubsidio}>
                  <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    {subsidio.socio?.nombreSocio}{" "}
                    {subsidio.socio?.apellidoSocio}
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
                              onClick={() => handleVerSubsidio(subsidio)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Ver Detalle
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleEliminarSubsidio(subsidio.idSubsidio)
                              }
                              className="block px-4 py-2 text-sm text-gray-700  data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleModificarSubsidio(subsidio)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Modificar
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
