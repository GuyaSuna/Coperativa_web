"use client";

import React, { useState, useEffect } from "react";
import "./FormStyle.css";
import { getSocio, updateSocio, getAllViviendas } from "../../Api/api";

const UpdateSocio = () => {
  const [cedulaSocio, setCedulaSocio] = useState(8765431); //ver
  const [nroSocio, setNroSocio] = useState();
  const [nombreSocio, setNombreSocio] = useState();
  const [apellidoSocio, setApellidoSocio] = useState();
  const [capitalSocio, setCapitalSocio] = useState();
  const [telefonoSocio, setTelefonoSocio] = useState();
  const [fechaIngreso, setFechaIngreso] = useState();
  const [errores, setErrores] = useState({});
  const [viviendasDisponibles, setViviendasDisponibles] = useState([]);
  const [seleccionVivienda, setSeleccionVivienda] = useState("");

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(cedulaSocio);
        setNroSocio(data.nroSocio);
        setNombreSocio(data.nombreSocio);
        setApellidoSocio(data.apellidoSocio);
        setCapitalSocio(data.capitalSocio);
        setTelefono(data.telefono);
        setFechaIngreso(data.fechaIngreso);
        setSeleccionVivienda(data.vivienda ? data.vivienda.nroVivienda : "");
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);

  useEffect(() => {
    fetchViviendasDisponibles();
  }, []);

  const fetchViviendasDisponibles = async () => {
    try {
      const response = await getAllViviendas();
      console.log(response);
      let viviendasDisponibles = [];
      response.forEach((vivienda) => {
        if (
          vivienda.socioTitular === null ||
          vivienda.socioTitular.CedulaSocio === cedulaSocio
        ) {
          viviendasDisponibles.push(vivienda);
        }
      });
      setViviendasDisponibles(viviendasDisponibles);
    } catch (error) {
      console.error("Error al obtener las viviendas:", error);
    }
  };

  const validarFormulario = () => {
    const errores = {};

    if (!cedulaSocio) errores.cedulaSocio = "La cédula es obligatoria";
    if (!nroSocio) errores.nroSocio = "El número de socio es obligatorio";
    if (!nombreSocio) errores.nombreSocio = "El nombre es obligatorio";
    if (!apellidoSocio) errores.apellidoSocio = "El apellido es obligatorio";
    if (!telefonoSocio) errores.telefonoSocio = "El teléfono es obligatorio";
    if (!capitalSocio) errores.capitalSocio = "El capital es obligatorio";
    if (!fechaIngreso)
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";

    if (!seleccionVivienda)
      errores.seleccionVivienda = "La selección de vivienda es obligatoria";

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validarFormulario()) return;
    try {
      await updateSocio(
        cedulaSocio,
        nroSocio,
        nombreSocio,
        apellidoSocio,
        capitalSocio,
        telefonoSocio,
        fechaIngreso,
        viviendasDisponibles,
        seleccionVivienda
      );
      alert("Anda el update");
    } catch (error) {
      console.error(`An error has occurred updateSocio: ${error.message}`);
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
            value={nroSocio}
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
            value={nombreSocio}
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
            value={apellidoSocio}
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
            value={cedulaSocio}
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
            value={telefonoSocio}
            onChange={(e) => setTelefonoSocio(e.target.value)}
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
            value={capitalSocio}
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
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            className="input"
          />
          {errores.fechaIngreso && (
            <span className="error">{errores.fechaIngreso}</span>
          )}
        </label>
        <br />
        <label className="label">
          Seleccione una vivienda:
          <select
            name="seleccionVivienda"
            value={seleccionVivienda}
            onChange={(e) => setSeleccionVivienda(e.target.value)}
            className="select"
          >
            <option value="">Seleccione una vivienda</option>
            {viviendasDisponibles.map((vivienda) => (
              <option key={vivienda.nroVivienda} value={vivienda.nroVivienda}>
                {`Vivienda Nro.: ${vivienda.nroVivienda} - ${vivienda.cantidadDormitorios} dormitorios`}
              </option>
            ))}
          </select>
          {errores.seleccionVivienda && (
            <span className="error">{errores.seleccionVivienda}</span>
          )}
        </label>
        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default UpdateSocio;
