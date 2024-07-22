"use client";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";

import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Sidebar from "@/Components/sidebar";
import Header from "@/Components/header";

const AdminHome = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  console.log(miembro);
  console.log("Cooperativa:", cooperativa);
  const [socios, setSocios] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      const response = await getAllSocios();
      setSocios(response);
      console.log("SOCIOS", response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
        <Sidebar />
      </div>
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <Header />
        <div className="flex-grow flex overflow-x-hidden">
          <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
            <div className="text-xs text-gray-400 tracking-wider">SOCIOS</div>
            <div className="relative mt-2">
              <input
                type="text"
                className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
                placeholder="Search"
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
            <div className="space-y-4 mt-3">
              {socios.map((socio) => (
                <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow hover:ring-2 hover:ring-blue-500 focus:outline-none">
                  <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50"
                      className="w-7 h-7 mr-2 rounded-full"
                      alt="profile"
                    />
                    {socio.nombreSocio}
                  </div>
                  <div className="flex items-center w-full">
                    <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">
                      Capital
                    </div>
                    <div className="ml-auto text-xs text-gray-500">
                      ${socio.capitalSocio}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
              <div className="flex w-full items-center">
                <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                  <img
                    src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    className="w-12 mr-4 rounded-full"
                    alt="profile"
                  />
                  Carlitos Silvestri - Tesorero
                </div>
                <div className="ml-auto sm:flex hidden items-center justify-end">
                  <div className="text-right">
                    {/* <div className="text-xs text-gray-400 dark:text-gray-400">
                      Account balance:
                    </div>
                    <div className="text-gray-900 text-lg dark:text-white">
                      $2,794.00
                    </div> */}
                  </div>
                  <button className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={19} cy={12} r={1} />
                      <circle cx={5} cy={12} r={1} />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                <button
                  onClick={() => setIdentificadorComponente(0)}
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8"
                >
                  Socios
                </button>
                <button
                  onClick={() => setIdentificadorComponente(1)}
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8"
                >
                  Viviendas
                </button>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 text-white border-white pb-1.5 sm:block hidden"
                >
                  Recibos
                </a>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 text-white border-white  pb-1.5 sm:block hidden"
                >
                  Suplentes
                </a>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 text-white border-white  pb-1.5 sm:block hidden"
                >
                  Informes
                </a>
              </div>
            </div>
            <ComponentesOrganizados identificador={identificadorComponente} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
