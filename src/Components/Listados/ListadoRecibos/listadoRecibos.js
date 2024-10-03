"use client";

import React, { useState, useEffect, useContext } from "react";
import { deleteRecibo, getAllRecibos } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { deleteSocio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import VerRecibo from "@/Components/VerDetalles/VerRecibo/verRecibo.js";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import Buscador from "@/Components/Buscador.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListadoRecibos = ({ setCedulaSocio, setIdentificadorComponente }) => {
  const [allRecibos, setAllRecibos] = useState([]);
  const { cooperativa, miembro } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(allRecibos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllRecibos();
  }, []);
  console.log("El recibo: ", allRecibos);
  const fetchAllRecibos = async () => {
    try {
      const response = await getAllRecibos(miembro.responseBody.id);
      setAllRecibos(response);
      console.log(response, "no anda response");
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleModificar = (cedula) => {
    setCedulaSocio(cedula);
    setIdentificadorComponente(4);
  };

  const handleEliminar = async (nroRecibo) => {
    try {
      const data = await deleteRecibo(nroRecibo);
      console.log(data);
      fetchAllRecibos();
    } catch (e) {
      throw ("Fallo al eliminar el recibo ", e.error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(allRecibos);
    } else {
      const buscadorFiltrado = allRecibos?.filter((recibo) =>
        recibo.socio.nombreSocio.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [allRecibos, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };
  const ordenarOptions = [
    {
      label: "Número Recibo",
      key: "nroSocio",
      icon: <SortIcon />,
      comparator: (a, b) => a.nroRecibo - b.nroRecibo,
    },
    {
      label: "Más Recientes",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(b.fechaPago) - new Date(a.fechaPago),
    },
    {
      label: "Más Antiguos",
      key: "fechaIngreso",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(a.fechaIngreso) - new Date(b.fechaIngreso),
    },
  ];

  const handleSortChange = (option) => {
    console.log("Orden seleccionado:", option.label);
    const ordenarRecibos = [...allRecibos].sort(option.comparator);
    setAllRecibos(ordenarRecibos);
  };

  const handleVerRecibo = (recibo) => {
    setReciboSeleccionado(recibo);
    setIsModalOpen(true);
  };
  const handleAgregarRecibo = () => {
    setIdentificadorComponente(6);
  };

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
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarRecibo}
            type="button"
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            AGREGAR RECIBO
          </button>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <OrdenarPor
              options={ordenarOptions}
              buttonText="Ordenar por"
              onOptionSelect={handleSortChange}
            />
          </div>
        </div>
      </div>

      {/* Tabla responsive */}
      <div className="overflow-y-auto h-screen  ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 block md:table">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b hidden md:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">
                Nro Recibo
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre Socio
              </th>
              <th scope="col" className="px-4 py-3">
                Monto
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha de Pago
              </th>
              <th scope="col" className="px-4 py-3">
                Estado
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {buscadorFiltrado?.map((recibo) => (
              <tr
                className="border-b dark:border-gray-700 block md:table-row"
                key={recibo.nroRecibo}
              >
                <th
                  scope="row"
                  className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white block md:table-cell"
                >
                  {recibo.nroRecibo}
                </th>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white block md:table-cell"
                >
                  {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
                </th>
                <td className="px-4 py-3 block md:table-cell">
                  $ {recibo.cuotaMensual}
                </td>
                <td className="px-4 py-3 block md:table-cell">
                  {recibo.fechaPago}
                </td>
                <td className="px-4 py-3 block md:table-cell">
                  <span
                    className={`bg-gradient-to-br ${
                      recibo.estaImpago
                        ? "from-red-500 to-red-700"
                        : "from-green-500 to-green-700"
                    } text-white text-sm font-semibold mr-2 px-3 py-1 rounded`}
                  >
                    {recibo.estaImpago ? "Impago" : "Pago"}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-end gap-2">
                  {/* SVG para pantallas grandes */}
                  <div className="hidden md:block">
                    <div className="relative inline-block text-left">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm">
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
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => handleEliminar(recibo.nroRecibo)}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Eliminar
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
                    </div>
                  </div>
                  {/* Botones para pantallas pequeñas */}
                  <div className="flex md:hidden gap-2">
                    <button
                      onClick={() => handleEliminar(recibo.idRecibo)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleModificar(recibo.idRecibo)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDescargarPDF(recibo)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Crear Recibo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerRecibo
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          recibo={reciboSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoRecibos;
