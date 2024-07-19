"use client";

import React from "react";
import { getSocio, updateSocio } from "@/Api/api"; // ver
import Link from "next/link";
import { useRouter } from "next/router"; //ver

const UpdateSocio = () => {
  const router = useRouter();

  const [cedulaSocio, setCedulaSocio] = useState(); //ver
  const [nroSocio, setNroSocio] = useState();
  const [nombreSocio, setNombreSocio] = useState();
  const [apellidoSocio, setApellidoSocio] = useState();
  const [capitalSocio, setCapitalSocio] = useState();
  const [telefonoSocio, setTelefonoSocio] = useState();
  const [fechaIngreso, setFechaIngreso] = useState();
  const [errores, setErrores] = useState({});
  const [viviendasDisponibles, setViviendasDisponibles] = useState([]);
  const [seleccionVivienda, setSeleccionVivienda] = useState("");
  const [tieneSuplente, setTieneSuplente] = useState(false);
  const [nombreSuplente, setNombreSuplente] = useState("");
  const [apellidoSuplente, setApellidoSuplente] = useState("");
  const [cedulaSuplente, setCedulaSuplente] = useState("");
  const [telefonoSuplente, setTelefonoSuplente] = useState("");

  useEffect(() => {
    // Lógica para obtener los datos del socio por cedulaSocio y rellenar el formulario, ver.
    const fetchSocio = async () => {
      try {
        const response = await fetch(`${URL}/socio/${cedulaSocio}`);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        setNroSocio(data.nroSocio);
        setNombreSocio(data.nombreSocio);
        setApellidoSocio(data.apellidoSocio);
        setCapitalSocio(data.capitalSocio);
        setTelefono(data.telefono);
        setFechaIngreso(data.fechaIngreso);
        setSuplente(data.suplente); //ver
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
        seleccionVivienda,
        tieneSuplente,
        nombreSuplente,
        apellidoSuplente,
        cedulaSuplente,
        telefonoSuplente
      );
      router.push("/AdministradorHome"); // ver
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
            value={FechaIngreso}
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
        <br />
        <label className="label">
          Suplente:
          <input
            type="checkbox"
            name="tieneSuplente"
            checked={tieneSuplente}
            onChange={(e) => setTieneSuplente(e.target.checked)}
            className="checkbox"
          />
        </label>
        <br />
        {tieneSuplente && (
          <>
            <label className="label">
              Nombre del Suplente:
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
              Apellido del Suplente:
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
              Número de CI del Suplente:
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
              Teléfono del Suplente:
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
            <br />
          </>
        )}
        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default UpdateSocio;
