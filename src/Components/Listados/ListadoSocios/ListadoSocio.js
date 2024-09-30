"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  getAllSocios,
  getAllRecibos,
  updateSocio,
  getViviendaPorSocio,
  updateVivienda,
  getConveniosVigenteSocio,
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

const ListadoSocio = ({
  setSocioRecibo,
  setCedulaSocio,
  setIdentificadorComponente,
}) => {
  const [allSocios, setAllSocios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [recibos, setRecibos] = useState([]);

  useEffect(() => {
    if (cooperativa?.idCooperativa) {
      fetchAllData();
    }
  }, [cooperativa]);

  const fetchAllData = async () => {
    await Promise.all([fetchRecibos(), fetchAllSocios()]);
  };

  const fetchRecibos = async () => {
    const reciboResponse = await getAllRecibos(cooperativa.idCooperativa);
    setRecibos(reciboResponse);
    console.log("Listado recibo: ", reciboResponse);
  };

  const fetchAllSocios = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      console.log("Cooperativa", cooperativa);
      console.log("Respuesta all socios", response);
      const sociosConFechaFormateada = response.map((socio) => {
        console.log("Fecha ingreso antes: ", socio.fechaIngresoCooeprativa);

        if (socio.fechaIngresoCooeprativa) {
          const fechaISO = parseISO(socio.fechaIngresoCooeprativa);
          const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
          console.log("Fecha formateada: ", fechaFormateada);
          return {
            ...socio,
            fechaIngresoCooeprativa: fechaFormateada,
          };
        } else {
          return socio;
        }
      });
      const sociosSinArchivar = sociosConFechaFormateada.filter(
        (socio) => !socio.archivado
      );
      setAllSocios(sociosSinArchivar);
      setBuscadorFiltrado(sociosSinArchivar);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
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

        await updateSocio(socioActualizado);

        const viviedaResponse = await getViviendaPorSocio(socio.cedulaSocio);

        viviedaResponse.socio = null;
        console.log(viviedaResponse);
        await updateVivienda(
          viviedaResponse.idVivienda,
          viviedaResponse.nroVivienda,
          viviedaResponse.listaAntiguosTitulares,
          viviedaResponse.cantidadDormitorios,
          viviedaResponse.cooperativaEntity,
          viviedaResponse.valorVivienda,
          viviedaResponse.socio
        );

        setAllSocios((prevSocios) =>
          prevSocios.filter((s) => s.cedulaSocio !== socio.cedulaSocio)
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

  const handleSortChange = (option) => {
    console.log("Orden seleccionado:", option.label);
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarSocios = [...allSocios].sort(option.comparator);
      setAllSocios(ordenarSocios);
    }
  };

  const handleAgregarSocio = () => {
    setIdentificadorComponente(3);
  };
  const handleCrearRecibo = (Socio) => {
    setSocioRecibo(Socio);
    setIdentificadorComponente(6);
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
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr className="hidden sm:table-row">
              <th scope="col" className="px-4 py-3 text-center">
                NroSocio
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha Ingreso
              </th>
              <th scope="col" className="px-4 py-3">
                Estado
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
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {socio.nroSocio}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {socio.nombreSocio} {socio.apellidoSocio}
                </td>
                <td className="px-4 py-3">{socio.fechaIngresoCooeprativa}</td>
                <td className="px-4 py-3">
                  <span
                    className={`bg-${
                      socio.estadoSocio === "ACTIVO" ? "green" : "red"
                    }-100 text-${
                      socio.estadoSocio === "ACTIVO" ? "green" : "red"
                    }-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${
                      socio.estadoSocio === "ACTIVO" ? "green" : "red"
                    }-900 dark:text-${
                      socio.estadoSocio === "ACTIVO" ? "green" : "red"
                    }-300`}
                  >
                    {socio.estadoSocio}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleVerSocio(socio)}
                    className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center">
                      ⋮
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        <button
                          className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                          onClick={() => handleArchivar(socio)}
                        >
                          Archivar
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                          onClick={() => handleModificarSocio(socio)}
                        >
                          Modificar
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          className="group flex rounded-md items-center w-full px-2 py-2 text-sm"
                          onClick={() => handleCrearRecibo(socio)}
                        >
                          Crear Recibo
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
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

export default ListadoSocio;
