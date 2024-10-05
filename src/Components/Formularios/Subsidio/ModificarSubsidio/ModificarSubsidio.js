"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import {
  deleteSubsidio,
  getAllSubsidios,
  updateSubsidio,
} from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const ModificarSubsidio = ({ subsidioParam, setIdentificadorComponente }) => {
  const [idSubsidio, setIdSubsidio] = useState(0);
  const [cuotaTotalUr, setCuotaTotalUr] = useState(0);
  const [cuotaApagarUr, setCuotaApagarUr] = useState(0);
  const [subsidioUr, setSubsidioUr] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [vigenciaEnMeses, setVigenciaEnMeses] = useState(0);
  const [fechaOtorgado, setFechaOtorgado] = useState("");
  const [fechaExpira, setFechaExpira] = useState("");

  const [errores, setErrores] = useState({});

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    if (subsidioParam) {
      setIdSubsidio(subsidioParam.idSubsidio);
      setCuotaTotalUr(subsidioParam.cuotaTotalUr);
      setCuotaApagarUr(subsidioParam.cuotaApagarUr);
      setSubsidioUr(subsidioParam.subsidioUr);
      setPorcentaje(subsidioParam.porcentaje);
      setVigenciaEnMeses(subsidioParam.vigenciaEnMeses);
      // Asegurar que las fechas se manejen correctamente
      const fechaOtorgadoFormatted = new Date(subsidioParam.fechaOtorgado)
        .toISOString()
        .split("T")[0];
      const fechaExpiraFormatted = new Date(subsidioParam.fechaExpira)
        .toISOString()
        .split("T")[0];

      setFechaOtorgado(fechaOtorgadoFormatted);
      setFechaExpira(fechaExpiraFormatted);
    }
  }, [subsidioParam]);

  useEffect(() => {
    if (fechaOtorgado && vigenciaEnMeses) {
      const fechaOtorgamiento = new Date(fechaOtorgado);
      fechaOtorgamiento.setMonth(
        fechaOtorgamiento.getMonth() + parseInt(vigenciaEnMeses)
      );

      const day = ("0" + fechaOtorgamiento.getUTCDate()).slice(-2);
      const month = ("0" + (fechaOtorgamiento.getUTCMonth() + 1)).slice(-2);
      const year = fechaOtorgamiento.getUTCFullYear();

      const nuevaFechaExpira = `${year}-${month}-${day}`;
      setFechaExpira(nuevaFechaExpira);
    }
  }, [vigenciaEnMeses, fechaOtorgado]);

  useEffect(() => {
    if (subsidioUr && cuotaTotalUr) {
      const nuevoPorcentaje = ((subsidioUr / cuotaTotalUr) * 100).toFixed(2);
      setPorcentaje(Math.round(nuevoPorcentaje));
    }
  }, [subsidioUr, cuotaTotalUr]);

  const validarFormulario = () => {
    const errores = {};

    if (!cuotaTotalUr)
      errores.cuotaTotalUr = "La cuota total UR es obligatoria";
    if (!cuotaApagarUr)
      errores.cuotaApagarUr = "La cuota a pagar UR es obligatoria";
    if (!subsidioUr) errores.subsidioUr = "El subsidio UR es obligatorio";
    if (!porcentaje) errores.porcentaje = "El porcentaje es obligatorio";
    if (!vigenciaEnMeses)
      errores.vigenciaEnMeses = "La vigencia en meses es obligatoria";
    if (!fechaOtorgado)
      errores.fechaOtorgado = "La fecha otorgada es obligatoria";
    if (!fechaExpira)
      errores.fechaExpira = "La fecha de expiración es obligatoria";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit ejecutado");
    if (!validarFormulario()) return;

    try {
      const subsidioNuevo = await updateSubsidio(
        idSubsidio,
        cuotaTotalUr,
        cuotaApagarUr,
        subsidioUr,
        porcentaje,
        vigenciaEnMeses,
        fechaOtorgado,
        fechaExpira,
        subsidioParam.socio
      );
      console.log("Subsidio nuevo", subsidioNuevo);
      setIdentificadorComponente(17);
    } catch (error) {
      console.error("Error al actualizar subsidio:", error);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "¿Estás seguro de que quieres eliminar este Subsidio?"
    );
    if (confirmDelete) {
      try {
        await deleteSubsidio(subsidioParam.idSubsidio);
        alert("Subsidio eliminado con éxito");
        setIdentificadorComponente(17);
      } catch (error) {
        console.error(
          `An error has occurred in deleteSubsidio: ${error.message}`
        );
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <label className="block text-sm font-medium mb-2">
          Cuota Total UR:
          <input
            type="text"
            name="cuotaTotalUr"
            value={cuotaTotalUr}
            onChange={(e) => setCuotaTotalUr(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.cuotaTotalUr && (
            <span className="error">{errores.cuotaTotalUr}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Subsidio UR:
          <input
            type="text"
            name="subsidioUr"
            value={subsidioUr}
            onChange={(e) => setSubsidioUr(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.subsidioUr && (
            <span className="error">{errores.subsidioUr}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Porcentaje:
          <input
            type="text"
            name="porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.porcentaje && (
            <span className="error">{errores.porcentaje}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Cuota a Pagar UR:
          <input
            type="text"
            name="cuotaApagarUr"
            value={cuotaApagarUr}
            onChange={(e) => setCuotaApagarUr(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.cuotaApagarUr && (
            <span className="error">{errores.cuotaApagarUr}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Vigencia en Meses:
          <input
            type="text"
            name="vigenciaEnMeses"
            value={vigenciaEnMeses}
            onChange={(e) => setVigenciaEnMeses(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.vigenciaEnMeses && (
            <span className="error">{errores.vigenciaEnMeses}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Fecha Otorgado:
          <input
            type="date"
            name="fechaOtorgado"
            value={fechaOtorgado}
            onChange={(e) => setFechaOtorgado(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.fechaOtorgado && (
            <span className="error">{errores.fechaOtorgado}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Fecha Expira:
          <input
            type="date"
            name="fechaExpira"
            value={fechaExpira}
            onChange={(e) => setFechaExpira(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.fechaExpira && (
            <span className="error">{errores.fechaExpira}</span>
          )}
        </label>
        <br />

        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarSubsidio;
