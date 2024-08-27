"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllViviendas, deleteVivienda } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerVivienda from "@/Components/VerDetalles/VerVivienda/VerVivienda.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

const ListadoViviendas = ({
  setVivienda,
  setNroVivienda,
  setIdentificadorComponente,
}) => {
  const { cooperativa } = useContext(MiembroContext);
  const [viviendas, setAllViviendas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viviendaSeleccionada, setViviendaSeleccionada] = useState(null);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(viviendas);

  useEffect(() => {
    fetchAllViviendas();
  }, []);

  const fetchAllViviendas = async () => {
    try {
      const response = await getAllViviendas(cooperativa.idCooperativa);
      setAllViviendas(response);
      console.log(response, "Viviendas");
    } catch (error) {
      console.error("Error al obtener las viviendas:", error);
    }
  };

  const handleModificar = (nroVivienda) => {
    setNroVivienda(nroVivienda);
    setIdentificadorComponente(5);
  };

  const handleVerDetalles = (vivienda) => {
    setVivienda(vivienda);
    setViviendaSeleccionada(vivienda);
    setIsModalOpen(true);
  };

  const handleEliminar = async (nroVivienda) => {
    try {
      const data = await deleteVivienda(nroVivienda);
      console.log(data);
      fetchAllViviendas();
    } catch (e) {
      throw ("Fallo al eliminar la vivienda ", e.error);
    }
  };
  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(viviendas);
    } else {
      const buscadorFiltrado = viviendas.filter((vivienda) =>
        vivienda.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [viviendas, buscador]);

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
    const ordenarViviendas = [...viviendas].sort(option.comparator);
    setAllViviendas(ordenarViviendas);
  };
  return (
    // <div className="sm:p-7 p-4">
    //   <div className="flex w-full items-center mb-7">
    //     <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="w-4 mr-2 text-gray-400 dark:text-gray-600"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
    //         <line x1={16} y1={2} x2={16} y2={6} />
    //         <line x1={8} y1={2} x2={8} y2={6} />
    //         <line x1={3} y1={10} x2={21} y2={10} />
    //       </svg>
    //       Last 30 days
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
    //     <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
    //       Filter by
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
    //     <div className="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
    //       <span className="mr-3">Page 2 of 4</span>
    //       <button className="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
    //         <svg
    //           className="w-4"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //           strokeWidth={2}
    //           fill="none"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         >
    //           <polyline points="15 18 9 12 15 6" />
    //         </svg>
    //       </button>
    //       <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
    //         <svg
    //           className="w-4"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //           strokeWidth={2}
    //           fill="none"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         >
    //           <polyline points="9 18 15 12 9 6" />
    //         </svg>
    //       </button>
    //     </div>
    //   </div>
    //   <table className="w-full text-left">
    //     <thead>
    //       <tr className="text-gray-400">
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Nro. de Vivienda
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Dormitorios
    //         </th>
    //         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
    //           Socio Titular
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="text-gray-600 dark:text-gray-100">
    //       {viviendas?.map((vivienda) => (
    //         <tr key={vivienda.nroVivienda}>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center ml-4">
    //               {vivienda.nroVivienda}
    //             </div>
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
    //             {vivienda.cantidadDormitorios}
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center">
    //               {vivienda?.socioTitular?.nombreSocio &&
    //               vivienda?.socioTitular?.apellidoSocio
    //                 ? `${vivienda.socioTitular.nombreSocio} ${vivienda.socioTitular.apellidoSocio}`
    //                 : "Sin socio"}
    //             </div>
    //           </td>
    //           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
    //             <div className="flex items-center">
    //               <div className="sm:flex hidden flex-col">
    //                 {vivienda.fechaIngreso}
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
    //                         onClick={() => handleVerDetalles(vivienda)}
    //                         className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
    //                       >
    //                         Ver Detalle
    //                       </button>
    //                     </MenuItem>
    //                     <MenuItem>
    //                       <button
    //                         onClick={() => handleEliminar(vivienda.nroVivienda)}
    //                         className="block px-4 py-2 text-sm text-gray-700  data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
    //                       >
    //                         Eliminar
    //                       </button>
    //                     </MenuItem>
    //                     <MenuItem>
    //                       <button
    //                         onClick={() =>
    //                           handleModificar(vivienda.nroVivienda)
    //                         }
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
    //   <div className="flex w-full mt-5 space-x-2 justify-end">
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
    //       <svg
    //         className="w-4"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <polyline points="15 18 9 12 15 6" />
    //       </svg>
    //     </button>
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
    //       1
    //     </button>
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800  hover:bg-gray-400 hover:text-white leading-none">
    //       2
    //     </button>
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
    //       3
    //     </button>
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
    //       4
    //     </button>
    //     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
    //       <svg
    //         className="w-4"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <polyline points="9 18 15 12 9 6" />
    //       </svg>
    //     </button>
    //   </div>
    //   {isModalOpen && (
    //     <VerVivienda
    //       isOpen={isModalOpen}
    //       onClose={() => setIsModalOpen(false)}
    //       vivienda={viviendaSeleccionada}
    //     />
    //   )}
    // </div>
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
            AGREGAR VIENDA
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
                Nro Vivienda
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre Socio
              </th>
              <th scope="col" className="px-4 py-3">
                Cantidad Dormitorios
              </th>
              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3"></th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado?.map((vivienda) => (
              // eslint-disable-next-line react/jsx-key
              <tr className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {vivienda.nroVivienda}
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {vivienda?.socioTitular?.nombreSocio &&
                  vivienda?.socioTitular?.apellidoSocio
                    ? `${vivienda.socioTitular.nombreSocio} ${vivienda.socioTitular.apellidoSocio}`
                    : "Sin socio"}
                </th>
                <td className="px-20 py-3"> {vivienda.cantidadDormitorios}</td>

                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleVerDetalles(vivienda)}
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
                                handleEliminar(vivienda.nroVivienda)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Eliminar
                            </button>
                          </MenuItem>

                          <MenuItem>
                            <button
                              onClick={() =>
                                handleModificar(vivienda.nroVivienda)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Modificar
                            </button>
                          </MenuItem>

                          {/* <MenuItem>
                            <a
                              onClick={() => handleCrearRecibo(socio)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Crear Recibo
                            </a>
                          </MenuItem> */}
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

export default ListadoViviendas;
