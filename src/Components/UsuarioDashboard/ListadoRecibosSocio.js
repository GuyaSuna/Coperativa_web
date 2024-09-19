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
import DashboardCard from "./DashboardCard";
import { getAllRecibosPorSocio } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";

const ListadoRecibosSocios = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);
  const [allRecibos, setAllRecibos] = useState([]);

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
  return (
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
            {allRecibos.map((recibos) => (
              <TableRow>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    {recibos.nroRecibo}
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
                    {recibos.fechaRecibo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    {recibos.fechaPago}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={400}
                    className="dark:bg-gray-100 bg-dark text-white dark:text-gray-600 "
                  >
                    ${recibos.cuotaMensual}
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
                            onClick={() => handleEliminar(recibos?.idRecibo)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Imprimir
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={() => handleModificar(recibos?.idRecibo)}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Ver Recibo
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
  );
};

export default ListadoRecibosSocios;
