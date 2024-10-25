"use client";
import React, { useState, useContext, useEffect } from "react";
import { MiembroContext } from "@/Provider/provider";
import ThemeToggle from "./ThemeToggle";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaUserPlus,
  FaUserTie,
  FaUser,
  FaUserShield,
  FaBell,
  FaHandHoldingUsd,
  FaMoneyBillWave,
  FaMoneyBill,
  FaFileAlt,
  FaFileInvoice,
  FaFileSignature,
  FaRegNewspaper,
  FaChartLine,
  FaHouseUser,
  FaClipboardList,
} from "react-icons/fa";
import { useTheme } from "../Provider/ThemeProvider"; // Importar el contexto de tema
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Header = ({ setIdentificadorComponente }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [miembroUsername, setMiembroUsername] = useState("");
  const { miembro, logoutMiembro } = useContext(MiembroContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSecondDropdown, setOpenSecondDropdown] = useState(null); // Estado para el segundo dropdown
  const [openThirdDropdown, setOpenThirdDropdown] = useState(null);

  // Acceder al estado del tema
  const { darkMode } = useTheme();

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
    setMenuOpen(false);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (miembro && miembro.responseBody.username) {
      setMiembroUsername(miembro.responseBody.username);
    }
  }, [miembro]);

  const handlePressCerrarSesion = () => {
    logoutMiembro();
    router.push("/");
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSecondDropdown = () => {
    setOpenSecondDropdown(!openSecondDropdown); // Alterna el estado del segundo dropdown
  };
  const toggleThirdDropdown = () => {
    setOpenThirdDropdown(openThirdDropdown ? null : true); // Alterna el tercer desplegable
  };
  const initial = miembroUsername.charAt(0).toUpperCase();
  return (
    <header className="h-16 flex justify-between w-full border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 z-50 relative">
      <div className="flex text-gray-600 dark:text-gray-400 w-full lg:w-auto">
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {menuOpen && (
          <div
            className="fixed inset-0 h-screen w-full z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={handleCloseMenu}
          />
        )}
        <div
          className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 z-50 transition-opacity duration-300 ease-in-out ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:hidden`}
          style={{ width: "250px" }}
        >
          <div className="flex flex-col h-full p-4 overflow-y-auto">
            <Image
              className="logo-Img hover:scale-90 transform duration-700"
              src={darkMode ? logoDark : logoLight}
              alt="Coviamuro Logo"
              width={195}
              height={65}
            />
            <div className="space-y-4 mt-3">
              <div className="relative">
                <button
                  onClick={() => handleSelection(43)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                    selectedOption === 43 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaHouseUser className="mr-2 text-2xl" />{" "}
                    <span className="text-base">Ver Cooperativa</span>
                  </div>
                </button>

                <button
                  onClick={() => toggleDropdown(1)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                    openDropdown === 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaUserShield className="mr-2 text-2xl" />{" "}
                    <span className="text-base">Agregar Entidades</span>
                  </div>
                  <span
                    className="transform transition-transform duration-200 text-1xl"
                    style={{
                      transform:
                        openDropdown === 1 ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openDropdown === 1 && (
                  <div className="mt-2 space-y-2 ml-4">
                    <button
                      onClick={() => handleSelection(2)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 2 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaHouseUser className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Vivienda</span>
                    </button>
                    <button
                      onClick={() => handleSelection(3)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 3 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUserPlus className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Socio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(7)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 7 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUserPlus className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Suplente</span>
                    </button>
                    <button
                      onClick={() => handleSelection(16)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 16 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaHandHoldingUsd className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Subsidio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(18)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 18 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileAlt className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Convenio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(13)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 13 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUser className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Usuario</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Segundo desplegable */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(2)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                    openDropdown === 2 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaChartLine className="mr-2 text-2xl" />{" "}
                    <span className="text-base">Opciones Adicionales</span>
                  </div>
                  <span
                    className="transform transition-transform duration-200 text-1xl"
                    style={{
                      transform:
                        openDropdown === 2 ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openDropdown === 2 && (
                  <div className="mt-2 space-y-2 ml-4">
                    <button
                      onClick={() => handleSelection(8)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 8 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaBell className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Generar Aviso</span>
                    </button>
                    <button
                      onClick={() => handleSelection(22)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 22 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBillWave className="mr-2 text-2xl" />
                      <span className="text-base">Declarar Ingreso</span>
                    </button>

                    <button
                      onClick={() => handleSelection(24)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 24 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBill className="mr-2 text-2xl" />
                      <span className="text-base">Declarar Egreso</span>
                    </button>

                    <button
                      onClick={() => handleSelection(34)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 34 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileSignature className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Informe Interes Anual</span>
                    </button>
                    <button
                      onClick={() => handleSelection(31)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 31 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaRegNewspaper className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Reajuste Anual</span>
                    </button>
                    <button
                      onClick={() => handleSelection(33)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 33 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileInvoice className="mr-2 text-2xl" />{" "}
                      <span className="text-base">
                        Agregar Estados Contables
                      </span>
                    </button>
                    <button
                      onClick={() => handleSelection(32)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 32 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileSignature className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Balance Anual</span>
                    </button>
                    <button
                      onClick={() => handleSelection(46)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 46 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileSignature className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar devolucion</span>
                    </button>
                    <button
                      onClick={() => handleSelection(49)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 49 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileSignature className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Agregar Recargo</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(3)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                    openDropdown === 3 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaClipboardList className="mr-2 text-2xl" />{" "}
                    <span className="text-base">Listados Adicionales</span>
                  </div>
                  <span
                    className="transform transition-transform duration-200 text-1xl"
                    style={{
                      transform:
                        openDropdown === 3 ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openDropdown === 3 && (
                  <div className="mt-2 space-y-2 ml-4">
                    <button
                      onClick={() => handleSelection(35)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 35 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileInvoice className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Estados Contables</span>
                    </button>
                    <button
                      onClick={() => handleSelection(41)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 41 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaRegNewspaper className="mr-2 text-2xl" />
                      <span className="text-base">Interes Anual</span>
                    </button>

                    <button
                      onClick={() => handleSelection(42)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 42 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileSignature className="mr-2 text-2xl" />
                      <span className="text-base">Balance Anual</span>
                    </button>

                    <button
                      onClick={() => handleSelection(20)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 20 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBill className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Listado Ingresos</span>
                    </button>
                    <button
                      onClick={() => handleSelection(21)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 21 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBill className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Listado Egresos</span>
                    </button>
                    <button
                      onClick={() => handleSelection(47)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 47 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBill className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Listado Devoluciones</span>
                    </button>
                    <button
                      onClick={() => handleSelection(50)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                        selectedOption === 50 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaMoneyBill className="mr-2 text-2xl" />{" "}
                      <span className="text-base">Listado Recargos</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-gray-600 dark:text-gray-400 w-full lg:w-auto">
        <Menu
          as="div"
          className="relative inline-block text-left justify-end mx-4 my-2"
        >
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold dark:text-gray-300 text-gray-900 shadow-sm border dark:border-gray-600 border-gray-200">
              <span className="relative flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {initial}
              </span>
              <span className="ml-2 md:text-xs  text-dark dark:text-white self-center">
                {miembroUsername}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 ml-1 flex-shrink-0"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
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
                  onClick={handlePressCerrarSesion}
                  className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                >
                  Cerrar Sesion
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
