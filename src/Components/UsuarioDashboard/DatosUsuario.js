import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { MiembroContext } from "@/Provider/provider";
import { getSocio } from "@/Api/api";

const DatosUsuario = () => {
  const { miembro } = useContext(MiembroContext);
  const [datosUsuario, setDatosUsuario] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");

  useEffect(() => {
    setCedulaSocio(miembro.responseBody.socio.cedulaSocio);
  }, [miembro]);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(cedulaSocio);
        setDatosUsuario(data);
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);

  return (
    <Card
      elevation={1}
      sx={{
        py: 0,
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "auto",
      }}
      className="bg-gray-900 dark:bg-white dark:text-black text-white"
    >
      <CardContent sx={{ px: { xs: "10px", sm: "20px", height: "100%" } }}>
        {datosUsuario && (
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12} sm={6}>
              <Box
                sx={{ textAlign: { xs: "center", sm: "left" }, width: "100%" }}
              >
                <Typography variant="h5" component="div" pb={3}>
                  Datos del Socio
                </Typography>
                <Typography variant="body1">
                  Nombre: {datosUsuario.nombreSocio}{" "}
                  {datosUsuario.apellidoSocio}
                </Typography>
                <Divider />
                <Typography variant="body1">
                  C.I: {datosUsuario.cedulaSocio}
                </Typography>
                <Divider />
                <Typography variant="body1">
                  Fecha Ingreso: {datosUsuario.fechaIngreso}
                </Typography>
                <Divider />
                <Typography variant="body1">
                  Teléfono: {datosUsuario.telefono}
                </Typography>
                <Divider />
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
  );
};

export default DatosUsuario;
