import React from "react";

const Buscador = ({ value, onChange }) => {
  return (
    <div className="relative mt-2">
      <input
        type="text"
        className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <svg
        viewBox="0 0 24 24"
        className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={11} cy={11} r={8} />
        <line x1={21} y1={21} x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default Buscador;
