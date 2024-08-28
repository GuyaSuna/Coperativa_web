"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllRecibos } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { deleteSocio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import VerVivienda from "@/Components/VerDetalles/VerVivienda/VerVivienda.js";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import Buscador from "@/Components/Buscador.js";

const ListadoRecibos = ({ setCedulaSocio, setIdentificadorComponente }) => {
  const [allRecibos, setAllRecibos] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allRecibos);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  useEffect(() => {
    fetchAllRecibos();
  }, []);

  const fetchAllRecibos = async () => {
    try {
      const response = await getAllRecibos(cooperativa.idCooperativa);
      setAllRecibos(response);
      console.log(response, "no anda response");
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleModificar = (cedula) => {
    setCedulaSocio(cedula);
    setIdentificadorComponente(4);
  };

  const handleEliminar = async (idRecibo) => {
    try {
      const data = await deleteSocio(idRecibo);
      console.log(data);
      fetchAllRecibos();
    } catch (e) {
      throw ("Fallo al eliminar el recibo ", e.error);
    }
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allRecibos);
    } else {
      const buscadorFiltrado = allRecibos.filter((recibo) =>
        recibo.socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allRecibos, buscador]);
  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  const ordenarOptions = [
    {
      label: "Número Recibo",
      key: "nroSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroRecibo - b.nroRecibo,
    },
    {
      label: "Más Recientes",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(b.fechaPago) - new Date(a.fechaPago),
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
    const ordenarRecibos = [...allRecibos].sort(option.comparator);
    setAllRecibos(ordenarRecibos);
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
            AGREGAR RECIBO
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
                NroRecibo
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre Socio
              </th>
              <th scope="col" className="px-4 py-3">
                Monto
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha de Pago
              </th>
              <th scope="col" className="px-4 py-3">
                Estado
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado?.map((recibo) => (
              // eslint-disable-next-line react/jsx-key
              <tr className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {recibo.nroRecibo}
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
                </th>
                <td className="px-4 py-3">{recibo.fechaPago}</td>
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
                              onClick={() => handleEliminar(recibo?.idRecibo)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>

                          <MenuItem>
                            <button
                              onClick={() => handleModificar(recibo?.idRecibo)}
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
        <VerVivienda
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          socio={socioSeleccionado}
        />
      )}
    </div>
    // <div className="sm:p-7 p-4">
    //   <div className="flex w-full items-center mb-7">
    //     <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
    //       Ordenar por
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <polyline points="6 9 12 15 18 9" />
    //       </svg>
    //     </button>
    //   </div>
    //   <table className="w-full text-left">
    //     <thead>
    //       <tr className="text-gray-400">
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           NroRecibo
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Monto
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Nombre Socio
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
    //           Estado Cuota
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Fecha Pago
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="text-gray-600 dark:text-gray-100">
    //       {allRecibos?.map((recibo) => (
    //         <tr>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center ml-4">
    //               {recibo?.nroRecibo}
    //             </div>
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center">
    //               $ {recibo?.cuotaMensual}
    //             </div>
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
    //             {recibo?.socio.nombreSocio}
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
    //             {recibo?.capitalSocio}
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center justify-between">
    //               <div className="sm:flex hidden flex-col">
    //                 {recibo?.fechaIngreso}
    //               </div>
    //               <Menu
    //                 as="div"
    //                 className="relative inline-block text-left justify-end"
    //               >
    //                 <div>
    //                   <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
    //                     <svg
    //                       viewBox="0 0 24 24"
    //                       className="w-5"
    //                       stroke="currentColor"
    //                       strokeWidth={2}
    //                       fill="none"
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                     >
    //                       <circle cx={12} cy={12} r={1} />
    //                       <circle cx={19} cy={12} r={1} />
    //                       <circle cx={5} cy={12} r={1} />
    //                     </svg>
    //                   </MenuButton>
    //                 </div>

    //                 <MenuItems
    //                   transition
    //                   className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    //                 >
    //                   <div className="py-1">
    //                     <MenuItem>
    //                       <button
    //                         onClick={() => handleEliminar(recibo?.idRecibo)}
    //                         className="block px-4 py-2 text-sm text-gray-700  data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
    //                       >
    //                         Eliminar
    //                       </button>
    //                     </MenuItem>
    //                     <MenuItem>
    //                       <button
    //                         onClick={() => handleModificar(recibo?.idRecibo)}
    //                         className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
    //                       >
    //                         Modificar
    //                       </button>
    //                     </MenuItem>
    //                   </div>
    //                 </MenuItems>
    //               </Menu>
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ListadoRecibos;
