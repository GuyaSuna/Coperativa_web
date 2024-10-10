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
    loginMiembro(null, cooperativa);
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

  const handleListadoViviendas = (cooperativa) => {
    loginMiembro(null, cooperativa);
    setIdentificadorComponente(1);
  };

  const handleCapitalInteres = (cooperativa) => {
    setCooperativa(cooperativa);
    setIdentificadorComponente(14);
  };

  const handleListaUsuarios = (cooperativa) => {
    loginMiembro(null, cooperativa);
    setIdentificadorComponente(12);
  };


  return (
    <div className="sm:p-7 p-4">
      
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
                    {cooperativa.tesorero?.socio?.nombreSocio || "Sin Tesorero"}{" "}
                    {cooperativa.tesorero?.socio?.apellidoSocio}
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
                          onClick={() => handleListaUsuarios(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Ver Usuarios
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => handleListadoViviendas(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Ver Viviendas
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


                      <MenuItem>
                        <button
                          onClick={() => handleCapitalInteres(cooperativa)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Agregar Capital-Interes
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
