"use client";

import React, { useEffect, useState, useContext } from "react";
import {
  getAllEgresosByMes,
  getAllIngresosByMes,
  postEstadoContable,
} from "../../../Api/api";
import { MiembroContext } from "../../../Provider/provider";
import "../../Formularios/EstadosContables/StyleEstadoContable.css";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const AltaEstadoContable = () => {
  const { cooperativa } = useContext(MiembroContext); // Obteniendo datos del contexto
  const [id, setId] = useState(0);
  const [fecha, setFecha] = useState("");
  const [saldoFinalEnPesos, setSaldoFinalPesos] = useState(0);
  const [saldoFinalEnDolares, setSaldoFinalDolares] = useState(0);
  const [totalIngresosPesos, setTotalIngresosPesos] = useState(0);
  const [totalIngresosDolares, setTotalIngresosDolares] = useState(0);
  const [totalEgresosPesos, setTotalEgresosPesos] = useState(0);
  const [totalEgresosDolares, setTotalEgresosDolares] = useState(0);

  const [listaEgresos, setListaEgresos] = useState([]);
  const [listaIngresos, setListaIngresos] = useState([]);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  useEffect(() => {
    fetchDatos();
  }, [fecha]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFecha(today);
  }, []);
  const fetchDatos = async () => {
    try {
      if (fecha) {
        const egresos = await getAllEgresosByMes(
          fecha,
          cooperativa.idCooperativa
        );
        const ingresos = await getAllIngresosByMes(
          fecha,
          cooperativa.idCooperativa
        );

        console.log("Egresos", egresos);
        console.log("Ingresos", ingresos);

        setListaEgresos(egresos);
        setListaIngresos(ingresos);

        calcularTotales(egresos, ingresos);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  // const handleId = (e) => setId(e.target.value);
  const handleChangeFecha = (e) => setFecha(e.target.value);

  const calcularTotales = (egresos, ingresos) => {
    // Filtrar y sumar los ingresos y egresos por tipo de moneda
    const sumaIngresosPesos = ingresos
      .filter((ingreso) => ingreso.tipoMoneda === "UYU")
      .reduce((total, ingreso) => total + ingreso.ingreso, 0);

    const sumaIngresosDolares = ingresos
      .filter((ingreso) => ingreso.tipoMoneda === "USD")
      .reduce((total, ingreso) => total + ingreso.ingreso, 0);

    const sumaEgresosPesos = egresos
      .filter((egreso) => egreso.tipoMoneda === "UYU")
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

    setMostrarModal(true);
  };
  const handleConfirmacion = async (e) => {
    e.preventDefault();
    setMostrarModal(false);

    if (!validarFormulario()) return;

    const nuevoEstadoContable = {
      fecha,
      saldoFinalEnPesos,
      saldoFinalEnDolares,
      listaEgresos,
      listaIngresos,
    };
    try {
      console.log("postEstado en Submit", nuevoEstadoContable);
      const response = await postEstadoContable(
        nuevoEstadoContable,
        cooperativa.idCooperativa
      );
      console.log("ESTADO CONTABLE ", response);
    } catch (error) {
      console.error("Error al agregar estado contable:", error);
    }
  };
  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!fecha) {
      errores.fecha = "La fecha del Estado Contable es obligatoria";
    } else if (fecha > fechaHoy) {
      errores.fecha =
        "La fecha del Estado Contable no puede ser mayor a la fecha actual";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg md:max-w-4xl bg-gray-100 dark:bg-gray-900 p-6 md:p-8 rounded-lg shadow-md"
      >
        <label className="block text-sm font-medium mb-4">
          FECHA:
          <input
            type="date"
            name="fecha"
            value={fecha}
            onChange={handleChangeFecha}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          {errores.fecha && (
            <span className="error text-red-500">{errores.fecha}</span>
          )}
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-6 bg-gray-100 dark:bg-gray-900">
          {/* Ingresos en Pesos */}
          <div className="max-h-80 min-h-80">
            <h3 className="font-bold text-lg mb-4">Ingresos en Pesos</h3>
            <ul className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border max-h-48 min-h-48 overflow-y-auto custom-scrollbar">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span>Denom.</span>
                <span>Ingreso</span>
                <span>Moneda</span>
                <span>SubRubro</span>
              </li>
              {listaIngresos
                .filter((ingreso) => ingreso.tipoMoneda === "UYU")
                .map((ingreso) => (
                  <li
                    key={ingreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700 text-black dark:text-white"
                  >
                    <span>{ingreso.denominacion}</span>
                    <span>{ingreso.ingreso}</span>
                    <span>UY</span>
                    <span>{ingreso.subRubro}</span>
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Ingresos en Pesos: {totalIngresosPesos}
            </h3>
          </div>

          {/* Ingresos en Dólares */}
          <div className="max-h-80 min-h-80">
            <h3 className="font-bold text-lg mb-4">Ingresos en Dólares</h3>
            <ul className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border max-h-48 min-h-48 overflow-y-auto custom-scrollbar">
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
                    <span>{ingreso.subRubro}</span>
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Ingresos en Dólares: {totalIngresosDolares}
            </h3>
          </div>

          {/* Egresos en Pesos */}
          <div className="max-h-80 min-h-80">
            <h3 className="font-bold text-lg mb-4">Egresos en Pesos</h3>
            <ul className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border max-h-48 min-h-48 overflow-y-auto custom-scrollbar">
              <li className="grid grid-cols-4 font-medium text-gray-600 mb-2">
                <span className="whitespace-nowrap">Denom.</span>
                <span className="whitespace-nowrap">Egreso</span>
                <span className="whitespace-nowrap">Moneda</span>
                <span className="whitespace-nowrap">SubRubro</span>
              </li>
              {listaEgresos
                .filter((egreso) => egreso.tipoMoneda === "UYU")
                .map((egreso) => (
                  <li
                    key={egreso.id}
                    className="grid grid-cols-4 py-2 border-b dark:border-gray-700"
                  >
                    <span className="truncate">{egreso.denominacion}</span>
                    <span className="truncate">{egreso.egreso}</span>
                    <span>UY</span>
                    <span className="truncate">{egreso.subRubro}</span>
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-gray-800 dark:text-gray-400">
              Total Egresos en Pesos: {totalEgresosPesos}
            </h3>
          </div>

          {/* Egresos en Dólares */}
          <div className="max-h-80 min-h-[20rem]">
            <h3 className="font-bold text-lg mb-4">Egresos en Dólares</h3>
            <ul className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border max-h-48 min-h-48 overflow-y-auto custom-scrollbar">
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
                    <span>{egreso.subRubro}</span>
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
        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea dar de alta este socio?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaEstadoContable;
