"use client";
import React, { useState, useEffect, useContext } from "react";
import { getAllConvenios } from "../../../Api/api.js";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { deleteConvenio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";
import VerConvenio from "@/Components/VerDetalles/VerConvenio/VerConvenio.js";

const ListadoConvenio = ({ setConvenio, setIdentificadorComponente }) => {
  const [allConvenios, setAllConvenios] = useState([]);
  const [archivados, setArchivados] = useState(false); // Para alternar entre archivados y no archivados
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allConvenios);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [convenioSeleccionado, setConvenioSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllConvenios();
  }, [archivados]); // Llama al fetch cuando se cambia el estado de archivados

  const fetchAllConvenios = async () => {
    try {
      const response = await getAllConvenios(cooperativa.idCooperativa);
      const dataFiltrada = response.filter(
        (convenio) => convenio.socio && convenio.socio.archivado === archivados
      );
      setAllConvenios(dataFiltrada);
      setBuscadorFiltrado(dataFiltrada); // Mantén los datos filtrados
    } catch (error) {
      console.error("Error al obtener los convenios:", error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allConvenios);
    } else {
      const buscadorFiltrado = allConvenios.filter((convenio) =>
        convenio.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allConvenios, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const handleArchivadosToggle = () => {
    setArchivados(!archivados);
  };

  const handleModificar = (cedula) => {
    setCedulaSocio(cedula);
    setIdentificadorComponente(4);
  };

  const handleCrearConvenio = (convenio) => {
    setConvenio(convenio);
    setIdentificadorComponente(18);
  };

  const handleVerConvenio = (convenio) => {
    setConvenioSeleccionado(convenio);
    setIsModalOpen(true);
  };

  const handleEliminar = async (idConvenio) => {
    try {
      const data = await deleteConvenio(idConvenio);
      fetchAllConvenios();
    } catch (e) {
      throw new Error("Fallo al eliminar el convenio ", e.error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const ordenarOptions = [
    {
      label: "Número convenio",
      key: "nroConvenio",
      icon: <SortIcon />,
      comparator: (a, b) => a.idConvenio - b.idConvenio,
    },
    {
      label: "Más Recientes",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(b.fechaInicioConvenio) - new Date(a.fechaInicioConvenio),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(a.fechaInicioConvenio) - new Date(b.fechaInicioConvenio),
    },
    {
      label: "Nombre Socio",
      key: "nombreSocio",
      icon: <SortIcon />,
      comparator: (a, b) =>
        a.socio.nombreSocio.localeCompare(b.socio.nombreSocio),
    },
  ];

  const handleSortChange = (option) => {
    const ordenarConvenios = [...allConvenios].sort(option.comparator);
    setAllConvenios(ordenarConvenios);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleCrearConvenio}
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Agregar Convenio
          </button>

          <button
            type="button"
            onClick={handleArchivadosToggle}
            className="flex items-center justify-center text-white bg-green-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {archivados ? "Ver Activos" : "Ver Archivados"}
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
                Nro. Convenio
              </th>
              <th scope="col" className="px-4 py-3">
                Deuda en UR
              </th>
              <th scope="col" className="px-4 py-3">
                Paga Por Mes
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha Inicio
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
            {buscadorFiltrado?.map((convenio) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={convenio.idConvenio}
              >
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {convenio.idConvenio}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {convenio.deudaEnUrOriginal} UR
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  {convenio.urPorMes} UR
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  {formatDate(convenio.fechaInicioConvenio)}
                </td>
                <td className="block sm:table-cell px-4 py-3">
                  {convenio.socio.nombreSocio}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleVerConvenio(convenio)}
                    className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center justify-end md:table-cell">
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
                              onClick={() =>
                                handleEliminar(convenio.idConvenio)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Finalizar
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleModificar(convenio.idConvenio)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Modificar
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerConvenio
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          convenio={convenioSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoConvenio;
