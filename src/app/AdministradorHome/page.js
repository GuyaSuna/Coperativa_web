"use client";
import Link from "next/link";
import React, { useContext , useState, useEffect } from "react";
import { getAllSocios } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import logo from "../../../public/LogoApp.jpg";
import Image from "next/image";
import ListadoSocio from "@/Components/Listados/ListadoSocios/ListadoSocio";

const AdminHome = () => {
  const { miembro , cooperativa } = useContext(MiembroContext);
  console.log(miembro);
  console.log('Cooperativa:', cooperativa);
  const [socios, setSocios] = useState([]);

  

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      const response = await getAllSocios();
      setSocios(response);
      console.log('SOCIOS',response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
      <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
        <div className="h-16 text-blue-500 flex items-center justify-center m-2">
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
      </div>
      <div className="flex-grow overflow-hidden h-full flex flex-col">
        <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
          <div className="flex h-full text-gray-600 dark:text-gray-400">
            <Link
              href="../ViviendaForm"
              className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8"
            >
              Agregar Viviendas
            </Link>
            <Link
              href="../SocioForm"
              className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex mr-8 items-center"
            >
              Agregar Socios
            </Link>
            <a
              href="#"
              className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center mr-8"
            >
              Crear Usuario
            </a>
            <a
              href="#"
              className="cursor-pointer h-full hover:border-b-2  hover:border-blue-500 hover:text-blue-500 text-white border-white inline-flex items-center"
            >
              Generar Recibo
            </a>
          </div>
          <div className="ml-auto flex items-center space-x-7">
            <Link
              href={"/page"}
              className="h-6 px-3 items-center rounded-md shadow text-white bg-blue-500 hover:bg-black"
            >
              Cerrar Sesion
            </Link>
            <button className="flex items-center">
              <span className="relative flex-shrink-0">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  alt="profile"
                />
                <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900" />
              </span>
              <span className="ml-2">Carlitos Silvestri</span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 ml-1 flex-shrink-0"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
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
              {socios.map(socio => (
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
                  <div className="ml-auto text-xs text-gray-500">${socio.capitalSocio}</div>
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
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 text-white border-white pb-1.5"
                >
                  Socios
                </a>
                <a
                  href="#"
                  className="px-3 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 text-white border-white pb-1.5"
                >
                  Viviendas
                </a>
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
            <ListadoSocio/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
