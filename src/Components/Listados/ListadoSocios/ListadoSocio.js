"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  getAllSocios,
  getAllRecibos,
  updateSocio,
  getViviendaPorSocio,
  updateVivienda,
  getConveniosVigenteSocio,
  getDevolucionCapital,
} from "../../../Api/api.js";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import { parseISO, format } from "date-fns";
import Buscador from "@/Components/Buscador.js";
import VerSocio from "@/Components/VerDetalles/VerSocio/VerSocio.js";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import { useGetAllSocios } from "@/Hooks/useSocios.js";

const ListadoSocio = ({
  setSocio,
  setIdentificadorComponente,
  setSocioRecibo,
}) => {
  const { miembro, cooperativa } = useContext(MiembroContext);

  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [recibos, setRecibos] = useState([]);
  const [verArchivados, setVerArchivados] = useState(false);
  const {data: allSocios =[], isLoading, error,} = useGetAllSocios(cooperativa.idCooperativa);
  
  
  useEffect(() => {
    const filteredSocios = allSocios.filter((socio) =>
      !verArchivados ? !socio.archivado : socio.archivado
    );
    setBuscadorFiltrado(filteredSocios);
  }, [allSocios, verArchivados]);



  const handleVerArchivados = () => {
    setVerArchivados(!verArchivados);
  };
  useEffect(() => {
    if (cooperativa?.idCooperativa) {
      fetchAllData();
    }
  }, [cooperativa]);

  const fetchAllData = async () => {
    await Promise.all([fetchRecibos()]);
  };

  const fetchRecibos = async () => {
    const reciboResponse = await getAllRecibos(cooperativa.idCooperativa);
    setRecibos(reciboResponse);
  };


  
  const handleArchivar = async (socio) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas archivar al socio ${socio.nombreSocio} ${socio.apellidoSocio}? No podra ser desarchivado luego`
    );

    if (confirmacion) {
      try {
        let socioActualizado = { ...socio, archivado: true };

        const responseConvenio = await getConveniosVigenteSocio(
          socio.cedulaSocio
        );

        if (responseConvenio != null) {
          socioActualizado = {
            ...socioActualizado,
            capitalSocio: socio.capitalSocio - responseConvenio.deudaRestante,
          };
        }

        const viviedaResponse = await getViviendaPorSocio(socio.cedulaSocio);
        await updateSocio(socioActualizado, viviedaResponse.idVivienda);
        viviedaResponse.socio = null;

        await updateVivienda(
          viviedaResponse.idVivienda,
          viviedaResponse.nroVivienda,
          viviedaResponse.listaAntiguosTitulares,
          viviedaResponse.cantidadDormitorios,
          viviedaResponse.cooperativaEntity,
          viviedaResponse.valorVivienda,
          viviedaResponse.socio
        );

       
        setBuscadorFiltrado((prevFiltrado) =>
          prevFiltrado.filter((s) => s.cedulaSocio !== socio.cedulaSocio)
        );
      } catch (e) {
        console.error("Fallo al archivar el socio", e);
      }
    } else {
      console.log("Archivo cancelado");
    }
  };

  const handleVerSocio = (socio) => {
    setSocioSeleccionado(socio);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (buscador == "") {
      setBuscadorFiltrado(allSocios);
    } else {
      const buscadorFiltrado = allSocios.filter((socio) =>
        socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allSocios, buscador]);
  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const ordenarOptions = [
    {
      label: "Número socio",
      key: "nroSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroSocio - b.nroSocio,
    },
    {
      label: "Nombre Socio",
      key: "nombreSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nombreSocio.localeCompare(b.nombreSocio),
    },
    {
      label: "Más Recientes",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(b.fechaIngresoCooeprativa) -
        new Date(a.fechaIngresoCooeprativa),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) =>
        new Date(a.fechaIngresoCooeprativa) -
        new Date(b.fechaIngresoCooeprativa),
    },
  ];

  useEffect(() => {
    if (buscador == "") {
      setBuscadorFiltrado(allSocios.filter((socio) => !socio.archivado));
    } else {
      const buscadorFiltrado = allSocios.filter(
        (socio) =>
          socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase()) &&
          !socio.archivado
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allSocios, buscador]);

  const handleSortChange = (option) => {
    let sociosFiltrados = [...allSocios];

    if (option.key === "archivados") {
      sociosFiltrados = sociosFiltrados.filter((socio) => socio.archivado);
    } else {
      sociosFiltrados = sociosFiltrados.filter((socio) => !socio.archivado);
    }

    sociosFiltrados = sociosFiltrados.sort(option.comparator);

    setBuscadorFiltrado(sociosFiltrados);
  };

  const handleDevolucionCapital = (socio) => {
    setSocio(socio);
    setIdentificadorComponente(39);
  };

  const handlePagoDevolucion = (socio) => {
    const responseDevolucion = getDevolucionCapital(socio.cedulaSocio);
    if (responseDevolucion != null) {
      setSocio(socio);
      setIdentificadorComponente(40);
    } else {
      alert(
        "No se encontro ninguna devolucion para este socio, crea una antes de comenzar un pago"
      );
    }
  };
  const handleModificarSocio = (Socio) => {
    setSocio(Socio);
    setIdentificadorComponente(4);
  };
  const handleAgregarSocio = () => {
    setIdentificadorComponente(3);
  };
  const handleCrearRecibo = (Socio) => {
    setSocioRecibo(Socio);
    setIdentificadorComponente(6);
  };
  return (
    <>
    {isLoading && <div>cargando...</div>}
    {error && <div>Ah ocurrido un error</div>}
    {allSocios && !isLoading && !error &&
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleAgregarSocio}
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
            AGREGAR SOCIO
          </button>
          <button
            type="button"
            onClick={handleVerArchivados}
            className="flex items-center justify-center text-white bg-green-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {verArchivados ? "Ver Activos" : "Ver Archivados"}
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
                NroSocio
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha Ingreso
              </th>

              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {buscadorFiltrado?.map((socio) => (
              <tr
                className="border-b dark:border-gray-700 sm:table-row"
                key={socio.cedulaSocio}
              >
                {/* NroSocio */}
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">NroSocio:</span>
                  {socio.nroSocio}
                </td>

                {/* Nombre */}
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">Nombre:</span>
                  {socio.nombreSocio} {socio.apellidoSocio}
                </td>

                {/* Fecha Ingreso */}
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="sm:hidden font-semibold">
                    Fecha Ingreso:
                  </span>
                  {socio.fechaIngresoCooperativa}
                </td>

                {/* Actions */}
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <button
                    onClick={() => handleVerSocio(socio)}
                    className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1"
                  >
                    Ver
                  </button>
                </td>

                {/* Opciones adicionales */}
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
                        {" "}
                        {socio.archivado ? (
                          <>
                            <MenuItem>
                              <button
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700"
                                onClick={() => handleDevolucionCapital(socio)}
                              >
                                Asignar devolución de capital
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700"
                                onClick={() => handlePagoDevolucion(socio)}
                              >
                                Pagar devolución
                              </button>
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            {miembro?.responseBody != null &&
                              socio.cedulaSocio !==
                                miembro.responseBody.socio.cedulaSocio && (
                                <MenuItem>
                                  <button
                                    className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700"
                                    onClick={() => handleArchivar(socio)}
                                  >
                                    Archivar
                                  </button>
                                </MenuItem>
                              )}

                            <MenuItem>
                              <button
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700"
                                onClick={() => handleModificarSocio(socio)}
                              >
                                Modificar
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700"
                                onClick={() => handleCrearRecibo(socio)}
                              >
                                Crear Recibo
                              </button>
                            </MenuItem>
                          </>
                        )}
                      </MenuItems>
                    </Menu>
                  </div>
                </td>
                <td className="px-2 py-2 flex justify-end gap-1 sm:flex-wrap md:hidden">
                  <button
                    onClick={() => handleArchivar(socio)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
                  >
                    Archivar
                  </button>
                  <button
                    onClick={() => handleModificarSocio(socio)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleCrearRecibo(socio)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs"
                  >
                    Crear Recibo
                  </button>
                  <button
                    onClick={() => handleDevolucionCapital(socio)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs"
                  >
                    Pagar Devolución
                  </button>
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
    </div>}
    </>
  );
};

export default ListadoSocio;
