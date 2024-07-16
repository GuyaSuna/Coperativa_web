"use client";

import React, { useState, useEffect } from "react";
import "./FormStyle.css";
import { useRouter } from "next/navigation";
import { postSocio, postSuplente, getAllViviendas } from "../../Api/api.js";

const SocioForm = () => {
  const router = useRouter();
  const [CedulaSocio, setCedulaSocio] = useState("");
  const [NroSocio, setNroSocio] = useState("");
  const [NombreSocio, setNombreSocio] = useState("");
  const [ApellidoSocio, setApellidoSocio] = useState("");
  const [TelefonoSocio, setTelefonoSocio] = useState("");
  const [CapitalSocio, setCapitalSocio] = useState("");
  const [FechaIngreso, setFechaIngreso] = useState("");
  const [CedulaSuplente, setCedulaSuplente] = useState("");
  const [NombreSuplente, setNombreSuplente] = useState("");
  const [ApellidoSuplente, setApellidoSuplente] = useState("");
  const [TelefonoSuplente, setTelefonoSuplente] = useState("");
  const [TieneSuplente, setTieneSuplente] = useState(false);
  const [ViviendasDisponibles, setViviendasDisponibles] = useState([]);
  const [SeleccionVivienda, setSeleccionVivienda] = useState("");
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    fetchViviendasDisponibles();
  }, []);

  const fetchViviendasDisponibles = async () => {
    try {
      const response = await getAllViviendas();
      console.log(response);
      let viviendasDisponibles = [];
      response.forEach((vivienda) => {
        if (vivienda.socioTitular === null) {
          viviendasDisponibles.push(vivienda);
        }
      });
      setViviendasDisponibles(viviendasDisponibles);
      console.log(response, "no anda response");
    } catch (error) {
      console.error("Error al obtener las viviendas:", error);
    }
  };

  const handleChangeSeleccionVivienda = async (e) => {
    setSeleccionVivienda(e.target.value);
  };

  const handleChangeCedulaSocio = (e) => {
    setCedulaSocio(e.target.value);
  };

  const handleChangeNroSocio = (e) => {
    setNroSocio(e.target.value);
  };

  const handleChangeNombreSocio = (e) => {
    setNombreSocio(e.target.value);
  };

  const handleChangeApellidoSocio = (e) => {
    setApellidoSocio(e.target.value);
  };

  const handleChangeTelefonoSocio = (e) => {
    setTelefonoSocio(e.target.value);
  };

  const handleChangeCapitalSocio = (e) => {
    setCapitalSocio(e.target.value);
  };

  const handleChangeFechaIngreso = (e) => {
    setFechaIngreso(e.target.value);
  };

  const handleChangeTelefonoSuplente = (e) => {
    setTelefonoSuplente(e.target.value);
  };

  const handleChangeNombreSuplente = (e) => {
    setNombreSuplente(e.target.value);
  };

  const handleChangeApellidoSuplente = (e) => {
    setApellidoSuplente(e.target.value);
  };

  const handleChangeCedulaSuplente = (e) => {
    setCedulaSuplente(e.target.value);
  };

  const handleChangeTieneSuplente = (e) => {
    setTieneSuplente(e.target.checked);
  };

  const validarFormulario = () => {
    const errores = {};

    if (!CedulaSocio) errores.cedulaSocio = "La cédula es obligatoria";
    if (!NroSocio) errores.nroSocio = "El número de socio es obligatorio";
    if (!NombreSocio) errores.nombreSocio = "El nombre es obligatorio";
    if (!ApellidoSocio) errores.apellidoSocio = "El apellido es obligatorio";
    if (!TelefonoSocio) errores.telefonoSocio = "El teléfono es obligatorio";
    if (!CapitalSocio) errores.capitalSocio = "El capital es obligatorio";
    if (!FechaIngreso)
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";
    if (!SeleccionVivienda)
      errores.seleccionVivienda = "La selección de vivienda es obligatoria";

    if (TieneSuplente) {
      if (!CedulaSuplente)
        errores.cedulaSuplente = "La cédula del suplente es obligatoria";
      if (!NombreSuplente)
        errores.nombreSuplente = "El nombre del suplente es obligatorio";
      if (!ApellidoSuplente)
        errores.apellidoSuplente = "El apellido del suplente es obligatorio";
      if (!TelefonoSuplente)
        errores.telefonoSuplente = "El teléfono del suplente es obligatorio";
    }
    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    const SocioData = {
      cedulaSocio: CedulaSocio,
      nroSocio: NroSocio,
      nombreSocio: NombreSocio,
      apellidoSocio: ApellidoSocio,
      telefonoSocio: TelefonoSocio,
      capitalSocio: CapitalSocio,
      fechaIngreso: FechaIngreso,
    };
    const SuplenteData = {
      cedulaSuplente: CedulaSuplente,
      nombreSuplente: NombreSuplente,
      apellidoSuplente: ApellidoSuplente,
      telefonoSuplente: TelefonoSuplente,
    };
    const ViviendaData = {
      nroVivienda: SeleccionVivienda,
      cantidadDormitorios:
        ViviendasDisponibles.find((v) => v.nroVivienda === SeleccionVivienda)
          ?.cantidadDormitorios || 0,
    };
    console.log(SocioData);

    try {
      const response = await postSocio(SocioData);
      console.log(response);
      if (TieneSuplente === true) {
        const responseSuplente = await postSuplente(SuplenteData, CedulaSocio);
        console.log(responseSuplente);
      }
      const responseVivienda = await postVivienda(ViviendaData, CedulaSocio);
      console.log(responseVivienda);
      router.push(`/UserInfo/${NroSocio}`);
    } catch (error) {
      console.error("Error al enviar los datos del socio:", error);
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
            value={NroSocio}
            onChange={handleChangeNroSocio}
            className="input"
          />
          {Errores.nroSocio && (
            <span className="error">{Errores.nroSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Nombres:
          <input
            type="text"
            name="nombreSocio"
            value={NombreSocio}
            onChange={handleChangeNombreSocio}
            className="input"
          />
          {Errores.nombreSocio && (
            <span className="error">{Errores.nombreSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Apellidos:
          <input
            type="text"
            name="apellidoSocio"
            value={ApellidoSocio}
            onChange={handleChangeApellidoSocio}
            className="input"
          />
          {Errores.apellidoSocio && (
            <span className="error">{Errores.apellidoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Número de CI.:
          <input
            type="text"
            name="cedulaSocio"
            value={CedulaSocio}
            onChange={handleChangeCedulaSocio}
            className="input"
          />
          {Errores.cedulaSocio && (
            <span className="error">{Errores.cedulaSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Teléfono:
          <input
            type="text"
            name="telefonoSocio"
            value={TelefonoSocio}
            onChange={handleChangeTelefonoSocio}
            className="input"
          />
          {Errores.telefonoSocio && (
            <span className="error">{Errores.telefonoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Capital:
          <input
            type="text"
            name="capitalSocio"
            value={CapitalSocio}
            onChange={handleChangeCapitalSocio}
            className="input"
          />
          {Errores.capitalSocio && (
            <span className="error">{Errores.apellidoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Fecha de Ingreso:
          <input
            type="date"
            name="fechaIngreso"
            value={FechaIngreso}
            onChange={handleChangeFechaIngreso}
            className="input"
          />
          {Errores.apellidoSocio && (
            <span className="error">{Errores.apellidoSocio}</span>
          )}
        </label>
        <br />
        <label className="label">
          Seleccione una vivienda:
          <select
            name="seleccionVivienda"
            value={SeleccionVivienda}
            onChange={handleChangeSeleccionVivienda}
            className="select"
          >
            <option value="">Seleccione una vivienda</option>
            {ViviendasDisponibles.map((vivienda) => (
              <option key={vivienda.nroVivienda} value={vivienda.nroVivienda}>
                {`Vivienda Nro.: ${vivienda.nroVivienda} - ${vivienda.cantidadDormitorios} dormitorios`}
              </option>
            ))}
          </select>
          {Errores.seleccionVivienda && (
            <span className="error">{Errores.seleccionVivienda}</span>
          )}
        </label>
        <br />
        <label className="label">
          Suplente:
          <input
            type="checkbox"
            name="tieneSuplente"
            checked={TieneSuplente}
            onChange={handleChangeTieneSuplente}
            className="checkbox"
          />
        </label>
        <br />
        {TieneSuplente && (
          <>
            <label className="label">
              Nombre del Suplente:
              <input
                type="text"
                name="nombreSuplente"
                value={NombreSuplente}
                onChange={handleChangeNombreSuplente}
                className="input"
              />
              {Errores.nombreSuplente && (
                <span className="error">{Errores.nombreSuplente}</span>
              )}
            </label>
            <br />
            <label className="label">
              Apellido del Suplente:
              <input
                type="text"
                name="apellidoSuplente"
                value={ApellidoSuplente}
                onChange={handleChangeApellidoSuplente}
                className="input"
              />
              {Errores.apellidoSuplente && (
                <span className="error">{Errores.apellidoSuplente}</span>
              )}
            </label>
            <br />
            <label className="label">
              Número de CI del Suplente:
              <input
                type="text"
                name="cedulaSuplente"
                value={CedulaSuplente}
                onChange={handleChangeCedulaSuplente}
                className="input"
              />
              {Errores.cedulaSuplente && (
                <span className="error">{Errores.cedulaSuplente}</span>
              )}
            </label>
            <br />
            <label className="label">
              Teléfono del Suplente:
              <input
                type="text"
                name="telefonoSuplente"
                value={TelefonoSuplente}
                onChange={handleChangeTelefonoSuplente}
                className="input"
              />
              {Errores.telefonoSuplente && (
                <span className="error">{Errores.telefonoSuplente}</span>
              )}
            </label>
            <br />
          </>
        )}
        <button type="submit" className="button">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default SocioForm;
