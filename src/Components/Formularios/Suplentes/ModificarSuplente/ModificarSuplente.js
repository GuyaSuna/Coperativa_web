"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import { updateSuplente } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const ModificarSuplente = ({ suplenteParam }) => {
  const [cedulaSuplente, setCedulaSuplente] = useState(0);
  const [nombreSuplente, setNombreSuplente] = useState("");
  const [apellidoSuplente, setApellidoSuplente] = useState("");
  const [telefonoSuplente, setTelefonoSuplente] = useState(0);
  const [errores, setErrores] = useState({});

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    if (suplenteParam) {
      setCedulaSuplente(suplenteParam.cedulaSuplente);
      setNombreSuplente(suplenteParam.nombreSuplente);
      setApellidoSuplente(suplenteParam.apellidoSuplente);
      setTelefonoSuplente(suplenteParam.telefonoSuplente);
    }
  }, [suplenteParam]);

  useEffect(() => {
    console.log(cedulaSuplente, "ACAAAAAA");
  }, [cedulaSuplente]);

  const validarFormulario = () => {
    const errores = {};

    if (!cedulaSuplente)
      errores.cedulaSuplente = "La cédula del suplente es obligatoria";
    if (!nombreSuplente)
      errores.nombreSuplente = "El nombre del suplente es obligatorio";
    if (!apellidoSuplente)
      errores.apellidoSuplente = "El apellido del suplente es obligatorio";
    if (!telefonoSuplente)
      errores.telefonoSuplente = "El teléfono del suplente es obligatorio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      await updateSuplente(
        cedulaSuplente,
        apellidoSuplente,
        nombreSuplente,
        telefonoSuplente
      );
    } catch (error) {
      console.error("Error al actualizar suplente:", error);
    }
  };
  return (
    <div className="general-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Cédula del Suplente:
          <input
            type="text"
            name="cedulaSuplente"
            value={cedulaSuplente}
            onChange={(e) => setCedulaSuplente(e.target.value)}
            className="input"
          />
          {errores.cedulaSuplente && (
            <span className="error">{errores.cedulaSuplente}</span>
          )}
        </label>
        <br />
        <label className="label">
          Nombre:
          <input
            type="text"
            name="nombreSuplente"
            value={nombreSuplente}
            onChange={(e) => setNombreSuplente(e.target.value)}
            className="input"
          />
          {errores.nombreSuplente && (
            <span className="error">{errores.nombreSuplente}</span>
          )}
        </label>
        <br />
        <label className="label">
          Apellido:
          <input
            type="text"
            name="apellidoSuplente"
            value={apellidoSuplente}
            onChange={(e) => setApellidoSuplente(e.target.value)}
            className="input"
          />
          {errores.apellidoSuplente && (
            <span className="error">{errores.apellidoSuplente}</span>
          )}
        </label>
        <br />
        <label className="label">
          Teléfono:
          <input
            type="text"
            name="telefonoSuplente"
            value={telefonoSuplente}
            onChange={(e) => setTelefonoSuplente(e.target.value)}
            className="input"
          />
          {errores.telefonoSuplente && (
            <span className="error">{errores.telefonoSuplente}</span>
          )}
        </label>

        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarSuplente;
