"use client";

import React, { useState, useEffect } from "react";
import "./FormStyle.css";
import { getSocio, updateSocio, getAllViviendas } from "../../../../Api/api";

const ModificarSocio = ({cedulaSocioParam}) => {
  console.log(" Es Esto: ")
  console.log(cedulaSocioParam)
  const [cedulaSocio, setCedulaSocio] = useState("");
  const [nroSocio, setNroSocio] = useState("");
  const [nombreSocio, setNombreSocio] = useState("");
  const [apellidoSocio, setApellidoSocio] = useState("");
  const [capitalSocio, setCapitalSocio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [FechaIngreso, setFechaIngreso] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setCedulaSocio(cedulaSocioParam);
  },[])

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(cedulaSocio);
        if (data) {
          setNroSocio(data.nroSocio || "");
          setNombreSocio(data.nombreSocio || "");
          setApellidoSocio(data.apellidoSocio || "");
          setCapitalSocio(data.capitalSocio || "");
          setTelefono(data.telefono || "");
          setFechaIngreso(
            data.FechaIngreso ? data.FechaIngreso.substring(0, 10) : ""
          ); // Guriceeeee esto valida que el date se el año/mes/dia
        }
        console.log(data)
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);

  const validarFormulario = () => {
    const errores = {};

    if (!cedulaSocio) errores.cedulaSocio = "La cédula es obligatoria";
    if (!nroSocio) errores.nroSocio = "El número de socio es obligatorio";
    if (!nombreSocio) errores.nombreSocio = "El nombre es obligatorio";
    if (!apellidoSocio) errores.apellidoSocio = "El apellido es obligatorio";
    if (!telefono) errores.Telefono = "El teléfono es obligatorio";
    if (!capitalSocio) errores.capitalSocio = "El capital es obligatorio";
    if (!FechaIngreso)
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";
    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const result = await updateSocio(
        cedulaSocio,
        nroSocio,
        nombreSocio,
        apellidoSocio,
        capitalSocio,
        telefono,
        FechaIngreso
      );
      console.log("Socio actualizado:", result);
    } catch (error) {
      console.error("Error al actualizar socio:", error);
    }
  };

  return (
    <div className="general-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nro. Socio:
          <input
            type="text"
            name="nroSocio"
            value={nroSocio || ""}
            onChange={(e) => setNroSocio(e.target.value)}
            className="input"
          />
          {errores.nroSocio && (
            <span className="error">{errores.nroSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Nombres:
          <input
            type="text"
            name="nombreSocio"
            value={nombreSocio || ""}
            onChange={(e) => setNombreSocio(e.target.value)}
            className="input"
          />
          {errores.nombreSocio && (
            <span className="error">{errores.nombreSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Apellidos:
          <input
            type="text"
            name="apellidoSocio"
            value={apellidoSocio || ""}
            onChange={(e) => setApellidoSocio(e.target.value)}
            className="input"
          />
          {errores.apellidoSocio && (
            <span className="error">{errores.apellidoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Número de CI.:
          <input
            type="text"
            name="cedulaSocio"
            value={cedulaSocio || ""}
            onChange={(e) => setCedulaSocio(e.target.value)}
            className="input"
          />
          {errores.cedulaSocio && (
            <span className="error">{errores.cedulaSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Teléfono:
          <input
            type="text"
            name="telefonoSocio"
            value={telefono || ""}
            onChange={(e) => setTelefono(e.target.value)}
            className="input"
          />
          {errores.telefonoSocio && (
            <span className="error">{errores.telefonoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Capital:
          <input
            type="text"
            name="capitalSocio"
            value={capitalSocio || ""}
            onChange={(e) => setCapitalSocio(e.target.value)}
            className="input"
          />
          {errores.capitalSocio && (
            <span className="error">{errores.capitalSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Fecha de Ingreso:
          <input
            type="date"
            name="fechaIngreso"
            value={FechaIngreso || ""}
            onChange={(e) => setFechaIngreso(e.target.value)}
            className="input"
          />
          {errores.fechaIngreso && (
            <span className="error">{errores.fechaIngreso}</span>
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

export default ModificarSocio;
