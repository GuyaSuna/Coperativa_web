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
import Cargando from "@/Components/Cargando";
import SidebarUsuario from "@/Components/SidebarUsuario";

const UsuarioHome = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [ur, setUr] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(0);
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
  };
  useEffect(() => {
    console.log("Entra maistro?");
    if (!miembro || !cooperativa) {
      console.log("es esto");
      router.push("/");
    }
  }, []);

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

  return (
    <>
      {cooperativa && (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
            <Header setIdentificadorComponente={setIdentificadorComponente} />
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
              <SidebarUsuario
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
                  <div className="flex-initial items-center space-x-3 md:space-x-6 sm:space-x-6 sm:mt-7 mt-4"></div>
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

export default UsuarioHome;
