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
import DashboardCard from "./DashboardCard";
import { getAllRecibosPorSocio } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import VerRecibo from "../VerDetalles/VerRecibo/VerRecibo";
import jsPDF from "jspdf";

const ListadoRecibosSocios = ({ur}) => {
  console.log(ur);
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
  
      doc.setFontSize(16);
      doc.text("COVIAMUROS", 105, 20, null, null, "center");
      doc.setFontSize(12);
      doc.text("COOPERATIVA DE VIVIENDA", 105, 26, null, null, "center");
      doc.text("AYUDA MUTUA ROSARIO", 105, 32, null, null, "center");
      doc.text("ROSARIO - Dpto. de Colonia", 105, 38, null, null, "center");
  
      doc.setFontSize(12);
      doc.text("RECIBO", 160, 50);
      doc.text(`${recibo.nroRecibo}`, 160, 56);
      doc.text("Fecha de Pago:", 20, 50);
      doc.text(`${recibo.fechaPago}`, 60, 50);
  
      doc.text("Número de CI:", 20, 60);
      doc.text(`${recibo.socio.ci}`, 60, 60);
  
      const listaConvenios = recibo.listaConvenio || []; 
      const totalConvenios = listaConvenios.reduce(
        (total, convenio) => total + (convenio.urPorMes || 0),
        0
      );
  
      doc.autoTable({
        startY: 70,
        head: [["Conceptos", "Importes"]],
        body: [
          ["Ahorro/Mes", `${recibo.cuotaMensual}`],
          ["Cuota Social", `${recibo.cuotaSocial}`],
          ["Convenio", `${((totalConvenios ?? 0) * (ur ?? 0)).toFixed(2)}`],
          [
            "Subsidio",
           `${recibo.subsidio && recibo.subsidio.cuotaApagarUr ? (recibo.subsidio.cuotaApagarUr * ur).toFixed(2) : 0}`
          ], 
          ["Recargo", `${recibo.recargo}`],
          ["Interés", `${recibo.interes}`],
          ["Capital", `${recibo.capital}`],
        ],
        theme: "grid",
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 50, halign: "right" },
        },
      });
  
      const totalY = doc.previousAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`TOTAL: $${recibo.cuotaMensual}`, 150, totalY);
  
      doc.text("Hemos recibido de: ", 20, totalY + 10);
      doc.text(
        `${recibo.socio.nombreSocio} ${recibo.socio.apellidoSocio}`,
        60,
        totalY + 10
      );
  
      doc.text("La suma de $:", 20, totalY + 15);
      doc.text(`${recibo.sumaEnPesos}`, 60, totalY + 15);
  
      doc.text("TESORERO", 150, totalY + 30);
      doc.text(
        `${recibo.tesorero.firstname} ${recibo.tesorero.lastname}`,
        145,
        totalY + 35
      );
  
      doc.save(`Recibo_${recibo.fechaPago}.pdf`);
    };


  const handleMenuOpen = (event, recibo) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecibo(recibo);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecibo(null);
  };

  return (
    <>
      <DashboardCard title={"Historial de Recibos"}>
        <Box className="overflow-y-auto max-h-[75vh] flex flex-col dark:bg-gray-800 bg-white">
          {allRecibos.map((recibo) => (
            <div
              key={recibo.nroRecibo}
              className="w-full sm:hidden bg-white shadow-md rounded-lg p-4 mb-4 dark:bg-gray-700"
            >
              <Typography variant="body1" className="text-black dark:text-white">
                Nro Recibo: {recibo.nroRecibo}
              </Typography>
              <Typography variant="body1" className="text-black dark:text-white">
                Nombre Socio: {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
              </Typography>
              <Typography variant="body1" className="text-black dark:text-white">
                Monto: $ {recibo.cuotaMensual}
              </Typography>
              <Typography variant="body1" className="text-black dark:text-white">
                Fecha de Recibo: {recibo.fechaPago}
              </Typography>
              <div className="flex justify-end">
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
              </div>
            </div>
          ))}
          <TableContainer className="hidden sm:block">
            <Table sx={{ width: "100%", tableLayout: "fixed" }} aria-label="recibos table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-black dark:text-white">Nro Recibo</TableCell>
                  <TableCell className="text-black dark:text-white">Nombre Socio</TableCell>
                  <TableCell className="text-black dark:text-white">Monto</TableCell>
                  <TableCell className="text-black dark:text-white">Fecha de Recibo</TableCell>
                  <TableCell className="text-black dark:text-white">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRecibos.map((recibo) => (
                  <TableRow key={recibo.nroRecibo} className="dark:bg-gray-700">
                    <TableCell className="text-black dark:text-white">{recibo.nroRecibo}</TableCell>
                    <TableCell className="text-black dark:text-white">
                      {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
                    </TableCell>
                    <TableCell className="text-black dark:text-white">$ {recibo.cuotaMensual}</TableCell>
                    <TableCell className="text-black dark:text-white">{recibo.fechaPago}</TableCell>
                    <TableCell align="right">
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

