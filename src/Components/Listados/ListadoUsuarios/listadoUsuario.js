"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllUsuarios, deleteUsuario} from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";

const ListadoUsuario = ({
  setUsuarioRecibo,
  setUsuario,
  setIdentificadorComponente,
}) => {
  const [allUsuarios, setAllUsuarios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);
  useEffect(() => {
    fetchAllUsuarios();
  }, []);

  const fetchAllUsuarios = async () => {
    try {
      const response = await getAllUsuarios(cooperativa.idCooperativa);
      setAllUsuarios(response);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleModificar = (usuario) => {
    setUsuario(usuario);
    setIdentificadorComponente(10);
  };
  const handleCrearRecibo = (Usuario) => {
    setUsuario(Usuario);
    setIdentificadorComponente(11);
  };
  const handleEliminar = async (idMiembro) => {
    try {
      const data = await deleteUsuario(idMiembro);
      console.log(data);
      fetchAllUsuarios();
    } catch (e) {
      throw ("Fallo al eliminar el usuario ", e.error);
    }
  };


  const handleOrderByIdMiembro = () => {
    const usuariosOrdenados = [...allUsuarios].sort(
      (a, b) => a.idMiembro- b.idMiemrbo
    );
    setAllUsuarios(usuariosOrdenados);
  };
  return (
    <div className="sm:p-7 p-4">
      {allUsuarios.length == 0 && <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">Todavia no existen usuarios</div>
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
                  <button onClick={handleOrderByIdMiembro} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                    idMiembro
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
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Gmail</th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Fecha Pago</th>
          </tr>
        </thead>
         
        <tbody className="text-gray-600 dark:text-gray-100">
          {allUsuarios?.map((usuario) => (
            <tr key={usuario.idMiembro}>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center ml-4">{usuario.socio.nroSocio}</div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">{usuario.socio.nombreSocio}</div>
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                {usuario.socio.apellidoSocio}
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
                ${usuario?.email}
              </td>
              <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
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
                          <button onClick={() => handleEliminar(usuario.idMiembro)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                            Eliminar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button onClick={() => handleModificar(usuario)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
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

export default ListadoUsuario;
