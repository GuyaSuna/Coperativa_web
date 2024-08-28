"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const ListadoLateral = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark">
      <div className="space-y-4 mt-3">
        <button
          onClick={() => handleSelection(2)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 2 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Viviendas
        </button>
        <button
          onClick={() => handleSelection(3)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 3 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Socios
        </button>
        <button
          onClick={() => handleSelection(7)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 7 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Suplente
        </button>
        <button
          onClick={() => handleSelection(13)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 13 ? "bg-blue-500 text-white" : ""
          }`}
          // onClick={() => handleSelection(5)}
        >
          Crear Usuario
        </button>
        <button
          onClick={() => handleSelection(8)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 8 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Generar Aviso
        </button>
        <button
          onClick={() => handleSelection(16)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 16 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Subsidio
        </button>
        <button
          onClick={() => handleSelection(22)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 22 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Ingreso
        </button>

        <button
          onClick={() => handleSelection(24)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 24 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Egreso
        </button>
      </div>
    </div>
  );
};

export default ListadoLateral;
