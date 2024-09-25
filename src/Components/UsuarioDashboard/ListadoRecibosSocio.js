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
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerRecibo from "../VerDetalles/VerRecibo/VerRecibo";
import DashboardCard from "./DashboardCard";
import { getAllRecibosPorSocio } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListadoRecibosSocios = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);
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
      console.log(response, "no anda response");
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };
  console.log("Los recibos del socio", allRecibos);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVerRecibo = (recibo) => {
    setReciboSeleccionado(recibo);
    setIsModalOpen(true);
  }
  const handleDescargarPDF = (recibo) => {
    const doc = new jsPDF();

    // Encabezado principal (COVIAMUROS, cooperativa, etc.)
    doc.setFontSize(16);
    doc.text("COVIAMUROS", 20, 20);
    doc.setFontSize(12);
    doc.text("COOPERATIVA DE VIVIENDA", 20, 26);
    doc.text("AYUDA MUTUA ROSARIO", 20, 32);
    doc.text("ROSARIO - Dpto. de Colonia", 20, 38);

    // Número de recibo y fecha
    doc.setFontSize(12);
    doc.text("RECIBO", 160, 20);
    doc.text(`${recibo.nroRecibo}`, 160, 26);
    doc.text("DIA  MES  AÑO", 160, 32);
    doc.text(`${recibo.fechaPago}`, 160, 38);

    // Tabla de conceptos e importes
    doc.autoTable({
      startY: 50,
      head: [["CONCEPTOS", "IMPORTES"]],
      body: [
        ["1 - Ahorro/Mes Set 23", `${recibo.cuotaMensual}`],
        ["2 - Cuota Social", `${recibo.cuotaSocial}`],
        ["3 - Convenio", `${recibo.convenio}`],
        ["4 - Recargo", `${recibo.recargo}`],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
    });

    // Total
    doc.setFontSize(12);
    doc.text("TOTAL:  8396", 150, 95);

    // Firmas y detalles finales
    doc.text("Hemos Recibido de: ", 20, 100);
    doc.text(`${recibo.socio.nombreSocio}`, 65, 100);
    doc.text("La suma de $: ", 20, 105);
    doc.text(`${recibo.sumaEnPesos}`, 60, 105);

    doc.text("TESORERO", 150, 120);
    doc.text(`${recibo.tesorero.firstname}`, 145, 125);
    doc.text(`${recibo.tesorero.lastname}`, 165, 125);
    // Guarda el PDF con un nombre personalizado
    doc.save(`Recibo_${recibo.fechaRecibo}.pdf`);
  };
  return (
  <>
    <DashboardCard title={"Historial de Recibos"}>
      <Box
        sx={{
          overflowX: "auto", // Allows horizontal scrolling if content overflows
          width: "100%", // Ensure the box takes full width
          minWidth: "100%",
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap", // Prevent text wrapping
            mt: 2,
            minWidth: { xs: "500px", sm: "650px" }, // Set a minimum width for the table
          }}
          className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                >
                  Nro Recibo
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                >
                  Fecha Emision
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                >
                  Fecha del Pago
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                >
                  Valor Cuota
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                ></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRecibos.map((recibo) => (
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    {recibo.nroRecibo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    {recibo.fechaRecibo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    {recibo.fechaPago}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    ${recibo.cuotaMensual}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Menu
                    as="div"
                    className="relative inline-block text-left justify-end"
                  >
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold dark:bg-gray-100 bg-dark text-white dark:text-gray-600 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <button
                            onClick={() => handleEliminar(recibo?.idRecibo)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Imprimir
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() => handleVerRecibo(recibo)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Ver Recibo
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() => handleDescargarPDF(recibo)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Descargar PDF
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
     {isModalOpen && (
      <VerRecibo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recibo={reciboSeleccionado}
      />
    )}
    </>
  );
};

export default ListadoRecibosSocios;
