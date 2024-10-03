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
} from "react-icons/fa";
import { useTheme } from "../Provider/ThemeProvider"; // Importar el contexto de tema

const Header = ({ setIdentificadorComponente }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [miembroUsername, setMiembroUsername] = useState("");
  const { miembro, logoutMiembro } = useContext(MiembroContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSecondDropdown, setOpenSecondDropdown] = useState(null); // Estado para el segundo dropdown

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

  return (
    <header className="h-16 flex justify-start w-full border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 z-50 relative">
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
          <div className="flex flex-col h-full p-4">
            <Image
              className="logo-Img hover:scale-90 transform duration-700"
              src={darkMode ? logoDark : logoLight}
              alt="Coviamuro Logo"
              width={195}
              height={65}
            />
            <div className="space-y-4 mt-3">
              {/* Sección de botones del sidebar */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(1)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                    openDropdown === 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaUserShield className="mr-2 text-2xl" />
                    <span className="text-base">Agregar Entidades</span>
                  </div>
                  <span
                    className="transform transition-transform duration-200 text-1xl"
                    style={{
                      transform: openDropdown === 1 ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openDropdown === 1 && (
                  <div className="mt-2 space-y-2 ml-4">
                    <button
                      onClick={() => handleSelection(2)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 2 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaHouseUser className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Vivienda</span>
                    </button>
                    <button
                      onClick={() => handleSelection(3)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 3 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUserPlus className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Socio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(7)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 7 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUserPlus className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Suplente</span>
                    </button>
                    <button
                      onClick={() => handleSelection(16)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 16 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaHandHoldingUsd className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Subsidio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(18)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 18 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileAlt className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Convenio</span>
                    </button>
                    <button
                      onClick={() => handleSelection(13)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 13 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUser className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Usuario</span>
                    </button>
                    
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleSecondDropdown}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                    openSecondDropdown ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                  <FaChartLine className="mr-2 text-2xl" />{" "}
                    <span className="text-base">Opciones Adicionales</span>
                  </div>
                  <span
                    className="transform transition-transform duration-200 text-1xl"
                    style={{
                      transform: openSecondDropdown ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openSecondDropdown && (
                  <div className="mt-2 space-y-2 ml-4">
                    <button
                      onClick={() => handleSelection(33)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 33 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaFileInvoice className="mr-2 text-2xl" />
                      <span className="text-base">Agregar Estados Contables</span>
                    </button>
                    <button
                      onClick={() => handleSelection(8)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 8 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaBell className="mr-2 text-2xl" />
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
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
