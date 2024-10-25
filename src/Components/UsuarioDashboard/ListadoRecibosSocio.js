import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  const [selectedRecibo, setSelectedRecibo] = useState(null);

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
  const handleMenuOpen = (event, recibo) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecibo(recibo);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecibo(null);
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
          <TableContainer>
            <Table
              sx={{
                width: "100%",
                tableLayout: "fixed",
              }}
              aria-label="recibos table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="dark:text-white text-gray-900">
                    Nro Recibo
                  </TableCell>
                  <TableCell className="dark:text-white text-gray-900">
                    Nombre Socio
                  </TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Fecha de Recibo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRecibos.map((recibo) => (
                  <TableRow key={recibo.nroRecibo}>
                    <TableCell>
                      <Typography variant="body2">
                        {recibo.nroRecibo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        $ {recibo.cuotaMensual}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {recibo.fechaPago}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {/* Menú para acciones */}
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, recibo)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedRecibo === recibo)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleDescargarPDF(recibo)}>
                          Descargar
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
