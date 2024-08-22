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
import { parseISO, format } from "date-fns";
import Buscador from "@/Components/Buscador.js";
import VerSocio from "@/Components/VerDetalles/VerSocio/VerSocio.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoConvenio = ({ setConvenio, setIdentificadorComponente }) => {
  const [allConvenios, setAllConvenios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allConvenios);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [socioSeleccionado, setSocioSeleccionado] = useState(null); // Estado para el s

  useEffect(() => {
    fetchAllConvenios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllConvenios = async () => {
    try {
      const response = await getAllConvenios(cooperativa.idCooperativa);
      setAllConvenios(response);
      console.log("Convenios ", response);
    } catch (error) {
      console.error("Error al obtener los convenios:", error);
    }
  };

  const handleModificar = (cedula) => {
    setCedulaSocio(cedula);
    setIdentificadorComponente(4);
  };
  const handleCrearConvenio = (convenio) => {
    setConvenio(convenio);
    setIdentificadorComponente(18);
  };

  const handleVerSocio = (socio) => {
    console.log(socio);
    setSocioSeleccionado(socio);
    setIsModalOpen(true);
  };
  const handleEliminar = async (idConvenio) => {
    try {
      const data = await deleteConvenio(idConvenio);
      console.log(data);
      fetchAllSocios();
    } catch (e) {
      throw ("Fallo al eliminar el convenio ", e.error);
    }
  };
  const ordenarOptions = [
    { label: "Más recientes", icon: <SortIcon /> },
    { label: "Más antiguos", icon: <SortIcon /> },
    { label: "Mayor deuda", icon: <SortIcon /> },
  ];

  const handleSortChange = (option) => {
    console.log("Orden seleccionado:", option.label);
    // Lógica para ordenar los elementos según la opción seleccionada
  };
  const handleOrder = () => {
    const ordenarSocios = [...allSocios].sort(
      (a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso)
    );
    setAllSocios(ordenarSocios);
  };

  const handleOrderByNroSocio = () => {
    const ordenarSocios = [...allSocios].sort(
      (a, b) => a.nroSocio - b.nroSocio
    );
    setAllSocios(ordenarSocios);
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allConvenios);
    } else {
      const buscadorFiltrado = allSocios.filter((convenio) =>
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
  return (
    <div className="sm:p-7 p-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleCrearConvenio}
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
            Agregar Convenio
          </button>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <OrdenarPor
              options={ordenarOptions}
              buttonText="Ordenar por"
              onOptionSelect={handleSortChange}
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">
                Nro Convenio
              </th>
              <th scope="col" className="pl-8 py-3">
                Deuda en Ur
              </th>
              <th scope="col" className="px-4 py-3">
                Paga por mes
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha
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
            {allConvenios?.map((convenio) => (
              // eslint-disable-next-line react/jsx-key
              <tr className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {convenio.idConvenio}
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {convenio.deudaEnUrOriginal} Ur
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {convenio.urPorMes} Ur
                </th>
                <td className="px-4 py-3">{convenio.fechaInicioConvenio}</td>
                <td className="px-4 py-3">{convenio.socio.nombreSocio}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleVerSocio(socio)}
                    class="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1   text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center justify-end">
                  <div className="flex items-center justify-between">
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
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleEliminar(convenio.idConvenio)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>

                          <MenuItem>
                            <button
                              onClick={() => handleModificar(socio.cedulaSocio)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Modificar
                            </button>
                          </MenuItem>

                          <MenuItem>
                            <a
                              onClick={() => handleCrearRecibo(socio)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Crear Recibo
                            </a>
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
        <VerSocio
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          socio={socioSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoConvenio;
