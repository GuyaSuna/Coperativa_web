import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@headlessui/react";
import DashboardCard from "./DashboardCard";
import { getAllRecibosPorSocio } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import VerRecibo from "../VerDetalles/VerRecibo/VerRecibo";
import jsPDF from "jspdf";

const ListadoRecibosSocios = () => {
  const { miembro } = useContext(MiembroContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allRecibos, setAllRecibos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllRecibosPorSocio();
  }, []);

  const fetchAllRecibosPorSocio = async () => {
    try {
      const response = await getAllRecibosPorSocio(
        miembro.responseBody.socio.cedulaSocio
      );
      setAllRecibos(response);
    } catch (error) {
      console.error("Error al obtener los recibos:", error);
    }
  };

  const handleVerRecibo = (recibo) => {
    setReciboSeleccionado(recibo);
    setIsModalOpen(true);
  };

  const handleDescargarPDF = (recibo) => {
    const doc = new jsPDF();
    // Configuración del PDF...
    doc.save(`Recibo_${recibo.fechaRecibo}.pdf`);
  };

  console.log("RECIBOS SOCIO: " + allRecibos);
  return (
    <>
      <DashboardCard title={"Historial de Recibos"}>
        <Box
          sx={{
            overflowY: "auto",
            width: "100%",
            height: "calc(75vh - 350px)", // Ajusta según lo que necesites
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 4,
              width: "100%",
              tableLayout: "fixed", // Mantener el ancho de columnas consistente
              flexGrow: 1,
            }}
            className="dark:bg-white bg-dark"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                    sx={{ lineHeight: 1.2, padding: "4px 8px" }} // Ajuste de línea y padding pequeño
                  >
                    Nro Recibo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                    sx={{ lineHeight: 1.2, padding: "4px 8px" }}
                  >
                    Fecha Recibo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                    sx={{ lineHeight: 1.2, padding: "4px 8px" }}
                  >
                    Monto
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                    sx={{ lineHeight: 1.2, padding: "4px 8px" }}
                  >
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRecibos.map((recibo, index) => (
                <TableRow
                  key={index}
                  sx={{
                    minHeight: "40px", // Asegura un mínimo de altura más pequeño
                  }}
                >
                  <TableCell
                    sx={{
                      padding: "4px 8px", // Reducir padding
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="dark:text-black text-white"
                      sx={{ lineHeight: 1.2 }} // Reducir lineHeight
                    >
                      {recibo.nroRecibo}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: "4px 8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="dark:text-black text-white"
                      sx={{ lineHeight: 1.2 }}
                    >
                      {recibo.fechaRecibo}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: "4px 8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="dark:text-black text-white"
                      sx={{ lineHeight: 1.2 }}
                    >
                      $ {recibo.cuotaMensual}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: "4px 8px",
                    }}
                  >
                    <Button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDescargarPDF(recibo)}
                      sx={{
                        padding: "4px 12px", // Botón más compacto
                        fontSize: "0.875rem", // Tamaño de fuente reducido
                      }}
                    >
                      Descargar PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>

      {isModalOpen && (
        <VerRecibo
          recibo={reciboSeleccionado}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ListadoRecibosSocios;
