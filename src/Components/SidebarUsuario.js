"use client";
import React, { useState } from "react";
import { FaHome, FaUserShield } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "../Provider/ThemeProvider";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";

const SidebarUsuario = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { darkMode } = useTheme();

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  return (
    <div
      className={`xl:w-72 w-48 flex-shrink-0 border-r  dark:bg-gray-50 bg-dark dark:border-gray-200 border-gray-800 overflow-y-auto lg:block hidden p-5`}
    >
      <Image
        key={darkMode ? "dark" : "light"}
        priority
        className="hover:scale-90 transform duration-700"
        src={darkMode ? logoDark : logoLight}
        alt="Coviamuro Logo"
        width={195}
        height={65}
      />

      <div className="space-y-4 mt-3">
        <button
          onClick={() => handleSelection(37)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center text-white dark:text-black dark:hover:bg-blue-900 dark:hover:text-white hover:bg-blue-100 hover:text-black  ${
            selectedOption === 38 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaHome className="mr-2 text-2xl" />{" "}
          <span className="text-base">Inicio</span>
        </button>

        <button
          onClick={() => handleSelection(38)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center text-white dark:text-black dark:hover:bg-blue-900 dark:hover:text-white hover:bg-blue-100 hover:text-black  ${
            selectedOption === 38 ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaUserShield className="mr-2 text-2xl" />{" "}
          <span className="text-base">Ver informes</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarUsuario;
