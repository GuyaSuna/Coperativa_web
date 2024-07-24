"use client";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [administrador, setAdministrador] = useState("");
  const { miembro } = useContext(MiembroContext);

  console.log(miembro);

  useEffect(() => {
    if (miembro && miembro.email) {
      setAdministrador(miembro.email);
    }
  }, [miembro]);
  console.log("Este es el administrador: " + administrador);
  return (
    <header className="h-16 flex w-full border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10 z-50 ">
      <div className="flex h-full text-gray-600 dark:text-gray-400 w-full lg:w-auto">
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
        <div
          className={`lg:flex h-full flex-col lg:flex-row lg:items-center  ${
            menuOpen ? "grid z-50 translate-y-0 " : "hidden -translate-y-full  "
          } w-full lg:w-auto lg:translate-y-0 lg:bg-transparent z-50`}
        >
          <button
            onClick={() => setIdentificadorComponente(2)}
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Agregar Viviendas
          </button>
          <button
            onClick={() => setIdentificadorComponente(3)}
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black  border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Agregar Socios
          </button>
          <a
            href="#"
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Crear Usuario
          </a>
          <a
            href="#"
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Generar Recibo
          </a>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4 lg:space-x-7">
        <Link
          href={"/"}
          className="h-auto w-auto px-3 self-center rounded-md shadow text-white bg-blue-500 hover:bg-black"
        >
          Cerrar Sesion
        </Link>
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
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
