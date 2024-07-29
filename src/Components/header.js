"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider";
import ThemeToggle from "./ThemeToggle";
import logo from "../../public/logovisoft.png";
import Image from "next/image";

const Header = ({ setIdentificadorComponente }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [administrador, setAdministrador] = useState("");
  const { miembro } = useContext(MiembroContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
    setMenuOpen(false); // Cerrar el menú al seleccionar una opción
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (miembro && miembro.email) {
      setAdministrador(miembro.email);
    }
  }, [miembro]);

  return (
    <header className="h-16 flex justify-start w-full border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 z-50 relative">
      <div className="h-full flex text-gray-600 dark:text-gray-400 w-full lg:w-auto">
        <Image
          className="logo-Img hover:scale-90 transform duration-700"
          src={logo}
          alt="Coviamuro Logo"
          width={65}
          height={65}
        />
      </div>
      <div className="ml-auto flex items-center space-x-4 lg:space-x-7">
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
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={handleCloseMenu}
          />
        )}
        <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 z-50 transition-opacity duration-300 ease-in-out ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:hidden`}
          style={{ width: '250px' }} // Ajusta el ancho según sea necesario
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo en la parte superior */}
            <div className="flex justify-center mb-4">
              <Image
                src={logo}
                alt="Coviamuro Logo"
                width={50}
                height={50}
              />
            </div>
            {/* Botones del Sidebar */}
            <button
              onClick={() => handleSelection(2)}
              className={`cursor-pointer py-2 px-4 mb-2 text-center hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
                selectedOption === 2 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
            >
              Agregar Viviendas
            </button>
            <button
              onClick={() => handleSelection(4)}
              className={`cursor-pointer py-2 px-4 mb-2 text-center hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
                selectedOption === 4 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
            >
              Agregar Socios
            </button>
            <button
              onClick={() => handleSelection(6)}
              className={`cursor-pointer py-2 px-4 mb-2 text-center hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
                selectedOption === 6 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
            >
              Agregar Suplente
            </button>
            <a
              href="#"
              className={`cursor-pointer py-2 px-4 mb-2 text-center hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
                selectedOption === "Crear Usuario" ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => setSelectedOption("Crear Usuario")}
            >
              Crear Usuario
            </a>
            <a
              href="#"
              className={`cursor-pointer py-2 px-4 mb-2 text-center hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
                selectedOption === "Generar Recibo" ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => setSelectedOption("Generar Recibo")}
            >
              Generar Recibo
            </a>
          </div>
        </div>
        <div className="hidden lg:flex space-x-4">
          <button
            onClick={() => handleSelection(2)}
            className={`cursor-pointer py-2 px-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
              selectedOption === 2 ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
          >
            Agregar Viviendas
          </button>
          <button
            onClick={() => handleSelection(4)}
            className={`cursor-pointer py-2 px-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
              selectedOption === 4 ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
          >
            Agregar Socios
          </button>
          <button
            onClick={() => handleSelection(6)}
            className={`cursor-pointer py-2 px-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
              selectedOption === 6 ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
          >
            Agregar Suplente
          </button>
          <a
            href="#"
            className={`cursor-pointer py-2 px-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
              selectedOption === "Crear Usuario" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setSelectedOption("Crear Usuario")}
          >
            Crear Usuario
          </a>
          <a
            href="#"
            className={`cursor-pointer py-2 px-4 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-none transition duration-300 ${
              selectedOption === "Generar Recibo" ? "border-b-2 border-blue-500 text-blue-500" : ""
            }`}
            onClick={() => setSelectedOption("Generar Recibo")}
          >
            Generar Recibo
          </a>
        </div>
        <Menu as="div" className="relative inline-block text-left justify-end">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
              <span className="relative flex-shrink-0">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  alt="profile"
                />
                <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900" />
              </span>
              <span className="ml-2">{administrador}</span>
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
                  onClick={() => handleEliminar(socios.cedulaSocio)}
                  className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                >
                  Eliminar
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => handleModificar(socios.cedulaSocio)}
                  className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                >
                  Modificar
                </button>
              </MenuItem>
              <MenuItem>
                <Link
                  href={"/"}
                  className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                >
                  Cerrar Sesion
                </Link>
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
