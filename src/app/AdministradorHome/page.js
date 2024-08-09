"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios, getUr } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Header from "@/Components/header";
import ListadoLateral from "@/Components/ListadoLateral";
import Footer from "@/Components/footer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const AdminHome = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [ur, setUr] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
  };
  useEffect(() => {
    if (!miembro || !cooperativa) {
      console.log("es esto");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    fetchUr();
  }, []);

  const fetchUr = async () => {
    try {
      const response = await getUr();
      setUr(response);
      console.log("Unidades Reajustables", response);
    } catch (error) {
      console.error("Error al obtener las unidades reajustables:", error);
    }
  };

  return (
    <>
      {cooperativa && (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
            <Header setIdentificadorComponente={setIdentificadorComponente} />
            <div className="flex-grow flex flex-col md:flex-row overflow-x-hidden">
              <ListadoLateral
                setIdentificadorComponente={setIdentificadorComponente}
                className="w-full md:w-1/4 lg:w-1/5"
              />
              <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
                <div className="px-4 sm:px-7 pt-4 sm:pt-7 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                  <div className="flex w-full items-center flex-wrap">
                    <div className="flex items-center text-2xl sm:text-3xl text-gray-900 dark:text-white">
                      <img
                        src="./LogoApp.jpg"
                        className="w-12 sm:w-16 mr-4 rounded-full"
                        alt="profile"
                      />
                      {cooperativa?.nombre} - {miembro?.email}
                    </div>
                    <div className="ml-auto sm:flex hidden items-center justify-end">
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
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() =>
                                  handleEliminar(socios.cedulaSocio)
                                }
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Eliminar
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() =>
                                  handleModificar(socios.cedulaSocio)
                                }
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
                  <div className="flex items-center space-x-3 md:space-x-0 sm:space-x-6 sm:mt-7 mt-4">
                    <button
                      onClick={() => {
                        setIdentificadorComponente(0);
                        handleSelection(0);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 0
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Socios
                    </button>
                    <button
                      onClick={() => {
                        setIdentificadorComponente(1, setCedulaSocio);
                        handleSelection(1);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 1
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Viviendas
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(11);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 11
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Recibos
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(9);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 9
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Suplentes
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(15);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 15
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Informes
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(12);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 12
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Usuarios
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(14);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 14
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Calculos
                    </button>
                  </div>
                </div>
                <ComponentesOrganizados
                  identificador={identificadorComponente}
                  setCedulaSocio={setCedulaSocio}
                  cedulaSocio={cedulaSocio}
                  setIdentificadorComponente={setIdentificadorComponente}
                  ur={ur}
                />
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>
      )}
      {!cooperativa && <div>cargando...</div>}
    </>
  );
};

export default AdminHome;
