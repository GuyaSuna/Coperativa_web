import React from "react";
import logo from "../../public/logovisoft.png";
import Image from "next/image";

const Sidebar = () => {
  return (
    <sidebar>
      <div className="h-16 bg-white  rounded-full text-blue-500 flex items-center justify-center m-2">
        <Image
          className="logo-Img "
          src={logo}
          alt="Coviamuro Logo"
          width={65}
          height={65}
        />
      </div>
      <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
        <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
        <button className="h-10 w-12 dark:text-gray-300  rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </button>
        <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <line x1={12} y1={11} x2={12} y2={17} />
            <line x1={9} y1={14} x2={15} y2={14} />
          </svg>
        </button>
        <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x={3} y={3} width={7} height={7} />
            <rect x={14} y={3} width={7} height={7} />
            <rect x={14} y={14} width={7} height={7} />
            <rect x={3} y={14} width={7} height={7} />
          </svg>
        </button>
      </div>
    </sidebar>
  );
};

export default Sidebar;
