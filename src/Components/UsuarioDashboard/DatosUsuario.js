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
          width: { xs: "100%", sm: "100%" }, // Full width on all screen sizes
          maxWidth: "600px", // Set a max-width if needed
          margin: "0 auto", // Center the card horizontally
        }}
      >
        <CardContent sx={{ px: { xs: "10px", sm: "20px" } }}>
          {datosUsuario && (
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item xs={12} sm={5} alignItems="center">
                <Box
                  sx={{
                    textAlign: {
                      xs: "center",
                      sm: "left",
                    },
                    width: "100%",
                  }}
                >
                  <Typography variant="h5" component="div" pb={3}>
                    ¡Hola de nuevo!
                  </Typography>
                  <Typography variant="body1">
                    Nombre: {datosUsuario.nombreSocio}{" "}
                    {datosUsuario.apellidoSocio}
                  </Typography>
                  <Typography variant="body1">
                    C.I: {datosUsuario.cedulaSocio}
                  </Typography>
                  <Typography variant="body1">
                    Fecha Ingreso: {datosUsuario.fechaIngreso}
                  </Typography>
                  <Typography variant="body1">
                    Teléfono: {datosUsuario.telefono}
                  </Typography>
                  {datosUsuario.suplenteEntity && (
                    <>
                      <Typography variant="h6" component="div" pt={4} pb={2}>
                        Datos del Suplente:
                      </Typography>
                      <Typography variant="body1">
                        Nombre Suplente:{" "}
                        {datosUsuario.suplenteEntity.nombreSuplente}{" "}
                        {datosUsuario.suplenteEntity.apellidoSuplente}
                      </Typography>
                      <Typography variant="body1">
                        C.I: {datosUsuario.suplenteEntity.cedulaSuplente}
                      </Typography>
                      <Typography variant="body1">
                        Teléfono: {datosUsuario.suplenteEntity.telefonoSuplente}
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                display="flex"
                justifyContent={{ xs: "center", sm: "flex-end" }}
              >
                <Box mb="-30px" sx={{ width: "100%" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    pb={6}
                    textAlign={{ xs: "center", sm: "right" }}
                  >
                    Número Socio: {datosUsuario.nroSocio}
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
