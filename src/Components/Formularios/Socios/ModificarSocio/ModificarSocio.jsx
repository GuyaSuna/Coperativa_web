"use client";

import React, { useState, useEffect } from "react";
import { getSocio, updateSocio } from "../../../../Api/api";

const ModificarSocio = ({ cedulaSocioParam }) => {
  console.log(" Es Esto: ");
  console.log(cedulaSocioParam);
  const [cedulaSocio, setCedulaSocio] = useState("");
  const [nroSocio, setNroSocio] = useState("");
  const [nombreSocio, setNombreSocio] = useState("");
  const [apellidoSocio, setApellidoSocio] = useState("");
  const [capitalSocio, setCapitalSocio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaIngresoCooperativa , setFechaIngresoCooperativa] = useState("");
  const [suplente , setSuplente] = useState(null);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setCedulaSocio(cedulaSocioParam);
  }, []);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(cedulaSocio);
        if (data) {
          // Procesa y establece las fechas
          const ingreso = data.fechaIngreso ? new Date(data.fechaIngreso).toISOString().split('T')[0] : "";
          console.log("Fecha Ingreso Cooperativa recibida:", data.fechaIngresoCooperativa);
const ingresoCooperativa = data.fechaIngresoCooperativa ? new Date(data.fechaIngresoCooperativa).toISOString().split('T')[0] : "";
console.log("Fecha Ingreso Cooperativa formateada:", ingresoCooperativa);
setFechaIngresoCooperativa(ingresoCooperativa);
          
          setFechaIngresoCooperativa(ingresoCooperativa);
          setFechaIngreso(ingreso);
          
          setNroSocio(data.nroSocio || "");
          setNombreSocio(data.nombreSocio || "");
          setApellidoSocio(data.apellidoSocio || "");
          setCapitalSocio(data.capitalSocio || "");
          setTelefono(data.telefono || "");
          setSuplente(data.suplenteEntity);
        }
        console.log(data);
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
    if (!fechaIngreso)
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";
    if(!fechaIngresoCooperativa) errores.fechaIngresoCooperativa="La fecha de ingreso a la cooperativa es obligatoria";
    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(fechaIngreso);
    if (!validarFormulario()) return;
    let socioUpdate={
      cedulaSocio,
      nroSocio,
      nombreSocio,
      apellidoSocio,
      capitalSocio,
      telefono,
      fechaIngreso,
      fechaIngresoCooperativa,
      suplenteEntity : suplente,
    }
    try {
      const result = await updateSocio(socioUpdate);
      
      
      console.log("Socio actualizado:", result);
    } catch (error) {
      console.error("Error al actualizar socio:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "¿Estás seguro de que quieres eliminar este socio?"
    );
    if (confirmDelete) {
      try {
        await deleteSocio(cedulaSocio);
        alert("Socio eliminado con éxito");
      } catch (error) {
        console.error(`An error has occurred in deleteSocio: ${error.message}`);
      }
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
        <br/>
        <label className="label">
          Fecha de Ingreso:
          <input
            type="date"
            name="fechaIngreso"
            value={fechaIngreso || ""}
            onChange={(e) => setFechaIngreso(e.target.value)}
            className="input"
          />
          {errores.fechaIngreso && (
            <span className="error">{errores.fechaIngreso}</span>
          )}
        </label>
        <br />
        <label className="label">
          Fecha de Ingreso Cooperativa:
          <input
            type="date"
            name="fechaIngresoCooperativa"
            value={fechaIngresoCooperativa || ""}
            onChange={(e) => setFechaIngresoCooperativa(e.target.value)}
            className="input"
          />
          {errores.fechaIngresoCooperativa && (
            <span className="error">{errores.fechaIngresoCooperativa}</span>
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

export default ModificarSocio;
