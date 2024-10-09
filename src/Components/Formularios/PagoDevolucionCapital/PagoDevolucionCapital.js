"use client";

import React, { useState, useEffect, useContext } from "react";
import { postPagoDevolucionCapital, postEgreso } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
const PagoDevolucionCapitalForm = ({ socio, ur ,setIdentificadorComponente}) => {
  const [montoPago, setMontoPago] = useState("");
  const [tipoMoneda, setTipoMoneda] = useState("UR");
  const [fechaPago, setFechaPago] = useState("");
  const [errores, setErrores] = useState({});
  const {cooperativa} = useContext(MiembroContext);
  
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFechaPago(today);
  },[])
  const validarFormulario = () => {
    const newErrores = {};

    if (!montoPago) newErrores.montoPago = "El monto del pago es obligatorio";
    if (!tipoMoneda) newErrores.tipoMoneda = "El tipo de moneda es obligatorio";
    if (!fechaPago) newErrores.fechaPago = "La fecha de pago es obligatoria";

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validarFormulario()) return;
  
    const pagoDevolucionData = {
      montoPago, 
      tipoMoneda, 
      fechaPago, 
      socio,
    };
  
    try {
      const result = await postPagoDevolucionCapital(pagoDevolucionData);
      console.log("Pago de devolución creado:", result);
  
      if (!result) {
        alert("No se pudo registrar el pago de devolución");
        return;
      }
      
      let montoEgreso = montoPago * ur;
  
      const egreso = {
        subRubro: "Devolución de Capital",
        denominacion: `Pago de devolución registrado el ${fechaPago}`,
        egreso: montoEgreso,
        cooperativaEntity: cooperativa,
        tipoMoneda: "UYU",
        fechaDatosContables: fechaPago,
      };
  
      try {
        const egresoResponse = await postEgreso(egreso);
        console.log("Egreso registrado exitosamente:", egresoResponse);
        alert("Pago de devolución y egreso registrados correctamente");
      } catch (error) {
        console.error("Error al registrar el egreso:", error);
        alert("Error al registrar el egreso contable");
      }
    } catch (error) {
      console.error("Error al registrar el pago de devolución:", error);
      alert("Error al registrar el pago de devolución");
    }
  };
  
  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="montoPago"
          >
            Monto de Pago:
          </label>
          <input
            type="number"
            id="montoPago"
            name="montoPago"
            value={montoPago}
            onChange={(e) => setMontoPago(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.montoPago && (
            <span className="text-red-500 text-sm">{errores.montoPago}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="tipoMoneda"
          >
            Moneda de Devolución:
          </label>
          <input
            type="text"
            id="tipoMoneda"
            name="tipoMoneda"
            value={tipoMoneda}
            onChange={(e) => setTipoMoneda(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.tipoMoneda && (
            <span className="text-red-500 text-sm">{errores.tipoMoneda}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="fechaPago"
          >
            Fecha de Pago:
          </label>
          <input
            type="date"
            id="fechaPago"
            name="fechaPago"
            value={fechaPago}
            onChange={(e) => setFechaPago(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.fechaPago && (
            <span className="text-red-500 text-sm">{errores.fechaPago}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="socio"
          >
            Socio:
          </label>
          <input
            type="text"
            id="socio"
            name="socio"
            value={`${socio.nombreSocio} ${socio.apellidoSocio}`}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Crear Pago de Devolución
        </button>
      </form>
    </div>
  );
};

export default PagoDevolucionCapitalForm;
