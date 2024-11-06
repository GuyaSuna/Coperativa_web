"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllUsuarios, deleteUsuario } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import Buscador from "@/Components/Buscador.js";
import VerUsuario from "@/Components/VerDetalles/VerUsuario/VerUsuario.js";

const ListadoUsuario = ({
  setUsuarioRecibo,
  setUsuario,
  setIdentificadorComponente,
}) => {
  const [allUsuarios, setAllUsuarios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllUsuarios();
  }, []);

  const fetchAllUsuarios = async () => {
    try {
      const response = await getAllUsuarios(cooperativa.idCooperativa);

      setAllUsuarios(response);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };
  const handleVerDetalles = (vivienda) => {
    setUsuario(vivienda);
    setUsuarioSeleccionado(vivienda);
    setIsModalOpen(true);
  };
  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarUsuarios = [...allUsuarios].sort(option.comparator);
      setAllUsuarios(ordenarUsuarios);
    }
  };

  const ordenarOptions = [
    {
      label: "Nombre Usuario",
      key: "firstname",
      icon: <SortIcon />,
      comparator: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      label: "Nombre Socio",
      key: "nombreSocio",
      icon: <SortIcon />,
      comparator: (a, b) =>
        a.socio.nombreSocio.localeCompare(b.socio.nombreSocio),
    },
  ];
  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allUsuarios);
    } else {
      const buscadorFiltrado = allUsuarios.filter((usuario) =>
        usuario.socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allUsuarios, buscador]);
  const handleAgregarUsuario = () => {
    setIdentificadorComponente(13);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarUsuario}
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
            AGREGAR USUARIO
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
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Apellido
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
          <tbody>
            {buscadorFiltrado?.map((usuario) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={usuario.id}
              >
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Nombre:{"  "}</span>
                  {usuario.firstname}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Apellido:{"  "}</span>
                  {usuario.lastname}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Socio:{"  "}</span>
                  {usuario?.socio?.nombreSocio && usuario?.socio?.apellidoSocio
                    ? `${usuario.socio.nombreSocio} ${usuario.socio.apellidoSocio}`
                    : "Sin socio"}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleVerDetalles(usuario)}
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
                              onClick={() => handleVerDetalles(usuario)}
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Ver Detalles
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </td>
                <td className="px-4 py-3 flex justify-end gap-2 md:hidden">
                  <button
                    onClick={() => handleVerDetalles(usuario)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <VerUsuario
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          usuario={usuarioSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoUsuario;
