"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllSocios, getAllRecibos } from "../../../Api/api.js";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { deleteSocio } from "../../../Api/api.js";
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
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allSocios);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [socioSeleccionado, setSocioSeleccionado] = useState(null); // Estado para el s
  const [estadoCuota, setEstadoCuota] = useState("");
  const [recibos, setRecibos] = useState([]);

  useEffect(() => {
    fetchRecibos();
  }, []);

  useEffect(() => {
    fetchAllSocios();
  }, []);

  const fetchRecibos = async () => {
    const ReciboResponse = await getAllRecibos(cooperativa.idCooperativa);
    setRecibos(ReciboResponse);
  };

  useEffect(() => {
    if (recibos.length && allSocios.length) {
      const sociosConEstadoCuota = allSocios.map((socio) => {
        const recibosDelSocio = recibos
          .filter((recibo) => recibo.socio.cedulaSocio === socio.cedulaSocio) // Usamos cedulaSocio como identificador
          .sort((a, b) => new Date(a.fechaPago) - new Date(b.fechaPago)); // Ordenamos por fechaPago

        const today = new Date();
        const currentMonth = today.getMonth() + 1; // Mes actual (enero es 0)
        const currentYear = today.getFullYear();

        let estaImpago = false;
        let mesesPagados = new Set();

        // Convertir fechaIngreso a Date
        const fechaIngreso = new Date(socio.fechaIngreso);

        recibosDelSocio.forEach((recibo) => {
          const fechaPago = new Date(recibo.fechaPago);
          const mesPago = fechaPago.getMonth() + 1; // Obtenemos el mes del recibo pagado
          const añoPago = fechaPago.getFullYear();

          // Guardamos los meses y años pagados
          mesesPagados.add(`${añoPago}-${mesPago}`);
        });

        // Comprobamos si todos los meses hasta el mes actual están pagados
        for (
          let year = fechaIngreso.getFullYear();
          year <= currentYear;
          year++
        ) {
          const mesInicio =
            year === fechaIngreso.getFullYear()
              ? fechaIngreso.getMonth() + 1
              : 1;
          const mesFinal = year === currentYear ? currentMonth : 12;

          for (let mes = mesInicio; mes <= mesFinal; mes++) {
            if (!mesesPagados.has(`${year}-${mes}`)) {
              estaImpago = true; // Si falta algún mes, está en deuda
              break;
            }
          }
          if (estaImpago) break;
        }

        return {
          ...socio,
          estaImpago,
        };
      });

      setAllSocios(sociosConEstadoCuota);
    }
  }, [recibos, allSocios]);

  const fetchAllSocios = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      const sociosConFechaFormateada = response.map((socio) => {
        console.log("Fecha ingreso antes: ", socio.fechaIngreso);

        if (socio.fechaIngreso) {
          const fechaISO = parseISO(socio.fechaIngreso);
          const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
          console.log("Fecha formateada: ", fechaFormateada);
          return {
            ...socio,
            fechaIngreso: fechaFormateada,
          };
        } else {
          return socio;
        }
      });

      setAllSocios(sociosConFechaFormateada);
      console.log(sociosConFechaFormateada, "response con fecha formateada");
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleModificar = (cedula) => {
    setCedulaSocio(cedula);
    setIdentificadorComponente(4);
  };
  const handleCrearRecibo = (Socio) => {
    setSocioRecibo(Socio);
    setIdentificadorComponente(6);
  };

  const handleVerSocio = (socio) => {
    console.log(socio);
    setSocioSeleccionado(socio);
    setIsModalOpen(true);
  };
  const handleEliminar = async (cedula) => {
    try {
      const data = await deleteSocio(cedula, cooperativa.idCooperativa);
      console.log(data);
      fetchAllSocios();
    } catch (e) {
      throw ("Fallo al eliminar el socio ", e.error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
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
      comparator: (a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(a.fechaIngreso) - new Date(b.fechaIngreso),
    },
  ];

  const handleSortChange = (option) => {
    console.log("Orden seleccionado:", option.label);
    const ordenarSocios = [...allSocios].sort(option.comparator);
    setAllSocios(ordenarSocios);
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
          <thead className="text-xs text-gray-700 uppercase  dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr>
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
              // eslint-disable-next-line react/jsx-key
              <tr className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {socio.nroSocio}
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {socio.nombreSocio} {socio.apellidoSocio}
                </th>
                <td className="px-4 py-3">{socio.fechaIngreso}</td>
                <td className="px-4 py-3">
                  <span class="bg-gradient-to-br from-green-500 to-green-700 text-white text-sm font-semibold mr-2 px-3 py-1 rounded">
                    {socio.estaImpago ? "Impago" : "Pago"}
                  </span>
                </td>
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
                              onClick={() => handleEliminar(socio.cedulaSocio)}
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

export default ListadoSocio;
