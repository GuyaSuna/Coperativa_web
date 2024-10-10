"use client";

import React, { useState, useEffect, useContext } from "react";
import { getAllReajustes } from "../../../Api/api.js"; // Asegúrate de tener estas funciones
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MiembroContext } from "@/Provider/provider.js";
import VerReajuste from "@/Components/VerDetalles/VerReajuste/verReajuste.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";
import { jsPDF } from "jspdf";

const ListadoReajustes = ({ setIdentificadorComponente }) => {
  const { cooperativa } = useContext(MiembroContext);
  const [reajustes, setAllReajustes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reajusteSeleccionado, setReajusteSeleccionado] = useState(null);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(reajustes);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchAllReajustes();
  }, []);

  const fetchAllReajustes = async () => {
    try {
      const response = await getAllReajustes(cooperativa.idCooperativa);
      setAllReajustes(response);
    } catch (error) {
      console.error("Error al obtener los reajustes:", error);
    }
  };

  const handleVerDetalles = (reajuste) => {
    setReajusteSeleccionado(reajuste);
    setIsModalOpen(true);
  };


  const handleModificar = (idReajuste) => {
    console.log("Modificar reajuste con ID:", idReajuste);
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(reajustes);
    } else {
      const buscadorFiltrado = reajustes.filter((reajuste) =>
        reajuste.fechaReajuste.toLowerCase().includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(buscadorFiltrado);
    }
  }, [reajustes, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const ordenarOptions = [
    {
      label: "Fecha Reajuste",
      key: "fechaReajuste",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(a.fechaReajuste) - new Date(b.fechaReajuste),
    },
    {
      label: "Valor UR",
      key: "valorUr",
      icon: <SortIcon />,
      comparator: (a, b) => a.valorUr - b.valorUr,
    },
  ];

  const handleSortChange = (option) => {
    if (buscador) {
      const ordenarFiltrado = [...buscadorFiltrado].sort(option.comparator);
      setBuscadorFiltrado(ordenarFiltrado);
    } else {
      const ordenarReajustes = [...reajustes].sort(option.comparator);
      setAllReajustes(ordenarReajustes);
    }
  };

  const handleAgregarReajuste = () => {
    setIdentificadorComponente(31); 
  };

  const descargarPdf = (reajuste) => {
    const fechaReajuste = new Date(reajuste.fechaReajuste + "T00:00:00");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reajuste Anual", 14, 22);

    doc.setFontSize(12);
    doc.text("Detalles del Reajuste:", 14, 30);

    const data = [
      [ `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`, '2 D', reajuste.cuotaMensualDosHabitacionesEnPesos/reajuste.valorUr, reajuste.valorUr.toFixed(2), reajuste.cuotaMensualDosHabitacionesEnPesos.toFixed(2)],
      [`${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`, '3 D',reajuste.cuotaMensualTresHabitacionesEnPesos/reajuste.valorUr,reajuste.valorUr.toFixed(2), reajuste.cuotaMensualTresHabitacionesEnPesos.toFixed(2)]
    ];

    doc.autoTable({
      head: [["PERIODO", "TIPO", "VALOR CASA", "REAJUSTE", "ANUAL CUOTA"]],
      body: data,
      startY: 40,
      theme: "grid",
    });

    doc.text(
      "Se debe agregar cuota social $400",
      14,
      doc.autoTable.previous.finalY + 10
    );

    doc.save(`Reajuste_Anual_${reajuste.fechaReajuste}.pdf`);
  };
  
  

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarReajuste}
            type="button"
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            AGREGAR REAJUSTE
          </button>

          <OrdenarPor
            options={ordenarOptions}
            buttonText="Ordenar por"
            onOptionSelect={handleSortChange}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-white dark:border-gray-700 border-gray-700 border-b">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">Fecha Reajuste</th>
              <th scope="col" className="px-4 py-3 text-center">Valor UR</th>
              <th scope="col" className="px-4 py-3 text-center">Cuota 2 hab</th>
              <th scope="col" className="px-4 py-3 text-center">Cuota 3 hab</th>

            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado?.map((reajuste) => (
              <tr key={reajuste.idReajuste} className="border-b dark:border-gray-700">
                <td className="px-4 py-3">{reajuste.fechaReajuste}</td>
                <td className="px-4 py-3">{reajuste.valorUr}</td>
                <td className="px-4 py-3">{reajuste.cuotaMensualDosHabitacionesEnPesos}</td>
                <td className="px-4 py-3">{reajuste.cuotaMensualTresHabitacionesEnPesos}</td>
                <td className="block sm:table-cell px-4 py-3">
                <button
                    type="button"
                    onClick={() => handleVerDetalles(reajuste)}
                    className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                  >
                    Ver
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center justify-end md:table-cell">
                  <div className="relative inline-block text-left ml-2">
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center">
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
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={() => descargarPdf(reajuste)}
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Descargar Pdf
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerReajuste
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reajuste={reajusteSeleccionado}
        />
      )}
    </div>
  );
};

export default ListadoReajustes;
