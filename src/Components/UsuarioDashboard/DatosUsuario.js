"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Alert,
} from "@mui/material";
import DashboardCard from "./DashboardCard";
import { MiembroContext } from "@/Provider/provider";
import { getSocio } from "@/Api/api";

const DatosUsuario = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [datosUsuario, setDatosUsuario] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");

  useEffect(() => {
    setCedulaSocio(miembro.socio.cedulaSocio);
  }, []);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(miembro.socio.cedulaSocio);
        setDatosUsuario(data);
        console.log("Respuesta get socio", data);
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);
  console.log("Los datos a mostrar", datosUsuario);

  return (
    <DashboardCard>
      <Card
        elevation={1}
        sx={{
          py: 0,
          overflow: "hidden",
          position: "relative",
          width: { xs: "280px", sm: "100%" },
        }}
      >
        <CardContent sx={{ px: "20px" }}>
          {datosUsuario && (
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item sm={5} display="flex" alignItems="center">
                <Box
                  sx={{
                    textAlign: {
                      xs: "center",
                      sm: "left",
                    },
                  }}
                >
                  <Typography variant="h3" component="div" pb={6}>
                    Hola de nuevo!
                  </Typography>
                  <Typography>
                    Nombre : {datosUsuario.nombreSocio}{" "}
                    {datosUsuario.apellidoSocio}
                  </Typography>
                  <Typography>C.I: {datosUsuario.cedulaSocio}</Typography>
                  <Typography>
                    Fecha Ingreso: {datosUsuario.fechaIngreso}
                  </Typography>
                  <Typography>Telefono: {datosUsuario.telefono}</Typography>
                  <Typography variant="h4" component="div" pt={4} pb={2}>
                    Datos del Suplente:
                  </Typography>
                  <Typography>
                    Nombre Suplente:{" "}
                    {datosUsuario.suplenteEntity.nombreSuplente}{" "}
                    {datosUsuario.suplenteEntity.apellidoSuplente}
                  </Typography>
                  <Typography>
                    C.I: {datosUsuario.suplenteEntity.cedulaSuplente}
                  </Typography>

                  <Typography>
                    Telefono: {datosUsuario.suplenteEntity.telefonoSuplente}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={5} justifyContent="end">
                <Box mb="-30px">
                  <Typography
                    variant="h6"
                    component="div"
                    pb={6}
                    textAlign="end"
                  >
                    Numero Socio: {datosUsuario.nroSocio}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </DashboardCard>
  );
};

export default DatosUsuario;
