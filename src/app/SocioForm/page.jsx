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

  useEffect(() => {
    fetchViviendasDisponibles();
  }, []);

  const fetchViviendasDisponibles = async () => {
    try {
      const response = await getAllViviendas();
      setViviendasDisponibles(response);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
