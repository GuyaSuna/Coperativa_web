"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const ListadoLateralMaster = ({ setIdentificadorComponente }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIdentificadorComponente(option);
  };

  return (
    <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark">
      <div className="space-y-4 mt-3">
        <button
          onClick={() => handleSelection(28)}
          className={`w-full py-2 px-4 rounded-md text-left font-semibold dark:text-white text-black hover:bg-blue-100 dark:hover:bg-blue-900 ${
            selectedOption === 28 ? "bg-blue-500 text-white" : ""
          }`}
        >
          Agregar Cooperativas
        </button>
      </div>
    </div>
  );
};

export default ListadoLateralMaster;
