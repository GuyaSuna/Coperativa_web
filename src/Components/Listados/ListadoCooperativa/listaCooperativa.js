"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getAllCooperativas, deleteCooperativa } from "../../../Api/api";
import VerCooperativa from "@/Components/VerDetalles/VerCooperativa/VerCooperativa";
import { handler } from "flowbite/plugin";
import { MiembroContext } from "@/Provider/provider";

const ListadoCooperativa = ({ setCooperativa, setIdentificadorComponente }) => {
  const [allCooperativas, setAllCooperativas] = useState([]);
  const [cooperativaSeleccionada, setCooperativaSeleccionada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginMiembro } = useContext(MiembroContext);
  useEffect(() => {
    fetchDatosDeLaLista();
  }, []);

  const fetchDatosDeLaLista = async () => {
    try {
      const cooperativaResponse = await getAllCooperativas();
      setAllCooperativas(cooperativaResponse);
    } catch (error) {
      console.error("Error al obtener las cooperativas:", error);
    }
  };

  const handleModificar = (cooperativa) => {
    setCooperativa(cooperativa);
    setIdentificadorComponente(29);
  };

  const handleVerCooperativa = (cooperativa) => {
    console.log("Cooperativa seleccionado:", cooperativa);
    setCooperativaSeleccionada(cooperativa);
    setIsModalOpen(true);
  };

  const handleAdministrador = (cooperativa) => {
    setCooperativa(cooperativa);
    setIdentificadorComponente(30);
  };
  const handleReajuste = (cooperativa) => {
    setCooperativa(cooperativa);
    setIdentificadorComponente(31);
  };
  const handleVivienda = (cooperativa) => {
    setIdentificadorComponente(2);
    loginMiembro(null, cooperativa);
  };

  const handleSocio = (cooperativa) => {
    setIdentificadorComponente(3);
    loginMiembro(null, cooperativa);
  };

  const handleEliminar = async (idCooperativa) => {
    try {
      console.log(" IdCooperativa ", idCooperativa);
      const data = await deleteCooperativa(idCooperativa);
      console.log("Ingreso eliminado:", data);
      fetchDatosDeLaLista();
    } catch (e) {
      console.error("Fallo al eliminar el ingreso:", e);
    }
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
              id Cooperativa
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Nombre
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Tesorero
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {allCooperativas.map((cooperativa) => (
            <tr key={cooperativa.idCooperativa}>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">
                  {cooperativa.idCooperativa}
                </div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">
                  {cooperativa.nombre}
                </div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                {cooperativa.tesorero !== null && (
                  <div className="flex items-center">
                    {cooperativa.tesorero.socio.nombreSocio}{" "}
                    {cooperativa.tesorero.socio.apellidoSocio}
                  </div>
                )}
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
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <button
                          onClick={() => handleVerCooperativa(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Ver Detalle
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() =>
                            handleEliminar(cooperativa.idCooperativa)
                          }
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Eliminar
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleModificar(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Modificar
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleAdministrador(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Agregar Administrador
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleReajuste(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Agregar Reajuste
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleVivienda(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Agregar Vivienda
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleSocio(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Agregar Socio
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
        <VerCooperativa
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cooperativa={cooperativaSeleccionada}
        />
      )}
    </div>
  );
};

export default ListadoCooperativa;
