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
import { Grid, Box } from "@mui/material";
import DatosUsuario from "@/Components/UsuarioDashboard/DatosUsuario";
import ListadoRecibosSocios from "@/Components/UsuarioDashboard/ListadoRecibosSocio";

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
        <div className="bg-gray-900 dark:bg-gray-100 dark:text-white text-gray-600 min-h-screen flex flex-col text-sm">
          <div className="flex-grow overflow-hidden flex flex-col">
            <Header setIdentificadorComponente={setIdentificadorComponente} />
            <div className="flex-grow overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
              <SidebarUsuario
                setIdentificadorComponente={setIdentificadorComponente}
                className="w-full md:w-1/4 lg:w-1/5"
              />

              <Grid container spacing={3} p={4}>
                <Grid item xs={8} lg={8}>
                  <DatosUsuario />
                </Grid>
                <Grid item xs={8} lg={8}>
                  <ListadoRecibosSocios />
                </Grid>
              </Grid>
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
