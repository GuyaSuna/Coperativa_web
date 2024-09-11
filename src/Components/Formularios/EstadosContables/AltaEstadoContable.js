"use client";

import React, { useEffect, useState, useContext } from "react";
import {
  getAllEgresos,
  getAllIngresos,
  postEstadoContable,
} from "../../../Api/api";
import { MiembroContext } from "../../../Provider/provider";

const AltaEstadoContable = () => {
  const { cooperativa } = useContext(MiembroContext); // Obteniendo datos del contexto

  const [fechaEstadoContable, setFechaEstadoContable] = useState("");
  const [saldoFinal, setSaldoFinal] = useState(0);

  // Totales para ingresos y egresos en pesos y dólares
  const [totalIngresosPesos, setTotalIngresosPesos] = useState(0);
  const [totalIngresosDolares, setTotalIngresosDolares] = useState(0);
  const [totalEgresosPesos, setTotalEgresosPesos] = useState(0);
  const [totalEgresosDolares, setTotalEgresosDolares] = useState(0);

  const [listaEgresos, setListaEgresos] = useState([]);
  const [listaIngresos, setListaIngresos] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setFechaEstadoContable(obtenerFechaHoy());
  }, []);

  useEffect(() => {
    fetchDatos();
  }, [cooperativa.idCooperativa]);

  const fetchDatos = async () => {
    try {
      const egresos = await getAllEgresos(cooperativa.idCooperativa);
      const ingresos = await getAllIngresos(cooperativa.idCooperativa);

      console.log("Egresos", egresos);
      console.log("Ingresos", ingresos);

      setListaEgresos(egresos);
      setListaIngresos(ingresos);

      calcularTotales(egresos, ingresos);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const calcularTotales = (egresos, ingresos) => {
    // Filtrar y sumar los ingresos y egresos por tipo de moneda
    const sumaIngresosPesos = ingresos
      .filter((ingreso) => ingreso.tipoMoneda === "UR")
      .reduce((total, ingreso) => total + ingreso.ingreso, 0);

    const sumaIngresosDolares = ingresos
      .filter((ingreso) => ingreso.tipoMoneda === "USD")
      .reduce((total, ingreso) => total + ingreso.ingreso, 0);

    const sumaEgresosPesos = egresos
      .filter((egreso) => egreso.tipoMoneda === "UR")
      .reduce((total, egreso) => total + egreso.egreso, 0);

    const sumaEgresosDolares = egresos
      .filter((egreso) => egreso.tipoMoneda === "USD")
      .reduce((total, egreso) => total + egreso.egreso, 0);

    // Establecer los totales
    setTotalIngresosPesos(sumaIngresosPesos);
    setTotalIngresosDolares(sumaIngresosDolares);
    setTotalEgresosPesos(sumaEgresosPesos);
    setTotalEgresosDolares(sumaEgresosDolares);

    // Calcular saldo final combinando ambos tipos de moneda
    setSaldoFinal(
      sumaIngresosPesos +
        sumaIngresosDolares -
        (sumaEgresosPesos + sumaEgresosDolares)
    );
  };

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0"); // Asegura que tenga 2 dígitos
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const nuevoEstadoContable = {
      fecha: fechaEstadoContable,
      saldoFinal,
      cooperativaEntity: cooperativa,
      listaEgresos,
      listaIngresos,
    };

    try {
      await postEstadoContable(nuevoEstadoContable);
      alert("Estado contable agregado correctamente");
      // Navegar o limpiar formulario si es necesario
    } catch (error) {
      console.error("Error al agregar estado contable:", error);
    }
  };

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!fechaEstadoContable) {
      errores.fechaEstadoContable =
        "La fecha del Estado Contable es obligatoria";
    } else if (fechaEstadoContable > fechaHoy) {
      errores.fechaEstadoContable =
        "La fecha del Estado Contable no puede ser mayor a la fecha actual";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2">Fecha:</label>
          <input
            type="date"
            name="fechaEstadoContable"
            value={fechaEstadoContable}
            onChange={(e) => setFechaEstadoContable(e.target.value)}
            required
          />
          {errores.fechaEstadoContable && (
            <span className="error">{errores.fechaEstadoContable}</span>
          )}
        </div>

        <div className="flex space-x-8 mt-4">
          {/* Columnas de Ingresos */}
          <div>
            <h3 className="font-bold mb-2">Ingresos en Pesos</h3>
            <ul>
              {listaIngresos
                .filter((ingreso) => ingreso.tipoMoneda === "Pesos")
                .map((ingreso) => (
                  <li key={ingreso.id}>
                    {ingreso.denominacion} - {ingreso.ingreso}{" "}
                    {ingreso.tipoMoneda}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4">
              Total Ingresos en Pesos: {totalIngresosPesos}
            </h3>
          </div>

          <div>
            <h3 className="font-bold mb-2">Ingresos en Dólares</h3>
            <ul>
              {listaIngresos
                .filter((ingreso) => ingreso.tipoMoneda === "Dólares")
                .map((ingreso) => (
                  <li key={ingreso.id}>
                    {ingreso.denominacion} - {ingreso.ingreso}{" "}
                    {ingreso.tipoMoneda}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4">
              Total Ingresos en Dólares: {totalIngresosDolares}
            </h3>
          </div>

          {/* Columnas de Egresos */}
          <div>
            <h3 className="font-bold mb-2">Egresos en Pesos</h3>
            <ul>
              {listaEgresos
                .filter((egreso) => egreso.tipoMoneda === "Pesos")
                .map((egreso) => (
                  <li key={egreso.id}>
                    {egreso.denominacion} - {egreso.egreso} {egreso.tipoMoneda}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4">
              Total Egresos en Pesos: {totalEgresosPesos}
            </h3>
          </div>

          <div>
            <h3 className="font-bold mb-2">Egresos en Dólares</h3>
            <ul>
              {listaEgresos
                .filter((egreso) => egreso.tipoMoneda === "Dólares")
                .map((egreso) => (
                  <li key={egreso.id}>
                    {egreso.denominacion} - {egreso.egreso} {egreso.tipoMoneda}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4">
              Total Egresos en Dólares: {totalEgresosDolares}
            </h3>
          </div>
        </div>

        <h3 className="mt-6">Saldo Final: {saldoFinal}</h3>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4">
          Guardar Estado Contable
        </button>
      </form>
    </div>
  );
};

export default AltaEstadoContable;
