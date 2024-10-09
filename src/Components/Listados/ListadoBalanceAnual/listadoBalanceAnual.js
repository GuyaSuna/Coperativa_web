"use client";
import React, { useEffect, useState, useContext } from "react";
import { getAllBalanceAnual } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import Buscador from "@/Components/Buscador.js";
import OrdenarPor from "@/Components/OrdenarPor.js";
import SortIcon from "@mui/icons-material/Sort";

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoBalanceAnual;
