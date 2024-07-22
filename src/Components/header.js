"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-16 flex w-full border-b border-gray-200 dark:border-gray-800 px-4 lg:px-10">
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
          } w-full lg:w-auto lg:translate-y-0 lg:bg-transparent bg-gray-800`}
        >
          <button
            onClick={() => setIdentificadorComponente(2)}
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Agregar Viviendas
          </button>
          <button
            onClick={() => setIdentificadorComponente(3)}
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Agregar Socios
          </button>
          <a
            href="#"
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Crear Usuario
          </a>
          <a
            href="#"
            className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8 mt-4 lg:mt-0"
          >
            Generar Recibo
          </a>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4 lg:space-x-7">
        <Link
          href={"/page"}
          className="h-6 px-3 items-center rounded-md shadow text-white bg-blue-500 hover:bg-black"
        >
          Cerrar Sesion
        </Link>
        <button className="flex items-center">
          <span className="relative flex-shrink-0">
            <img
              className="w-7 h-7 rounded-full"
              src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt="profile"
            />
            <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900" />
          </span>
          <span className="ml-2">Carlitos Silvestri</span>
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
        </button>
      </div>
    </header>
  );
};

export default Header;
