"use client";
import React, { useState } from "react";
import Modal from "./Modal";
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
import Image from "next/image";
import { useTheme } from "../Provider/ThemeProvider";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";

const ListadoLateral = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSecondDropdown, setOpenSecondDropdown] = useState(null); // Nuevo estado para el segundo desplegable
  const { darkMode } = useTheme();

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSecondDropdown = () => {
    setOpenSecondDropdown(openSecondDropdown ? null : true); // Alterna el segundo desplegable
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark text-center">
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
              <button
                onClick={() => handleSelection(33)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
                  selectedOption === 33 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaFileInvoice className="mr-2 text-2xl" />{" "}
                <span className="text-base">Agregar Estados Contables</span>
              </button>
            </div>
          )}
        </div>

        {/* Segundo desplegable */}
        <div className="relative">
          <button
            onClick={toggleSecondDropdown}
            className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-white text-black hover:bg-blue-900 hover:text-white dark:hover:bg-blue-100 dark:hover:text-black  ${
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoLateral;
