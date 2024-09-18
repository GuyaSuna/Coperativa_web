"use client";
import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "../Provider/ThemeProvider";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";

const ListadoLateral = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { darkMode } = useTheme();
  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark text-center">
      <Image
        className="logo-Img hover:scale-90 transform duration-700"
        src={darkMode ? logoLight : logoDark}
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

              <button
                onClick={() => handleSelection(7)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 7 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaUserTie className="mr-2 text-2xl" />{" "}
                <a className="text-base">Agregar Suplente</a>
              </button>
              <button
                onClick={() => handleSelection(16)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 16 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaHandHoldingUsd className="mr-2 text-2xl" />{" "}
                <a className="text-base">Agregar Subsidio</a>
              </button>
              <button
                onClick={() => handleSelection(18)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  selectedOption === 18 ? "bg-blue-500 text-white" : ""
                }`}
              >
                <FaHandHoldingUsd className="mr-2 text-2xl" />{" "}
                <a className="text-base">Agregar Convenio</a>
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
          <FaBell className="mr-2 text-2xl" />{" "}
          <a className="text-base">Generar Aviso</a>
        </button>
        <button
          onClick={() => handleSelection(22)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 22 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaMoneyBillWave className="mr-2 text-2xl" />
          <a className="text-base">Declarar Ingreso</a>
        </button>

        <button
          onClick={() => handleSelection(24)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 24 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaMoneyBill className="mr-2 text-2xl" />
          <a className="text-base">Declarar Egreso</a>
        </button>
        <button
          onClick={() => handleSelection(13)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 13 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUser className="mr-2 text-2xl" />{" "}
          <a className="text-base">Agregar Usuario</a>
        </button>
        <button
          onClick={() => handleSelection(18)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 18 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUser className="mr-2 text-2xl" />{" "}
          <a className="text-base">Agregar Convenio</a>
        </button>

        <button
          onClick={() => handleSelection(33)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 33 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUser className="mr-2 text-2xl" />{" "}
          <a className="text-base">Agregar EstadosCont.</a>
        </button>

        <button
          onClick={() => handleSelection(34)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 34 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUser className="mr-2 text-2xl" />{" "}
          <a className="text-base">Informe Interes Anual.</a>
        </button>
        <button
          onClick={() => handleSelection(31)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 31 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUser className="mr-2 text-2xl" />{" "}
          <a className="text-base">Resjuste Anual.</a>
        </button>
      </div>
    </div>
  );
};

export default ListadoLateral;
