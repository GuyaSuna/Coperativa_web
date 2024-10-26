"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getAllEgresos, deleteEgreso } from "../../../Api/api";
import { MiembroContext } from "@/Provider/provider.js";
import VerEgreso from "@/Components/VerDetalles/VerEgreso/VerEgreso";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoEgresos = ({ setEgreso, setIdentificadorComponente }) => {
  const [allEgresos, setAllEgresos] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [egresoSeleccionado, setEgresoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allEgresos);
  useEffect(() => {
    fetchDatosDeLaLista();
  }, []);

  const fetchDatosDeLaLista = async () => {
    try {
      const egresosResponse = await getAllEgresos(cooperativa.idCooperativa);
      setAllEgresos(egresosResponse);
      console.log("Egresos recibidos:", egresosResponse);
    } catch (error) {
      console.error("Error al obtener los egresos:", error);
    }
  };

  const handleVerEgreso = (egreso) => {
    setEgresoSeleccionado(egreso);
    setIsModalOpen(true);
  };

  const handleEliminar = async (idEgreso) => {
    try {
      const data = await deleteEgreso(idEgreso);
      fetchDatosDeLaLista();
    } catch (e) {
      console.error("Fallo al eliminar el egreso:", e);
    }
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allEgresos);
    } else {
      const buscadorFiltrado = allEgresos.filter((egreso) =>
        egreso.subRubro.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allEgresos, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  const ordenarOptions = [
    {
      label: "Sub Rubro",
      key: "subRubro",
      icon: <SortIcon />,
      comparator: (a, b) => a.subRubro - b.subRubro,
    },
  ];

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarEgresos = [...allEgresos].sort(option.comparator);
      setAllEgresos(ordenarEgresos);
    }
  };
  const handleAgregarEgreso = () => {
    setIdentificadorComponente(21);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarEgreso}
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
            AGREGAR Egreso
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
                Sub Rubro
              </th>
              <th scope="col" className="px-4 py-3">
                Denominación
              </th>
              <th scope="col" className="px-4 py-3">
                Monto Egreso
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {allEgresos.map((egreso) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={egreso.id}
              >
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Sub Rubro: </span>
                  {egreso.subRubro}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">
                    Denominacion:{" "}
                  </span>
                  {egreso.denominacion}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">
                    Monto Egreso:{" "}
                  </span>
                  {egreso.egreso}
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
                              onClick={() => handleVerEgreso(egreso)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Ver Detalle
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleEliminar(egreso.id)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleModificar(egreso)}
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
                    onClick={() => handleVerEgreso(egreso)}
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
        <VerEgreso
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          egreso={egresoSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoEgresos;
