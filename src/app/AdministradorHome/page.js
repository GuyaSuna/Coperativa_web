"use client";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Header from "@/Components/header";
import ListadoLateral from "@/Components/ListadoLateral";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/footer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const AdminHome = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  console.log("Miembro del provider:", miembro);
  console.log("Cooperativa del provider:", cooperativa);
  const [socios, setSocios] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [cedulaSocio, setCedulaSocio] = useState(0);

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      const response = await getAllSocios();
      setSocios(response);
      console.log("SOCIOS", response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      {/* <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
        <Sidebar />
      </div> */}
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header />
        <div className="flex-grow flex overflow-x-hidden">
          <ListadoLateral />
          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
              <div className="flex w-full items-center">
                <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                  <img
                    src="./LogoApp.jpg"
                    className="w-16 mr-4 rounded-full"
                    alt="profile"
                  />
                  {cooperativa.nombre}
                </div>
                <div className="ml-auto sm:flex hidden items-center justify-end">
                  <div className="text-right">
                    {/* <div className="text-xs text-gray-400 dark:text-gray-400">
                      Account balance:
                    </div>
                    <div className="text-gray-900 text-lg dark:text-white">
                      $2,794.00
                    </div> */}
                  </div>

                  <Menu
                    as="div"
                    className="relative inline-block text-left justify-end"
                  >
                    <MenuButton className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4"
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
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => handleEliminar(socios.cedulaSocio)}
                            className="block px-4 py-2 text-sm text-gray-700  data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Eliminar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() => handleModificar(socios.cedulaSocio)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Modificar
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Crear Recibo
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                <button
                  onClick={() => setIdentificadorComponente(0)}
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center "
                >
                  Socios
                </button>
                <button
                  onClick={() => setIdentificadorComponente(1, setCedulaSocio)}
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Viviendas
                </button>
                <a
                  href="#"
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Recibos
                </a>
                <a
                  href="#"
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Suplentes
                </a>
                <a
                  href="#"
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Informes
                </a>
              </div>
            </div>
            <ComponentesOrganizados
              identificador={identificadorComponente}
              setCedulaSocio={setCedulaSocio}
              cedulaSocio={cedulaSocio}
              setIdentificadorComponente={setIdentificadorComponente}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AdminHome;
