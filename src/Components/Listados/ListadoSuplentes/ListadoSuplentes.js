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

const ListadoSuplentes = ({ setSuplente, setIdentificadorComponente }) => {
  const [allSuplentes, setAllSuplentes] = useState([]);
  const [allSocios, setAllSocios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [suplenteSeleccionado, setSuplenteSeleccionado] = useState(null); // Estado para el s
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDatosDeLaLista();
  }, []);

  const fetchDatosDeLaLista = async () => {
    try {
      const suplentesResponse = await getAllSuplentes();
      setAllSuplentes(suplentesResponse);
      console.log("Suplentes recibidos:", suplentesResponse);

      const sociosResponse = await getAllSocios(cooperativa.idCooperativa);
      const sociosConSuplentes = sociosResponse.filter(
        (socio) => socio.suplenteEntity !== null
      );
      setAllSocios(sociosConSuplentes);

      console.log("Socios recibidos:", sociosResponse);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleModificar = (suplente) => {
    setSuplente(suplente);
    setIdentificadorComponente(10);
  };

  const handleVerSuplente = (suplente, socio) => {
    console.log("Suplente seleccionado:", suplente);
    console.log("Socio seleccionado:", socio);
    setSuplenteSeleccionado(suplente);
    setSocioSeleccionado(socio);
    setIsModalOpen(true);
  };

  const handleEliminar = async (cedulaSuplente) => {
    try {
      const data = await deleteSuplente(cedulaSuplente);
      console.log("Suplente eliminado:", data);
      fetchDatosDeLaLista();
    } catch (e) {
      console.error("Fallo al eliminar el suplente:", e);
    }
  };

  const getSocioPorSuplente = (cedulaSuplente) => {
    console.log("Suplentes recibidos:", allSuplentes);
    const socio = allSocios.find(
      (socio) => socio.suplenteEntity.cedulaSuplente === cedulaSuplente
    );
    console.log("socio del suplente", socio);
    return socio;
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex w-full items-center mb-7">
        <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
          Filter by
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
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Cedula Suplente
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Nombre Suplente
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Apellidos Suplente
            </th>
           
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Socio
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {allSuplentes.map((suplente) => {
            const socio = getSocioPorSuplente(suplente.cedulaSuplente);
            return (
              <tr key={suplente.cedulaSuplente}>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">
                    {suplente.cedulaSuplente}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">
                    {suplente.nombreSuplente}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    {suplente.apellidoSuplente}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    {socio?.nombreSocio} {socio?.apellidoSocio}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <Menu
                    as="div"
                    className="relative inline-block text-left justify-end"
                  >
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
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => handleVerSuplente(suplente, socio)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Ver Detalle
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() =>
                              handleEliminar(suplente.cedulaSuplente)
                            }
                            className="block px-4 py-2 text-sm text-gray-700  data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Eliminar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() => handleModificar(suplente)}
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
            );
          })}
        </tbody>
      </table>
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
