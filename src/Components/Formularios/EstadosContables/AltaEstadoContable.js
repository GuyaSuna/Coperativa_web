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
  const [saldoFinalEnPesos, setSaldoFinalPesos] = useState(0);
  const [saldoFinalEnDolares, setSaldoFinalDolares] = useState(0);

  // Totales para ingresos y egresos en pesos y dólares
  const [totalIngresosPesos, setTotalIngresosPesos] = useState(0);
  const [totalIngresosDolares, setTotalIngresosDolares] = useState(0);
  const [totalEgresosPesos, setTotalEgresosPesos] = useState(0);
  const [totalEgresosDolares, setTotalEgresosDolares] = useState(0);

  const [listaEgresos, setListaEgresos] = useState([]);
  const [listaIngresos, setListaIngresos] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setFechaEstadoContable(new Date().toISOString());
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

  const handleChangeFechaEstadoContable = (e) =>
    setFechaEstadoContable(e.target.value);

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

    // Calcular saldo final por separado para cada moneda
    setSaldoFinalPesos(sumaIngresosPesos - sumaEgresosPesos);
    setSaldoFinalDolares(sumaIngresosDolares - sumaEgresosDolares);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;
    const nuevoEstadoContable = {
      fecha: fechaEstadoContable,
      saldoFinalEnPesos,
      saldoFinalEnDolares,
      cooperativaEntity: cooperativa,
      listaEgresos,
      listaIngresos,
    };
    try {
      console.log("postEstado en Submit", nuevoEstadoContable);
      await postEstadoContable(nuevoEstadoContable);
      alert("Estado contable agregado correctamente");
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <label className="block text-sm font-medium mb-4">
          Fecha:
          <input
            type="date"
            name="fechaEstadoContable"
            value={fechaEstadoContable}
            onChange={handleChangeFechaEstadoContable}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          {errores.fechaEstadoContable && (
            <span className="error text-red-500">
              {errores.fechaEstadoContable}
            </span>
          )}
        </label>

        <div className="grid grid-cols-2 gap-8 mt-6">
          {/* Ingresos en Pesos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ingresos en Pesos</h3>
            <ul className="bg-gray-200 p-4 rounded-lg">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span>Denom.</span>
                <span>Ingreso</span>
                <span>Moneda</span>
                <span>SubRubro</span>
              </li>
              {listaIngresos
                .filter((ingreso) => ingreso.tipoMoneda === "UR")
                .map((ingreso) => (
                  <li
                    key={ingreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700 text-black dark:text-white"
                  >
                    <span>{ingreso.denominacion}</span>
                    <span>{ingreso.ingreso}</span>
                    <span>{ingreso.tipoMoneda}</span>
                    <span>{ingreso.subRubro}</span>{" "}
                    {/* Nuevo atributo SubRubro */}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Ingresos en Pesos: {totalIngresosPesos}
            </h3>
          </div>

          {/* Ingresos en Dólares */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ingresos en Dólares</h3>
            <ul className="bg-gray-200 p-4 rounded-lg">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span>Denom.</span>
                <span>Ingreso</span>
                <span>Moneda</span>
                <span>SubRubro</span>
              </li>
              {listaIngresos
                .filter((ingreso) => ingreso.tipoMoneda === "USD")
                .map((ingreso) => (
                  <li
                    key={ingreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700 text-black dark:text-white"
                  >
                    <span>{ingreso.denominacion}</span>
                    <span>{ingreso.ingreso}</span>
                    <span>{ingreso.tipoMoneda}</span>
                    <span>{ingreso.subRubro}</span>{" "}
                    {/* Nuevo atributo SubRubro */}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Ingresos en Dólares: {totalIngresosDolares}
            </h3>
          </div>

          {/* Egresos en Pesos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Egresos en Pesos</h3>
            <ul className="bg-gray-200 p-4 rounded-lg">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span>Denom.</span>
                <span>Egreso</span>
                <span>Moneda</span>
                <span>SubRubro</span>
              </li>
              {listaEgresos
                .filter((egreso) => egreso.tipoMoneda === "UR")
                .map((egreso) => (
                  <li
                    key={egreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700"
                  >
                    <span>{egreso.denominacion}</span>
                    <span>{egreso.egreso}</span>
                    <span>{egreso.tipoMoneda}</span>
                    <span>{egreso.subRubro}</span>{" "}
                    {/* Nuevo atributo SubRubro */}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Egresos en Pesos: {totalEgresosPesos}
            </h3>
          </div>

          {/* Egresos en Dólares */}
          <div>
            <h3 className="font-bold text-lg mb-4">Egresos en Dólares</h3>
            <ul className="bg-gray-200 p-4 rounded-lg">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span>Denom.</span>
                <span>Egreso</span>
                <span>Moneda</span>
                <span>SubRubro</span>
              </li>
              {listaEgresos
                .filter((egreso) => egreso.tipoMoneda === "USD")
                .map((egreso) => (
                  <li
                    key={egreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700"
                  >
                    <span>{egreso.denominacion}</span>
                    <span>{egreso.egreso}</span>
                    <span>{egreso.tipoMoneda}</span>
                    <span>{egreso.subRubro}</span>{" "}
                    {/* Nuevo atributo SubRubro */}
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Egresos en Dólares: {totalEgresosDolares}
            </h3>
          </div>
        </div>

        {/* Saldos finales */}
        <h3 className="mt-6 text-lg font-bold">
          Saldo Final en Pesos: {saldoFinalEnPesos}
        </h3>
        <h3 className="mt-2 text-lg font-bold">
          Saldo Final en Dólares: {saldoFinalEnDolares}
        </h3>

        <button
          type="submit"
          className="mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Guardar Estado Contable
        </button>
      </form>
    </div>
  );
};

export default AltaEstadoContable;
