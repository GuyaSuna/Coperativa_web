"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getAllIngresos, deleteIngreso } from "../../../Api/api";
import { MiembroContext } from "@/Provider/provider.js";
import VerIngreso from "@/Components/VerDetalles/VerIngreso/VerIngreso";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoIngresos = ({ setIngreso, setIdentificadorComponente }) => {
  const [allIngresos, setAllIngresos] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allIngresos);
  useEffect(() => {
    fetchDatosDeLaLista();
  }, []);

  const fetchDatosDeLaLista = async () => {
    try {
      const ingresosResponse = await getAllIngresos(cooperativa.idCooperativa);
      setAllIngresos(ingresosResponse);
      console.log("Ingresos recibidos:", ingresosResponse);
    } catch (error) {
      console.error("Error al obtener los ingresos:", error);
    }
  };

  const handleModificar = (ingreso) => {
    setIngreso(ingreso);
    setIdentificadorComponente(20); // Ajusta el identificador del componente si es necesario
  };

  const handleVerIngreso = (ingreso) => {
    console.log("Ingreso seleccionado:", ingreso);
    setIngresoSeleccionado(ingreso);
    setIsModalOpen(true);
  };

  const handleEliminar = async (idIngreso) => {
    try {
      const data = await deleteIngreso(idIngreso);
      console.log("Ingreso eliminado:", data);
      fetchDatosDeLaLista();
    } catch (e) {
      console.error("Fallo al eliminar el ingreso:", e);
    }
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allIngresos);
    } else {
      const buscadorFiltrado = allIngresos.filter((ingreso) =>
        ingreso.subRubro.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allIngresos, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  const ordenarOptions = [
    {
      label: "Sub Rubro",
      key: "subRubro",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroVivienda - b.nroVivienda,
    },
  ];

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarIngresos = [...allIngresos].sort(option.comparator);
      setAllIngresos(ordenarIngresos);
    }
  };
  const handleAgregarIngreso = () => {
    setIdentificadorComponente(20);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarIngreso}
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
            AGREGAR Ingreso
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
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Sub Rubro
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Denominación
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                Monto Ingreso
              </th>
              <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
            </tr>
          </thead>
          <tbody>
            {allIngresos.map((ingreso) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={ingreso.id}
              >
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Sub Rubro:</span>
                  {ingreso.subRubro}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  <span className="sm:hidden font-semibold">Denominacion:</span>
                  {ingreso.denominacion}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  <span className="sm:hidden font-semibold">
                    Monto Ingreso:
                  </span>
                  {ingreso.ingreso}
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
                              onClick={() => handleVerIngreso(ingreso)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Ver Detalle
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleEliminar(ingreso.id)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleModificar(ingreso)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
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

                  <button
                    onClick={() => handleVerIngreso(ingreso)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <VerIngreso
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ingreso={ingresoSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoIngresos;
