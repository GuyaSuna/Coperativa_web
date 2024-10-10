"use client";

import React, { useState, useEffect, useContext } from "react";
import { deleteRecibo, getAllRecibos } from "../../../../Api/api";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerRecibo from "@/Components/VerDetalles/VerRecibo/VerRecibo.js";
import SortIcon from "@mui/icons-material/Sort";
import OrdenarPor from "@/Components/OrdenarPor.js";
import Buscador from "@/Components/Buscador.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListadoRecibos = ({ setCedulaSocio, setIdentificadorComponente }) => {
  const [allRecibos, setAllRecibos] = useState([]);
  const { cooperativa, miembro } = useContext(MiembroContext);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);

  useEffect(() => {
    fetchAllRecibos();
  }, []);

  const fetchAllRecibos = async () => {
    try {
      const response = await getAllRecibos(miembro.responseBody.id);
      // Filtra los recibos para excluir aquellos cuyos socios están archivados
      const recibosActivos = response.filter(recibo => !recibo.socio.archived);
      setAllRecibos(recibosActivos);
      setBuscadorFiltrado(recibosActivos);  // Inicialmente muestra todos los recibos activos
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
    const ordenarRecibos = [...allRecibos].sort(option.comparator);
    setAllRecibos(ordenarRecibos);
  };

  const handleVerRecibo = (recibo) => {
    setReciboSeleccionado(recibo);
    setIsModalOpen(true);
  };

  const handleDescargarPDF = (recibo) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("COVIAMUROS", 20, 20);
    doc.setFontSize(12);
    doc.text("COOPERATIVA DE VIVIENDA", 20, 26);
    doc.text("AYUDA MUTUA ROSARIO", 20, 32);
    doc.text("ROSARIO - Dpto. de Colonia", 20, 38);
    doc.text("RECIBO", 160, 20);
    doc.text(`${recibo.nroRecibo}`, 160, 26);
    doc.text("DIA  MES  AÑO", 160, 32);
    doc.text(`${recibo.fechaPago}`, 160, 38);

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

    doc.text("TOTAL:  8396", 150, 95);
    doc.text("Hemos Recibido de: ", 20, 100);
    doc.text(`${recibo.socio.nombreSocio}`, 65, 100);
    doc.text("La suma de $: ", 20, 105);
    doc.text(`${recibo.sumaEnPesos}`, 60, 105);
    doc.text("TESORERO", 150, 120);
    doc.text(`${recibo.tesorero.firstname}`, 145, 125);
    doc.text(`${recibo.tesorero.lastname}`, 165, 125);

    doc.save(`Recibo_${recibo.fechaRecibo}.pdf`);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-3 w-full md:w-auto">
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
              <th scope="col" className="px-4 py-3 text-center">Nro Recibo</th>
              <th scope="col" className="px-4 py-3">Nombre Socio</th>
              <th scope="col" className="px-4 py-3">Monto</th>
              <th scope="col" className="px-4 py-3">Fecha de Recibo</th>
              <th scope="col" className="px-4 py-3">Estado</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {buscadorFiltrado?.map((recibo) => (
              <tr className="border-b dark:border-gray-700 block md:table-row" key={recibo.nroRecibo}>
                <th scope="row" className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white block md:table-cell">
                  {recibo.nroRecibo}
                </th>
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white block md:table-cell">
                  {recibo.socio.nombreSocio} {recibo.socio.apellidoSocio}
                </th>
                <td className="px-4 py-3 block md:table-cell">$ {recibo.cuotaMensual}</td>
                <td className="px-4 py-3 block md:table-cell">{recibo.fechaRecibo}</td>
                <td className="px-4 py-3 block md:table-cell">
                  <span
                    className={`bg-gradient-to-br ${recibo.estaImpago ? "from-red-600 to-red-500" : "from-green-600 to-green-500"
                      } text-white text-xs font-medium px-2.5 py-0.5 rounded-md`}
                  >
                    {recibo.estaImpago ? "Impago" : "Pago"}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center justify-center space-x-1 block md:table-cell">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="p-1 text-sm font-medium inline-flex items-center dark:bg-primary bg-white dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none border rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        Acciones
                      </MenuButton>
                    </div>

                    <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <MenuItem onClick={() => handleVerRecibo(recibo)}>
                          <span className="text-gray-700 block px-4 py-2 text-sm">Ver Recibo</span>
                        </MenuItem>
                        <MenuItem onClick={() => handleDescargarPDF(recibo)}>
                          <span className="text-gray-700 block px-4 py-2 text-sm">Descargar PDF</span>
                        </MenuItem>
                        <MenuItem onClick={() => handleEliminar(recibo.nroRecibo)}>
                          <span className="text-gray-700 block px-4 py-2 text-sm">Eliminar</span>
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
