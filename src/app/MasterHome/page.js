"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios, getUr } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import Header from "@/Components/header";
import ListadoLateralMaster from "@/Components/ListadoLateralMaster";
import Footer from "@/Components/footer";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cargando from "@/Components/Cargando";

const AdminHome = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [ur, setUr] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(27);
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
  };

  useEffect(() => {
    if(miembro == null){
      router.push("/");
    }
    fetchUr();
  }, []);

  const fetchUr = async () => {
    try {
      const response = await getUr();
      setUr(response);
    } catch (error) {
      console.error("Error al obtener las unidades reajustables:", error);
    }
  };

  return (
    <>
        <div className="bg-gray-100 dark:bg-dark dark:text-white text-gray-600 min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
        
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
              <ListadoLateralMaster
                setIdentificadorComponente={setIdentificadorComponente}
                className="w-full md:w-1/4 lg:w-1/5"
              />
              <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto ">
                <div className="px-4 sm:px-7 pt-4 sm:pt-7 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                  <div className="flex-initial items-center space-x-3 md:space-x-6 sm:space-x-6 sm:mt-7 mt-4">
                    <button
                      onClick={() => {
                        setIdentificadorComponente(27);
                        handleSelection(27);
                      }}
                      className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                        selectedOption === 27
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : ""
                      }`}
                    >
                      Cooperativas
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
    </>
  );
};

export default AdminHome;
