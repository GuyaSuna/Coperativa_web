"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllSocios } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { deleteSocio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import { parseISO, format } from "date-fns";

const ListadoSocio = ({
  setSocioRecibo,
  setCedulaSocio,
  setIdentificadorComponente,
}) => {
  const [allSocios, setAllSocios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
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
  const handleEliminar = async (cedula) => {
    try {
      const data = await deleteSocio(cedula , cooperativa.idCooperativa);
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
  return (
    <div className="sm:p-7 p-4">
      {allSocios.length == 0 && <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">Todavia no existen socios</div>
              </td> || <>
      <div className="flex w-full items-center mb-7 relative">
        <Menu as="div" className="relative inline-block text-left justify-end">
          <div>
            <MenuButton className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
              Ordenar por
              <svg viewBox="0 0 24 24" className="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </MenuButton>
          </div>
          <MenuItems transition className="absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button onClick={handleOrderByFechaIngreso} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                    Fecha de Ingreso
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button onClick={handleOrderByNroSocio} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                    Número de Socio
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">NroSocio</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Nombre</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Apellido</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Capital</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Fecha Pago</th>
          </tr>
        </thead>
         
        <tbody className="text-gray-600 dark:text-gray-100">
          {allSocios?.map((socio) => (
            <tr key={socio.cedulaSocio}>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">{socio.nroSocio}</div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">{socio.nombreSocio}</div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                {socio.apellidoSocio}
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
                ${socio.capitalSocio}
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="sm:flex hidden flex-col">
                    {socio.fechaIngreso}
                  </div>
                  <Menu as="div" className="relative inline-block text-left justify-end">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-5" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </MenuButton>
                    </div>
                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          <button onClick={() => handleEliminar(socio.cedulaSocio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                            Eliminar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button onClick={() => handleModificar(socio.cedulaSocio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                            Modificar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <a onClick={() => handleCrearRecibo(socio)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
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
      <div className="flex w-full mt-5 space-x-2 justify-end">
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          1
        </button>
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          2
        </button>
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          3
        </button>
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          4
        </button>
        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 hover:bg-gray-400 hover:text-white leading-none">
          <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      </>}
    </div>
  );
};

export default ListadoSocio;
