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
      className={`xl:w-72 w-48 flex-shrink-0 border-r ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"} overflow-y-auto lg:block hidden p-5`}
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
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center ${darkMode ? "text-white hover:bg-blue-900" : "text-black hover:bg-blue-100"} ${selectedOption === 37 ? "bg-gray-300" : ""}`}
        >
          <FaHome className="mr-2" /> Inicio
        </button>
        <button
          onClick={() => handleSelection(38)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center ${darkMode ? "text-white hover:bg-blue-900" : "text-black hover:bg-blue-100"} ${selectedOption === 38 ? "bg-gray-300" : ""}`}
        >
          <FaUserShield className="mr-2" /> Ver informes
        </button>
      </div>
    </div>
  );
};

export default SidebarUsuario;
