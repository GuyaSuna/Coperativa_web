"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllSocios } from "../../../Api/api.js";
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

  useEffect(() => {
    fetchAllSocios();
  }, []);

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
  const handleOrderByFechaIngreso = () => {
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
            Add product
          </button>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              id="actionsDropdownButton"
              data-dropdown-toggle="actionsDropdown"
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
              Actions
            </button>
            <div
              id="actionsDropdown"
              className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="actionsDropdownButton"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mass Edit
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete all
                </a>
              </div>
            </div>
            <button
              id="filterDropdownButton"
              data-dropdown-toggle="filterDropdown"
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
              <svg
                className="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            <div
              id="filterDropdown"
              className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Choose brand
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="filterDropdownButton"
              >
                <li className="flex items-center">
                  <input
                    id="apple"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="apple"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Apple (56)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="fitbit"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="fitbit"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Microsoft (16)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="razor"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="razor"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Razor (49)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="nikon"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="nikon"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Nikon (12)
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="benq"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="benq"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    BenQ (74)
                  </label>
                </li>
              </ul>
            </div>
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
                    Pago
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
                              onClick={() =>
                                handleCrearRecibo(socio)
                              }
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

// <div className="sm:p-7 p-4">
//   {allSocios.length == 0 && <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex items-center ml-4">Todavia no existen socios</div>
//           </td> || <>
//   <div className="flex w-full items-center mb-7 relative">
//     <Menu as="div" className="relative inline-block text-left justify-end">
//       <div>
//         <MenuButton className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
//           Ordenar por
//           <svg viewBox="0 0 24 24" className="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points="6 9 12 15 18 9" />
//           </svg>
//         </MenuButton>
//       </div>
//       <MenuItems transition className="absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
//         <div className="py-1">
//           <MenuItem>
//             {({ active }) => (
//               <button onClick={handleOrderByFechaIngreso} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
//                 Fecha de Ingreso
//               </button>
//             )}
//           </MenuItem>
//           <MenuItem>
//             {({ active }) => (
//               <button onClick={handleOrderByNroSocio} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
//                 Número de Socio
//               </button>
//             )}
//           </MenuItem>
//         </div>
//       </MenuItems>
//     </Menu>
//   </div>
//   <table className="w-full text-left">
//     <thead>
//       <tr className="text-gray-400">
//         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">NroSocio</th>
//         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Nombre</th>
//         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Apellido</th>
//         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Capital</th>
//         <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Fecha Pago</th>
//       </tr>
//     </thead>

//     <tbody className="text-gray-600 dark:text-gray-100">
//       {allSocios?.map((socio) => (
//         <tr key={socio.cedulaSocio}>
//           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex items-center ml-4">{socio.nroSocio}</div>
//           </td>
//           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex items-center">{socio.nombreSocio}</div>
//           </td>
//           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
//             {socio.apellidoSocio}
//           </td>
//           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
//             ${socio.capitalSocio}
//           </td>
//           <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex items-center justify-between">
//               <div className="sm:flex hidden flex-col">
//                 {socio.fechaIngreso}
//               </div>
//               <Menu as="div" className="relative inline-block text-left justify-end">
//                 <div>
//                   <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
//                     <svg viewBox="0 0 24 24" className="w-5" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
//                       <circle cx={12} cy={12} r={1} />
//                       <circle cx={19} cy={12} r={1} />
//                       <circle cx={5} cy={12} r={1} />
//                     </svg>
//                   </MenuButton>
//                 </div>
//                 <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
//                   <div className="py-1">
//                     <MenuItem>
//                       <button onClick={() => handleEliminar(socio.cedulaSocio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
//                         Eliminar
//                       </button>
//                     </MenuItem>
//                     <MenuItem>
//                       <button onClick={() => handleModificar(socio.cedulaSocio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
//                         Modificar
//                       </button>
//                     </MenuItem>
//                     <MenuItem>
//                       <a onClick={() => handleCrearRecibo(socio.cedulaSocio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
//                         Crear Recibo
//                       </a>
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
//       <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="15 18 9 12 15 6" />
//       </svg>
//     </button>
//     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
//       1
//     </button>
//     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
//       2
//     </button>
//     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
//       3
//     </button>
//     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
//       4
//     </button>
//     <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
//       <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="9 18 15 12 9 6" />
//       </svg>
//     </button>
//   </div>
//   </>}
// </div>
