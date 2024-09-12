"use client";
import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { MiembroContext } from "@/Provider/provider";
import { getSocio, getViviendaPorSocio } from "@/Api/api";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CardMedia from "@mui/material/CardMedia";

const DatosVivienda = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [datoVivienda, setDatoVivienda] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");
  const theme = useTheme();
  useEffect(() => {
    setCedulaSocio(miembro.responseBody.socio.cedulaSocio);
  }, []);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getViviendaPorSocio(
          miembro.responseBody.socio.cedulaSocio
        );
        setDatoVivienda(data);
        console.log("Respuesta get vivienda", data);
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);

  return (
    <Card sx={{ display: "flex", height: 250, width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent
          sx={{ flex: "1 0 auto" }}
          className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
        >
          <Typography variant="h5" component="div" pb={3}>
            Datos de la vivienda
          </Typography>
          <Typography variant="body1">
            Nro Vivienda: {datoVivienda.nroVivienda}
          </Typography>
          <Divider />
          <Typography variant="body1">
            Cantidad Dormitorios: {datoVivienda.cantidadDormitorios}
          </Typography>
          <Divider />
          <Typography variant="body1">
            Valor de la Vivienda {datoVivienda.valorVivienda}
          </Typography>
          <Divider />
        </CardContent>
      </Box>

      <CardMedia
        component="img"
        sx={{ width: 200, height: "100%" }}
        image="/vivienda.webp"
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default DatosVivienda;
