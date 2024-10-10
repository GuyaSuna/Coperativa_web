"use client";
import React, { useEffect, useState, useContext } from "react";
import { getAllBalanceAnual } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";
import { jsPDF } from "jspdf";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
const ListadoBalanceAnual = () => {
  const [balances, setBalances] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState([]);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    fetchBalancesAnuales();
  }, []);

  const fetchBalancesAnuales = async () => {
    try {
      const data = await getAllBalanceAnual(cooperativa.idCooperativa);
      console.log(data);
      setBalances(data);
      setBuscadorFiltrado(data);
    } catch (error) {
      console.error("Error al obtener los balances anuales:", error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(balances);
    } else {
      const filtrados = balances.filter((balance) =>
        balance.fechaBalanceAnual.toString().includes(buscador)
      );
      setBuscadorFiltrado(filtrados);
    }
  }, [balances, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const ordenarOptions = [
    {
      label: "Año",
      key: "fechaBalanceAnual",
      icon: <SortIcon />,
      comparator: (a, b) => new Date(a.fechaBalanceAnual) - new Date(b.fechaBalanceAnual),
    },
    {
      label: "Monto",
      key: "resultadoFinal",
      icon: <SortIcon />,
      comparator: (a, b) => b.resultadoFinal - a.resultadoFinal,
    },
  ];

  const handleSortChange = (option) => {
    const balancesOrdenados = [...balances].sort(option.comparator);
    setBalances(balancesOrdenados);
  };

  const descargarPdfBalanceAnual = (ultimoBalance) => {
    console.log("ULTIMO", ultimoBalance);
  
    if (!ultimoBalance) {
      alert("No se encontraron datos de balance anual para generar el PDF.");
      return;
    }
  
    const { cooperativaEntity, egresoTotal, ingresoTotal, resultadoFinal, listaEgresos, listaIngresos, fechaBalanceAnual } = ultimoBalance;
  
    const fechaBalance = new Date(fechaBalanceAnual + "T00:00:00");
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text(`Balance Anual - ${cooperativaEntity.nombre}`, 14, 22);
  
    doc.setFontSize(12);
    doc.text(`Año: ${fechaBalance.getFullYear()}`, 170, 22, { align: 'right' });
    
  

    const ingresosStartY = 40;
    doc.setFontSize(14);
    doc.text("Ingresos:", 14, ingresosStartY);
  
    doc.autoTable({
      head: [["SubRubro", "Monto"]],
      body: listaIngresos.length > 0 
        ? listaIngresos.map(ingreso => [ingreso.subRubro, ingreso.ingreso?.toFixed(2)]) 
        : [["Sin ingresos", "0.00"]],
      startY: ingresosStartY + 5, 
      theme: "grid",
      
    });
  

    const egresosStartY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text("Egresos:", 14, egresosStartY);
  

    doc.autoTable({
      head: [["SubRubro", "Monto"]],
      body: listaEgresos.length > 0 
        ? listaEgresos.map(egreso => [egreso.subRubro, egreso.egreso?.toFixed(2)]) 
        : [["Sin egresos", "0.00"]],
      startY: egresosStartY + 5,
      theme: "grid",
    });
  
    // Totales y resultado final
    const totalsStartY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(
      `Total Ingresos: ${ingresoTotal?.toFixed(2)} - Total Egresos: ${egresoTotal?.toFixed(2)} - Resultado: ${resultadoFinal.toFixed(2)}`,
      14,
      totalsStartY
    );
  
    // Guarda el archivo PDF con el nombre adecuado
    doc.save(`Balance_Anual_${fechaBalance.getFullYear()}.pdf`);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <Buscador value={buscador} onChange={handleChangeBuscador} />
        </div>
        <OrdenarPor
          options={ordenarOptions}
          buttonText="Ordenar por"
          onOptionSelect={handleSortChange}
        />
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-white border-b">
            <tr className="hidden sm:table-row">
              <th scope="col" className="px-4 py-3 text-center">
                Año
              </th>
              <th scope="col" className="px-4 py-3">
                Ingresos Totales
              </th>
              <th scope="col" className="px-4 py-3">
                Egresos Totales
              </th>
              <th scope="col" className="px-4 py-3">
                Resultado Final
              </th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado?.map((balance) => (
              <tr className="border-b dark:border-gray-700 sm:table-row" key={balance.idBalanceAnual}>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {balance.fechaBalanceAnual}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${balance.ingresoTotal}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${balance.egresoTotal}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${balance.resultadoFinal}
                </td>
                <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                <div className="relative inline-block text-left">
                    <Menu as="div" className="relative inline-block text-left">
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
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <button
                              onClick={() =>
                                descargarPdfBalanceAnual(balance)
                              }
                              className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
                            >
                              Descargar Pdf
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                  
              </tr>
            ))}
          </tbody>
        
        </table>
      </div>
    </div>
  );
};

export default ListadoBalanceAnual;
