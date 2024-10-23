"use client";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import DatosUsuario from "@/Components/UsuarioDashboard/DatosUsuario";
import ListadoRecibosSocios from "@/Components/UsuarioDashboard/ListadoRecibosSocio";
import DatosVivienda from "@/Components/UsuarioDashboard/DatosVivienda";

const UsuarioDashboard = () => {
  return (
    <Box display="flex">
      <Box flexGrow={1} p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <DatosUsuario />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatosVivienda />
          </Grid>
          <Grid item xs={12}>
            <ListadoRecibosSocios />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UsuarioDashboard;
