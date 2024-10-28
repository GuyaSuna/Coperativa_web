"use client";
import React, { useState } from "react";
import { FaHome, FaUserShield } from "react-icons/fa";
import Image from "next/image";
import logoDark from "../../public/logoVisoftDark.png";
import logoLight from "../../public/logoVisoftLigth.png";

const SidebarUsuario = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r bg-gray-50 dark:bg-dark border-gray-800 dark:border-gray-200 overflow-y-auto lg:block hidden p-5">
      <Image
        priority
        className="hover:scale-90 transform duration-700"
        src={logoLight}
        alt="Coviamuro Logo"
        width={195}
        height={65}
      />

      <div className="space-y-4 mt-3">
        <button
          onClick={() => handleSelection(37)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center ${
            selectedOption === 37 ? "bg-blue-500 text-white" : "text-black dark:text-white"
          } hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-black dark:hover:text-white`}
        >
          <FaHome className="mr-2 text-2xl" />
          <span className="text-base">Inicio</span>
        </button>

        <button
          onClick={() => handleSelection(38)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center ${
            selectedOption === 38 ? "bg-blue-500 text-white" : "text-black dark:text-white"
          } hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-black dark:hover:text-white`}
        >
          <FaUserShield className="mr-2 text-2xl" />
          <span className="text-base">Ver informes</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarUsuario;
