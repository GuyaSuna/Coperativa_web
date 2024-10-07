"use client";
import React from "react";
import { Grid } from "@mui/material";
import DatosUsuario from "@/Components/UsuarioDashboard/DatosUsuario";
import ListadoRecibosSocios from "@/Components/UsuarioDashboard/ListadoRecibosSocio";
import DatosVivienda from "@/Components/UsuarioDashboard/DatosVivienda";

const UsuarioDashboard = () => {
  return (
    <Grid 
      container 
      spacing={1} 
      p={2} 
      className="dark:bg-gray-900 bg-white text-black dark:text-white"
    >
      <Grid item xs={12} md={6}>
        <DatosUsuario />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatosVivienda />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <ListadoRecibosSocios />
      </Grid>
    </Grid>
  );
};

export default UsuarioDashboard;
