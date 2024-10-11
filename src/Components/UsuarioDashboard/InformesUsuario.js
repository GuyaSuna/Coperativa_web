"use client";
import React, { useState, useContext, useEffect } from "react";
import VerEstadoContable from "@/Components/VerDetalles/VerEstadoContablePDF/VerEstadoContablePDF";
import {
  getUltimoEstadoContable,
  getUltimoReajuste,
  getUltimoBalanceAnual,
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


  const descargarPdfReajuste = (reajuste) => {
    const fechaReajuste = new Date(reajuste.fechaReajuste + "T00:00:00");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reajuste Anual", 14, 22);

    doc.setFontSize(12);
    doc.text("Detalles del Reajuste:", 14, 30);

    const data = [
      [ `${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`, '2 D', (reajuste.cuotaMensualDosHabitacionesEnPesos/reajuste.valorUr).toFixed(2), reajuste.valorUr.toFixed(2), reajuste.cuotaMensualDosHabitacionesEnPesos.toFixed(2)],
      [`${fechaReajuste.getFullYear()}/${fechaReajuste.getFullYear() + 1}`, '3 D',(reajuste.cuotaMensualTresHabitacionesEnPesos/reajuste.valorUr).toFixed(2),reajuste.valorUr.toFixed(2), reajuste.cuotaMensualTresHabitacionesEnPesos.toFixed(2)]
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

  const fetchUltimoReajuste = async () => {
    try {
      const reajuste = await getUltimoReajuste(cooperativa.idCooperativa);
      setUltimoReajuste(reajuste);
    } catch (error) {
      console.error("Error al obtener el último reajuste:", error);
    }
  };

  const descargarPdfBalanceAnual = () => {
  
    if (!ultimoBalance) {
      alert("No se encontraron datos de balance anual para generar el PDF.");
      return;
    }
  
    const { cooperativaEntity, egresoTotal, ingresoTotal, resultadoFinal, listaEgresos, listaIngresos, fechaBalanceAnual } = ultimoBalance;
  
    const fechaBalance = new Date(fechaBalanceAnual + "T00:00:00");
    const doc = new jsPDF();
  
    // Título principal
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
  
  const fetchUltimoBalanceAnual = async () => {
    try {
      const balance = await getUltimoBalanceAnual(cooperativa.idCooperativa);
      setUltimoBalance(balance);
    } catch (error) {
      console.error("Error al obtener el último balance:", error);
    }
  };

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
          <button
              onClick={() => descargarPdfBalanceAnual()}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150"
              title="Purchase"
            >
              Descargar Balance
            </button>
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
