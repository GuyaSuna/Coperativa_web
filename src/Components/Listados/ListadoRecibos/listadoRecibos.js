"use client";

import React, { useState, useEffect, useContext } from "react";
import { deleteRecibo, getAllRecibos } from "../../../Api/api.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerRecibo from "@/Components/VerDetalles/VerRecibo/VerRecibo";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import Buscador from "@/Components/Buscador.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListadoRecibos = ({ setCedulaSocio, setIdentificadorComponente, ur }) => {
  console.log(ur);
  const [allRecibos, setAllRecibos] = useState([]);
  const { cooperativa, miembro } = useContext(MiembroContext);
  const [archivados, setArchivados] = useState(false);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllRecibos();
  }, []);

  const handleArchivadosToggle = () => {
    setArchivados(!archivados); // Cambiar entre ver archivados y activos
  };

  const fetchAllRecibos = async () => {
    try {
      const response = await getAllRecibos(miembro.responseBody.id);
      // Filtra los recibos para excluir aquellos cuyos socios están archivados
      const recibosActivos = response.filter(
        (recibo) => !recibo.socio.archived
      );
      setAllRecibos(recibosActivos);
      setBuscadorFiltrado(recibosActivos); // Inicialmente muestra todos los recibos activos
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleEliminar = async (nroRecibo) => {
    try {
      await deleteRecibo(nroRecibo);
      fetchAllRecibos();
    } catch (e) {
      throw ("Fallo al eliminar el recibo ", e.error);
    }
  };

  useEffect(() => {
    const filtrado = allRecibos.filter(
      (recibo) => recibo.socio.archivado === archivados
    );
    if (buscador === "") {
      setBuscadorFiltrado(filtrado);
    } else {
      setBuscadorFiltrado(
        filtrado.filter((recibo) =>
          recibo.socio.nombreSocio
            .toLowerCase()
            .includes(buscador.toLowerCase())
        )
      );
    }
  }, [allRecibos, archivados, buscador]);

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
    const ordenarRecibos = [...allRecibos].sort(option.comparator);
    setAllRecibos(ordenarRecibos);
  };

  const handleVerRecibo = (recibo) => {
    setReciboSeleccionado(recibo);
    setIsModalOpen(true);
  };

  const handleDescargarPDF = (recibo) => {
    console.log("Recibo doc", recibo);
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(16);
    doc.text("COVIAMUROS", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("COOPERATIVA DE VIVIENDA", 105, 26, null, null, "center");
    doc.text("AYUDA MUTUA ROSARIO", 105, 32, null, null, "center");
    doc.text("ROSARIO - Dpto. de Colonia", 105, 38, null, null, "center");

    // Información del recibo
    doc.setFontSize(12);
    doc.text("RECIBO", 160, 50);
    doc.text(`${recibo.nroRecibo}`, 160, 56);
    doc.text("Fecha de Pago:", 20, 50);
    doc.text(`${recibo.fechaPago}`, 60, 50);

    doc.text("Número de CI:", 20, 60);
    doc.text(`${recibo.socio.ci}`, 60, 60);

    // Calcular el total de convenios
    const listaConvenios = recibo.listaConvenio || []; // Asegúrate de que recibo.listaConvenio exista
    const totalConvenios = listaConvenios.reduce(
      (total, convenio) => total + (convenio.urPorMes || 0),
      0
    );
    console.log(totalConvenios);
    // Tabla con conceptos
    doc.autoTable({
      startY: 70,
      head: [["Conceptos", "Importes"]],
      body: [
        ["Ahorro/Mes", `${recibo.cuotaMensual}`],
        ["Cuota Social", `${recibo.cuotaSocial}`],
        ["Convenio", `${(totalConvenios * ur).toFixed(2)}`], // Suma de todos los convenios
        [
          "Subsidio",
          `${(recibo.subsidio?.cuotaApagarUr * ur).toFixed(2) || 0}`,
        ], // Manejo seguro del subsidio
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

    // Total y firma
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

    // Tesorería
    doc.text("TESORERO", 150, totalY + 30);
    doc.text(
      `${recibo.tesorero.firstname} ${recibo.tesorero.lastname}`,
      145,
      totalY + 35
    );

    // Guardar el PDF
    doc.save(`Recibo_${recibo.fechaPago}.pdf`);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleArchivadosToggle}
              className="flex items-center justify-center text-white bg-green-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              {archivados ? "Ver Activos" : "Ver Archivados"}
            </button>
            <OrdenarPor
              options={ordenarOptions}
              buttonText="Ordenar por"
              onOptionSelect={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 block md:table">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b hidden md:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-3">
                Nro Recibo
              </th>
              <th scope="col" className="px-4 py-3">
                Nombre Socio
              </th>
              <th scope="col" className="px-4 py-3">
                Monto
              </th>
              <th scope="col" className="px-4 py-3">
                Fecha de Recibo
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
                  {recibo.fechaRecibo}
                </td>
                <td className="px-4 py-3 block md:table-cell">
                  <span
                    className={`bg-gradient-to-br ${
                      recibo.estaImpago
                        ? "from-red-600 to-red-500"
                        : "from-green-600 to-green-500"
                    } text-white text-xs font-medium px-2.5 py-0.5 rounded-md`}
                  >
                    {recibo.estaImpago ? "Impago" : "Pago"}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center justify-center space-x-1 block md:table-cell">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center hidden md:inline-flex">
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

                    <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <MenuItem onClick={() => handleVerRecibo(recibo)}>
                          <span className="text-gray-700 block px-4 py-2 text-sm">
                            Ver Recibo
                          </span>
                        </MenuItem>
                        <MenuItem onClick={() => handleDescargarPDF(recibo)}>
                          <span className="text-gray-700 block px-4 py-2 text-sm">
                            Descargar PDF
                          </span>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEliminar(recibo.nroRecibo)}
                        >
                          <span className="text-gray-700 block px-4 py-2 text-sm">
                            Eliminar
                          </span>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerRecibo
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          recibo={reciboSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoRecibos;
