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
            overflowX: "auto",
            width: "100%",
            minWidth: "100%",
            height: "100%",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
              minWidth: { xs: "500px", sm: "650px" },
            }}
            className="dark:bg-white bg-gray-300"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                  >
                    Nro Recibo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                  >
                    Fecha Recibo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                  >
                    Monto
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    className="dark:text-black text-white"
                  >
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRecibos.map((recibo, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className=" dark:text-black text-white"
                    >
                      {recibo.nroRecibo}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      className=" dark:text-black text-white"
                    >
                      {recibo.fechaRecibo}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      className="dark:text-black text-white"
                    >
                      $ {recibo.cuotaMensual}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDescargarPDF(recibo)}
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
