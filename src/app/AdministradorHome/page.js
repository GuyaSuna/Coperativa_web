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
  const [ur, setUr] = useState(0);
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
      console.log("RESPUESTA FRONT", response);

      const FechaActual = new Date();
      const mesActual = FechaActual.getMonth();

      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const mesActualNombre = meses[mesActual];
      console.log(`Mes actual: ${mesActualNombre}`);
      let valorUr = 0;
      response.forEach((dato) => {
        if (dato.month == mesActualNombre) {
          valorUr = dato.value;
        }
      });

      console.log("Valor UR encontrado:", valorUr);

      // Verificar si se encontró el valor para el mes actual
      if (valorUr) {
        setUr(valorUr);
        console.log("Unidades Reajustables para el mes actual", valorUr);
      } else {
        console.log(`No se encontró valor para el mes ${mesActualNombre}`);
      }
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
                        className="w-10 sm:w-12 md:w-16 lg:w-20 mr-4 rounded-full border-2 dark:bg-gray-500"
                        alt="profile"
                      />
                      <a className="text-sm sm:text-base md:text-lg lg:text-xl">
                        {cooperativa?.nombre} - {miembro?.email}
                      </a>
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap items-center justify-center md:justify-start space-x-3 md:space-x-6 mt-4 sm:mt-7">
                    {[
                      { label: "Socios", id: 0 },
                      { label: "Viviendas", id: 1 },
                      { label: "Recibos", id: 11 },
                      { label: "Suplentes", id: 9 },
                      { label: "Subsidios", id: 17 },
                      { label: "Convenios", id: 26 },
                      { label: "Socios Archivados", id: 32 },
                      { label: "Estados Contables", id: 35 },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIdentificadorComponente(item.id);
                          handleSelection(item.id);
                        }}
                        className={`cursor-pointer h-full hover:border-b-2 hover:border-blue-500 hover:text-blue-500 dark:text-white text-black border-white inline-flex items-center ${
                          selectedOption === item.id
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : ""
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
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
