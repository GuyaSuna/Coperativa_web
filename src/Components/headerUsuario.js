"use client";
import React, { useState, useContext, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider";
import ThemeToggle from "./ThemeToggle";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";
import Image from "next/image";
import { getAllAvisosPorUsuario } from "@/Api/api";
import { useRouter } from "next/navigation";
import { FaHome, FaUserPlus, FaUserShield, FaBell } from "react-icons/fa";
import { useTheme } from "../Provider/ThemeProvider"; // Importar el contexto de tema

const HeaderUsuario = ({ setIdentificadorComponente }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [miembroUsername, setMiembroUsername] = useState("");
  const { miembro, logoutMiembro } = useContext(MiembroContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [avisos, setAvisos] = useState([]); // Estado para manejar los avisos
  const [mostrarAvisos, setMostrarAvisos] = useState(false); // Controla si se muestra el menú de avisos

  // Acceder al estado del tema
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchAvisos();
  }, []);

  const fetchAvisos = async () => {
    const response = await getAllAvisosPorUsuario(miembro.responseBody.id);
    setAvisos(response);
  };
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
    // Aquí podrías cargar los avisos desde tu API si es necesario
  }, [miembro]);

  const handlePressCerrarSesion = () => {
    logoutMiembro();
    router.push("/");
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleAvisos = () => {
    setMostrarAvisos(!mostrarAvisos); // Alternar el estado de mostrar avisos
  };

  // Obtener la inicial del nombre
  const initial = miembroUsername.charAt(0).toUpperCase();
  const handleModificar = () => {
    setIdentificadorComponente(45);
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
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(1)}
                  className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                    openDropdown === 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaUserShield className="mr-2 text-2xl" />{" "}
                    <a className="text-base">Agregar Entidades</a>
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
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 2 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaHome className="mr-2 text-2xl" />{" "}
                      <a className="text-base">Agregar Vivienda</a>
                    </button>
                    <button
                      onClick={() => handleSelection(3)}
                      className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        selectedOption === 3 ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <FaUserPlus className="mr-2 text-2xl" />{" "}
                      <a className="text-base">Agregar Socio</a>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4 lg:space-x-7">
        {/* Campana de notificaciones */}
        <div className="relative">
          <button
            onClick={toggleAvisos}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <FaBell className="text-2xl" />
            {avisos.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {avisos.length}
              </span>
            )}
          </button>
          {mostrarAvisos && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-800 shadow-lg rounded-md z-10">
              <ul className="py-2">
                {avisos.map((aviso, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {aviso.mensaje}
                  </li>
                ))}
                {avisos.length === 0 && (
                  <li className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                    No hay avisos.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <Menu as="div" className="relative inline-block text-left justify-end">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold dark:text-gray-300 text-gray-900 shadow-sm border dark:border-gray-600 border-gray-200">
              <span className="relative flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {initial} {/* Muestra la inicial del nombre */}
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
                  onClick={() => handleModificar(miembro.responseBody)}
                  className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                >
                  Modificar
                </button>
              </MenuItem>
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

export default HeaderUsuario;
