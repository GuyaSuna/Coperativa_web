import React, { useState } from "react";
import logo from "../../public/logovisoft.png";
import Image from "next/image";

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    // <sidebar>
    //   <div className="h-16 bg-white  rounded-full text-blue-500 flex items-center justify-center m-2">
    //     <Image
    //       className="logo-Img "
    //       src={logo}
    //       alt="Coviamuro Logo"
    //       width={65}
    //       height={65}
    //     />
    //   </div>
    //   <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
    //     <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="h-5"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    //         <polyline points="9 22 9 12 15 12 15 22" />
    //       </svg>
    //     </button>
    //     <button className="h-10 w-12 dark:text-gray-300  rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="h-5"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
    //         <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    //       </svg>
    //     </button>
    //     <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="h-5"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    //         <line x1={12} y1={11} x2={12} y2={17} />
    //         <line x1={9} y1={14} x2={15} y2={14} />
    //       </svg>
    //     </button>
    //     <button className="h-10 w-12 dark:text-gray-300 rounded-md flex items-center justify-center hover:bg-blue-100 hover:text-blue-500">
    //       <svg
    //         viewBox="0 0 24 24"
    //         className="h-5"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         <rect x={3} y={3} width={7} height={7} />
    //         <rect x={14} y={3} width={7} height={7} />
    //         <rect x={14} y={14} width={7} height={7} />
    //         <rect x={3} y={14} width={7} height={7} />
    //       </svg>
    //     </button>
    //   </div>
    // </sidebar>
    <sidebar>
      <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5 bg-gray-50 dark:bg-dark">
        <span
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onclick={toggleSidebar}
        >
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
        </span>
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600" />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                TailwindCSS
              </h1>
              <i
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                onclick="openSidebar()"
              />
            </div>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i className="bi bi-search text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Home
            </span>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-bookmark-fill" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Bookmark
            </span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]" />
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onclick={toggleDropdown}
          >
            <i className="bi bi-chat-left-text-fill" />
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Chatbox
              </span>
              <span className="text-sm rotate-180" id="arrow">
                <i className="bi bi-chevron-down" />
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Social
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Personal
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Friends
            </h1>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-box-arrow-in-right" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>
      </div>
    </sidebar>
  );
};

export default Sidebar;
