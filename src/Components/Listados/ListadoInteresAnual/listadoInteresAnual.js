"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import { getAllInteresAnual } from "@/Api/api";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoInteresAnual = ({ setIdentificadorComponente }) => {
  const [listaInteresAnual, setListaInteresAnual] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(listaInteresAnual);
  useEffect(() => {
    fetchInteresAnual();
  }, []);

  const fetchInteresAnual = async () => {
    try {
      const interesAnualResponse = await getAllInteresAnual(
        cooperativa.idCooperativa
      );
      setListaInteresAnual(interesAnualResponse);
      console.log("Interés anual recibido:", interesAnualResponse);
    } catch (error) {
      console.error("Error al obtener el interés anual:", error);
    }
  };

  // Función para sumar los intereses anuales de los socios para cada año
  const calcularInteresTotal = (listaInteresAnual) => {
    return listaInteresAnual.reduce((total, interesSocio) => {
      return total + (interesSocio.interes || 0); // Asegurarse de que porcentaje esté presente
    }, 0);
  };
  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarSocios = [...viviendas].sort(option.comparator);
      setAllViviendas(ordenarSocios);
    }
  };
  const ordenarOptions = [
    {
      label: "Número vivienda",
      key: "nroSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroVivienda - b.nroVivienda,
    },
    {
      label: "Nombre Socio",
      key: "nombreSocio",
      icon: <SortIcon />,
      comparator: (a, b) => {
        const nombreA = a.socio?.nombreSocio || "";
        const nombreB = b.socio?.nombreSocio || "";
        return nombreA.localeCompare(nombreB);
      },
    },

    {
      label: "Cant. Dormitorios",
      key: "cantidadDormitorios",
      icon: <SortIcon />,
      comparator: (a, b) => a.cantidadDormitorios - b.cantidadDormitorios,
    },
  ];
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(listaInteresAnual);
    } else {
      const buscadorFiltrado = listaInteresAnual.filter((interesAnual) => {
        const añoInteres = new Date(interesAnual.fechaDatos).getFullYear();
        const añoBuscador = parseInt(buscador, 10);

        // Comparar solo el año
        return añoInteres === añoBuscador;
      });

      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [listaInteresAnual, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <OrdenarPor
            options={ordenarOptions}
            buttonText="Ordenar por"
            onOptionSelect={handleSortChange}
          />
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Año
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Cooperativa
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Interés Anual{" "}
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {listaInteresAnual.map((interesAnual, index) => {
            const totalInteresAnual = calcularInteresTotal(
              interesAnual.listaInteresAnual
            );
            return (
              <tr key={index}>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">
                    {interesAnual.anio}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center ml-4">
                    {cooperativa.nombre}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center">
                    {totalInteresAnual.toFixed(2)}
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
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() =>
                              console.log("Ver detalle:", interesAnual)
                            }
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Ver Detalle
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
    </div>
  );
};

export default ListadoInteresAnual;
