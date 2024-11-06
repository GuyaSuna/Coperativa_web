import React, { useState } from "react";
import { FaList } from "react-icons/fa";

export default function OrdenarPor({
  options,
  buttonText = "Ordenar por",
  onOptionSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10">
      <button
        type="button"
        onClick={handleToggleMenu}
        className="flex w-full md:w-auto items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <FaList className="mr-2 h-4 w-4 text-white" />
        {buttonText}
      </button>
  
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.icon && <span className="mr-3">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
}
