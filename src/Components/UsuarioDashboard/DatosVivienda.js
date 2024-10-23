import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import { MiembroContext } from "@/Provider/provider";
import { getViviendaPorSocio } from "@/Api/api";

const DatosVivienda = () => {
  const { miembro } = useContext(MiembroContext);
  const [datoVivienda, setDatoVivienda] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");

  useEffect(() => {
    setCedulaSocio(miembro.responseBody.socio.cedulaSocio);
  }, [miembro]);

  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const data = await getViviendaPorSocio(cedulaSocio);
        setDatoVivienda(data);
      } catch (error) {
        console.error(
          `An error has occurred in fetchVivienda: ${error.message}`
        );
      }
    };

    if (cedulaSocio) {
      fetchVivienda();
    }
  }, [cedulaSocio]);

  return (
    <Card
      sx={{ display: "flex", height: "100%", width: "100%" }}
      className="bg-gray-900 dark:bg-white dark:text-black text-white"
    >
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
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
            Valor de la Vivienda: {datoVivienda.valorVivienda}
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
