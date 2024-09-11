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
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
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
    const sumaEgresos = egresos.reduce(
      (total, egreso) => total + egreso.egreso,
      0
    );
    const sumaIngresos = ingresos.reduce(
      (total, ingreso) => total + ingreso.ingreso,
      0
    );

    setTotalEgresos(sumaEgresos);
    setTotalIngresos(sumaIngresos);
    setSaldoFinal(sumaIngresos - sumaEgresos);
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
        <div>
          <ul>
            {listaIngresos.map((ingreso) => (
              <li key={ingreso.id}>
                {ingreso.denominacion} - {ingreso.ingreso} {ingreso.tipoMoneda}
              </li>
            ))}
          </ul>
          <h3>Total Egresos: {totalEgresos}</h3>
        </div>

        <div>
          <ul>
            {listaEgresos.map((egreso) => (
              <li key={egreso.id}>
                {egreso.denominacion} - {egreso.egreso} {egreso.tipoMoneda}
              </li>
            ))}
          </ul>
          <h3>Total Egresos: {totalEgresos}</h3>
        </div>

        <button type="submit">Agregar Estado Contable</button>
      </form>
    </div>
  );
};

export default AltaEstadoContable;
