"use client";
import React, { useState } from "react";
import { FaHome, FaUserShield } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "../Provider/ThemeProvider";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";

const SidebarUsuario = ({ setIdentificadorComponente }) => {
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
    <div className="xl:w-72 w-48 flex-shrink-0 border-r dark:border-gray-800 border-gray-200 overflow-y-auto lg:block hidden p-5 bg-dark dark:bg-gray-50">
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
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-black text-white  hover:text-black hover:bg-blue-100  dark:hover:bg-blue-900 dark:hover:text-white ${
            selectedOption === 37 ? "bg-gray-300 text-white" : ""
          }`}
        >
          <FaHome className="mr-2" /> Inicio
        </button>
        <button
          onClick={() => handleSelection(38)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-black text-white  hover:text-black hover:bg-blue-100  dark:hover:bg-blue-900 dark:hover:text-white ${
            selectedOption === 38 ? "bg-gray-300 text-white" : ""
          }`}
        >
          <FaHome className="mr-2" /> Ver informes
        </button>
      </div>
    </div>
  );
};

export default SidebarUsuario;
