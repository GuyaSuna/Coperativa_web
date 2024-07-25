"use client";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Header from "@/Components/header";
import ListadoLateral from "@/Components/ListadoLateral";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/footer";

const AdminHome = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  console.log(miembro);
  console.log("Cooperativa:", cooperativa);
  const [socios, setSocios] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [cedulaSocio, setCedulaSocio] = useState(0);

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
          <ListadoLateral />
          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
              <div className="flex w-full items-center">
                <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                  <img
                    src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    className="w-12 mr-4 rounded-full"
                    alt="profile"
                  />
                  {cooperativa.nombre} - {miembro.email}
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
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Socios
                </button>
                <button
                  onClick={() => setIdentificadorComponente(1, setCedulaSocio)}
                  className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center mr-8"
                >
                  Viviendas
                </button>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white pb-1.5 sm:block hidden"
                >
                  Recibos
                </a>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white  pb-1.5 sm:block hidden"
                >
                  Suplentes
                </a>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white  pb-1.5 sm:block hidden"
                >
                  Informes
                </a>
              </div>
            </div>
            <ComponentesOrganizados
              identificador={identificadorComponente}
              setCedulaSocio={setCedulaSocio}
              cedulaSocio={cedulaSocio}
              setIdentificadorComponente={setIdentificadorComponente}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AdminHome;
