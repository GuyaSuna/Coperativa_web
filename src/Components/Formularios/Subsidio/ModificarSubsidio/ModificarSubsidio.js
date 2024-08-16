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
      setFechaOtorgado(subsidioParam.fechaOtorgado);
      setFechaExpira(subsidioParam.fechaExpira);
    }
  }, [subsidioParam]);

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
    if (!validarFormulario()) return;

    try {
      const subsidioActualizado = {
        idSubsidio,
        cuotaTotalUr,
        cuotaApagarUr,
        subsidioUr,
        porcentaje,
        vigenciaEnMeses,
        fechaOtorgado,
        fechaExpira,
        socio: subsidioParam.socio,
      };
      console.log("Datos enviados:", subsidioActualizado);

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
    <div className="general-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Cuota Total UR:
          <input
            type="text"
            name="cuotaTotalUr"
            value={cuotaTotalUr}
            onChange={(e) => setCuotaTotalUr(e.target.value)}
            className="input"
          />
          {errores.cuotaTotalUr && (
            <span className="error">{errores.cuotaTotalUr}</span>
          )}
        </label>
        <br />
        <label className="label">
          Cuota a Pagar UR:
          <input
            type="text"
            name="cuotaApagarUr"
            value={cuotaApagarUr}
            onChange={(e) => setCuotaApagarUr(e.target.value)}
            className="input"
          />
          {errores.cuotaApagarUr && (
            <span className="error">{errores.cuotaApagarUr}</span>
          )}
        </label>
        <br />
        <label className="label">
          Subsidio UR:
          <input
            type="text"
            name="subsidioUr"
            value={subsidioUr}
            onChange={(e) => setSubsidioUr(e.target.value)}
            className="input"
          />
          {errores.subsidioUr && (
            <span className="error">{errores.subsidioUr}</span>
          )}
        </label>
        <br />
        <label className="label">
          Porcentaje:
          <input
            type="text"
            name="porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            className="input"
          />
          {errores.porcentaje && (
            <span className="error">{errores.porcentaje}</span>
          )}
        </label>
        <br />
        <label className="label">
          Vigencia en Meses:
          <input
            type="text"
            name="vigenciaEnMeses"
            value={vigenciaEnMeses}
            onChange={(e) => setVigenciaEnMeses(e.target.value)}
            className="input"
          />
          {errores.vigenciaEnMeses && (
            <span className="error">{errores.vigenciaEnMeses}</span>
          )}
        </label>
        <br />
        <label className="label">
          Fecha Otorgado:
          <input
            type="date"
            name="fechaOtorgado"
            value={fechaOtorgado}
            onChange={(e) => setFechaOtorgado(e.target.value)}
            className="input"
          />
          {errores.fechaOtorgado && (
            <span className="error">{errores.fechaOtorgado}</span>
          )}
        </label>
        <br />
        <label className="label">
          Fecha Expira:
          <input
            type="date"
            name="fechaExpira"
            value={fechaExpira}
            onChange={(e) => setFechaExpira(e.target.value)}
            className="input"
          />
          {errores.fechaExpira && (
            <span className="error">{errores.fechaExpira}</span>
          )}
        </label>
        <br />

        <button type="submit" className="button">
          Modificar
        </button>
        <button type="button" onClick={handleDelete} className="button">
          Borrar
        </button>
      </form>
    </div>
  );
};

export default ModificarSubsidio;
