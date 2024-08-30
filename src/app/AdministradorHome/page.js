"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios, getUr } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Header from "@/Components/header";
import ListadoLateral from "@/Components/ListadoLateral";
import Footer from "@/Components/footer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cargando from "@/Components/Cargando";
import Sidebar from "@/Components/Sidebar";

const AdminHome = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [ur, setUr] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
  };

  useEffect(() => {
    if (miembro && cooperativa) {
      setIsLoading(false); 
    } else {
      console.log("Datos del Provider no están disponibles");
      router.push("/");
    }
  }, [miembro?.idMiembro, cooperativa?.idCooperativa]);

  useEffect(() => {
    fetchUr();
  }, []);

  const fetchUr = async () => {
    try {
      const response = await getUr();
      setUr(response);
      console.log("Unidades Reajustables", response);
    } catch (error) {
      console.error("Error al obtener las unidades reajustables:", error);
    }
  };

  if (isLoading) {
    return <Cargando />;
  }

  return (
    <>
      {cooperativa && (
        <div className="bg-gray-100 dark:bg-dark dark:text-white text-gray-600 min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
            <Header setIdentificadorComponente={setIdentificadorComponente} />
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
              <ListadoLateral
                setIdentificadorComponente={setIdentificadorComponente}
                className="w-full md:w-1/4 lg:w-1/5"
              />

              <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto ">
                <div className="px-4 sm:px-7 pt-4 sm:pt-7 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                  <div className="flex w-full items-center flex-wrap">
                    <div className="flex items-center text-xl sm:text-2xl text-gray-900 dark:text-white">
                      <img
                        src="./LogoApp.jpg"
                        className="w-10 sm:w-12 md:w-16 lg:w-20 mr-4 rounded-full"
                        alt="profile"
                      />
                      <a className="text-sm sm:text-base md:text-lg lg:text-xl">
                        {cooperativa?.nombre} - {miembro?.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex-initial items-center space-x-3 md:space-x-6 sm:space-x-6 sm:mt-7 mt-4">
                    <button
                      onClick={() => {
                        setIdentificadorComponente(0);
                        handleSelection(0);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 0
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Socios
                    </button>
                    <button
                      onClick={() => {
                        setIdentificadorComponente(1, setCedulaSocio);
                        handleSelection(1);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 1
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Viviendas
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(11);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 11
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Recibos
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(9);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 9
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Suplentes
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(15);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 15
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Informes
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(12);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 12
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Usuarios
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(14);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 14
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Calculos
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(17);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 17
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Subsidios
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(20);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 20
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Ingresos
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(21);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 21
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Egresos
                    </button>
                    <button
                      onClick={() => {
                        handleSelection(26);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 26
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Convenios
                    </button>
                  </div>
                </div>
                <ComponentesOrganizados
                  identificador={identificadorComponente}
                  setCedulaSocio={setCedulaSocio}
                  cedulaSocio={cedulaSocio}
                  setIdentificadorComponente={setIdentificadorComponente}
                  ur={ur}
                />
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>
      )}
      {!cooperativa && <Cargando />}
    </>
  );
};

export default AdminHome;
