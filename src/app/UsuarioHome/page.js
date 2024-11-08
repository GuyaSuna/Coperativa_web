"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { getAllSocios, getUr } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import Footer from "@/Components/footer";
import Cargando from "@/Components/Cargando";
import SidebarUsuario from "@/Components/SidebarUsuario";
import ComponentesOrganizados from "@/Components/ComponentesOrganizados";
import HeaderUsuario from "@/Components/headerUsuario";

const UsuarioHome = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [ur, setUr] = useState([]);
  const [identificadorComponente, setIdentificadorComponente] = useState(37);
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setIdentificadorComponente(option);
    setSelectedOption(option);
  };

  useEffect(() => {
    if (!miembro || !cooperativa) {
      router.push("/");
    }
  }, [miembro, cooperativa]);

  useEffect(() => {
    fetchUr();
  }, []);

  const fetchUr = async () => {
    try {
      const response = await getUr();
      const fechaActual = new Date();
      let mesActual = fechaActual.getMonth();
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
      let mesActualNombre = meses[mesActual];
      let urEncontrado = false;

      response.forEach((element) => {
        if (element.mes === mesActualNombre) {
          setUr(element?.valorUr);
          urEncontrado = true;
        }
      });

      if (!urEncontrado) {
        let mesAnterior = mesActual - 1;
        if (mesAnterior < 0) mesAnterior = 11;
        let mesAnteriorNombre = meses[mesAnterior];
        response.forEach((element) => {
          if (element.mes === mesAnteriorNombre) {
            setUr(element?.valorUr);
          }
        });
      }
    } catch (error) {
      console.error("Error al obtener las unidades reajustables:", error);
    }
  };

  return (
    <>
      {cooperativa && (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-white min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
            <HeaderUsuario
              setIdentificadorComponente={setIdentificadorComponente}
            />
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
              <SidebarUsuario
                setIdentificadorComponente={setIdentificadorComponente}
                className="w-full md:w-1/4 lg:w-1/5"
              />
              <ComponentesOrganizados
                identificador={identificadorComponente}
                setCedulaSocio={setCedulaSocio}
                cedulaSocio={cedulaSocio}
                setIdentificadorComponente={setIdentificadorComponente}
                ur={ur}
              />
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>
      )}
      {!cooperativa && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Cargando />
          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="bg-red-500 text-white font-bold uppercase text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UsuarioHome;
