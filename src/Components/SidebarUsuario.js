import React, { useState } from "react";
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

const SidebarUsuario = ({ setIdentificadorComponente }) => {
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
    <div className="xl:w-72 w-48 flex-shrink-0 border-r dark:border-gray-800 border-gray-200 overflow-y-auto lg:block hidden p-5 bg-dark dark:bg-gray-50">
      <div className="space-y-4 mt-3">
        <button
          onClick={() => handleSelection(2)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center dark:text-black text-white hover:text-black hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:text-white ${
            selectedOption === 2 ? "bg-blue-900 text-white" : ""
          }`}
        >
          <FaHome className="mr-2" /> Ver informes
        </button>
        {/* Ejemplo con dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown(1)}
            className={`w-full py-2 px-4 rounded-md text-left font-semibold flex items-center justify-between dark:text-black text-white hover:text-black hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:text-white ${
              openDropdown === 1 ? "bg-blue-900 text-white" : ""
            }`}
          >
            <div className="flex items-center">
              <FaUserShield className="mr-2" /> Crear Usuario
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
                onClick={() => handleSelection(5)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-black text-white  hover:text-black hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:text-white ${
                  selectedOption === 4 ? "bg-blue-900 text-white" : ""
                }`}
              >
                Sub-Opción 1
              </button>
              <button
                onClick={() => handleSelection(5)}
                className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-black text-white hover:text-black hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:text-white ${
                  selectedOption === 5 ? "bg-blue-900 text-white" : ""
                }`}
              >
                Sub-Opción 2
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarUsuario;
