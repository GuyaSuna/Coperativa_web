"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import {
  FaHome,
  FaUserPlus,
  FaUserTie,
  FaUserShield,
  FaBell,
  FaHandHoldingUsd,
  FaMoneyBillWave,
  FaMoneyBill,
} from "react-icons/fa";

const ListadoLateral = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark">
      <div className="space-y-4 mt-3">
        <div className="relative">
          <button
            onClick={() => toggleDropdown(1)}
            className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
              openDropdown === 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            <div className="flex items-center">
              <FaUserShield className="mr-2" /> Agregar Entidades
            </div>
            <span
              className="transform transition-transform duration-200"
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
                <FaHome className="mr-2" /> Agregar Viviendas
              </button>
              <button
                onClick={() => handleSelection(3)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 3 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaUserPlus className="mr-2" /> Agregar Socios
              </button>

              <button
                onClick={() => handleSelection(7)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 7 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaUserTie className="mr-2" /> Agregar Suplente
              </button>
              <button
                onClick={() => handleSelection(16)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 16 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaHandHoldingUsd className="mr-2" /> Agregar Subsidio
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => handleSelection(8)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 8 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaBell className="mr-2" /> Generar Aviso
        </button>
        <button
          onClick={() => handleSelection(22)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 22 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaMoneyBillWave className="mr-2" /> Declarar Ingreso
        </button>

        <button
          onClick={() => handleSelection(24)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 24 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaMoneyBill className="mr-2" /> Declarar Egreso
        </button>
      </div>
    </div>
  );
};

export default ListadoLateral;
