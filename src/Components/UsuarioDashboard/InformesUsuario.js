"use client";
import React, { useState, useContext, useEffect } from "react";
import VerEstadoContable from "@/Components/VerDetalles/VerEstadoContablePDF/VerEstadoContablePDF";
import {
  getUltimoEstadoContable,
  getUltimoReajuste,
  getUtimoBalance,
} from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import { jsPDF } from "jspdf";

const InformesUsuario = ({}) => {
  const { cooperativa, miembro } = useContext(MiembroContext);
  const [estadoContable, setEstadoContable] = useState({});
  const [estadoContableSeleccionado, setEstadoContableSeleccionado] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [ultimoReajuste, setUltimoReajuste] = useState(null);
  const [ultimoBalance, setUltimoBalance] = useState(null);

  useEffect(() => {
    fetchUltimoEstadoContable();
    fetchUltimoReajuste();
    fetchUltimoBalanceAnual();
  }, []);

  const handleVerEstadoContable = (estadoContable) => {
    setEstadoContableSeleccionado(estadoContable);
    setIsModalOpen(true);
  };

  const fetchUltimoEstadoContable = async () => {
    try {
      const response = await getUltimoEstadoContable();
      setEstadoContable(response);
    } catch (error) {
      console.error("Error al obtener los Estados Contables:", error);
    }
  };
  console.log("Ultimo estado contable", estadoContable);

  const descargarPdfReajuste = (ultimoReajuste) => {
    const fechaReajuste = new Date(ultimoReajuste.fechaReajuste + "T00:00:00");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reajuste Anual", 14, 22);

    doc.setFontSize(12);
    doc.text("Detalles del Reajuste:", 14, 30);

    const data = [
      [
        `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`,
        "2 D",
        "5,55",
        ultimoReajuste.valorUr.toFixed(2),
        ultimoReajuste.cuotaMensualDosHabitacionesEnPesos.toFixed(2),
      ],
      [
        `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`,
        "2 D",
        "5,55",
        ultimoReajuste.valorUr.toFixed(2),
        ultimoReajuste.cuotaMensualTresHabitacionesEnPesos.toFixed(2),
      ],
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

    doc.save(`Reajuste_Anual_${ultimoReajuste.fechaReajuste}.pdf`);
  };

  const fetchUltimoReajuste = async () => {
    try {
      const reajuste = await getUltimoReajuste(cooperativa.idCooperativa);
      console.log("REAJUSTE", reajuste);
      setUltimoReajuste(reajuste);
    } catch (error) {
      console.error("Error al obtener el último reajuste:", error);
    }
  };
  const fetchUltimoBalanceAnual = async () => {
    try {
      const balance = await getUtimoBalance(cooperativa.idCooperativa);
      console.log("ULTIMO BALANCE", balance);
      setUltimoBalance(balance);
    } catch (error) {
      console.error("Error al obtener el último balance:", error);
    }
  };
  const descargarPdfBalance = (ultimoBalance) => {
    const fechaReajuste = new Date(ultimoBalance.fechaReajuste + "T00:00:00");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reajuste Anual", 14, 22);

    doc.setFontSize(12);
    doc.text("Detalles del Reajuste:", 14, 30);

    const data = [
      [
        `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`,
        "2 D",
        "5,55",
        ultimoBalance.valorUr.toFixed(2),
        ultimo.cuotaMensualDosHabitacionesEnPesos.toFixed(2),
      ],
      [
        `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`,
        "2 D",
        "5,55",
        ultimoReajuste.valorUr.toFixed(2),
        ultimoReajuste.cuotaMensualTresHabitacionesEnPesos.toFixed(2),
      ],
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

    doc.save(`Reajuste_Anual_${ultimoReajuste.fechaReajuste}.pdf`);
  };
  console.log("Ultimo reajuste: ", ultimoReajuste);
  console.log("Ultimo balance: ", ultimoBalance);
  return (
    <div className="w-full 2xl:w-3/4 flex items-start justify-center px-8 md:px-32 lg:px-16 2xl:px-0 mx-auto mt-28">
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="dark:bg-white bg-slate-500 text-white dark:text-black shadow-4xl rounded-lg py-4 ">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Estado Contable</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => handleVerEstadoContable(estadoContable)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
            >
              Descargar Informe
            </button>

            {isModalOpen && (
              <VerEstadoContable
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                estadoContable={estadoContableSeleccionado}
              />
            )}
          </div>
        </div>
        <div className="dark:bg-white bg-slate-500 shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Balance Anual</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
              title="Purchase"
            >
              Descargar Informe
            </a>
          </div>
        </div>
        <div className="dark:bg-white bg-slate-500 shadow-2xl rounded-lg py-4">
          <p className="text-xl text-center font-bold text-white dark:text-blue-600">
            Informe
          </p>
          <p className="text-center py-8">
            <span className="text-4xl font-bold text-white dark:text-black">
              <span x-text="basicPrice">Reajuste anual de cuota mensual</span>
            </span>
          </p>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => descargarPdfReajuste(ultimoReajuste)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
              title="Purchase"
            >
              Descargar Informe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformesUsuario;
