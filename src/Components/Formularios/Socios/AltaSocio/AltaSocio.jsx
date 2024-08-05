"use client";

import React, { useState, useEffect , useContext } from "react";
import "./FormStyle.css";
import {
  postSocio,
  postSuplente,
  getAllViviendas,
} from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";

const AltaSocio = ({setIdentificadorComponente}) => {
  const {cooperativa} = useContext(MiembroContext)
  const [CedulaSocio, setCedulaSocio] = useState(0);
  const [NroSocio, setNroSocio] = useState(0);
  const [NombreSocio, setNombreSocio] = useState("");
  const [ApellidoSocio, setApellidoSocio] = useState("");
  const [TelefonoSocio, setTelefonoSocio] = useState(0);
  const [CapitalSocio, setCapitalSocio] = useState(0);
  const [FechaIngreso, setFechaIngreso] = useState("");
  const [CedulaSuplente, setCedulaSuplente] = useState(0);
  const [NombreSuplente, setNombreSuplente] = useState("");
  const [ApellidoSuplente, setApellidoSuplente] = useState("");
  const [TelefonoSuplente, setTelefonoSuplente] = useState(0);
  const [TieneSuplente, setTieneSuplente] = useState(false);
  const [ViviendasDisponibles, setViviendasDisponibles] = useState([]);
  const [SeleccionVivienda, setSeleccionVivienda] = useState("");
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    fetchViviendasDisponibles();
  }, []);

  const fetchViviendasDisponibles = async () => {
    try {
      const response = await getAllViviendas(cooperativa.idCooperativa);
      console.log(response);
      let viviendasDisponibles = [];
      response.forEach((vivienda) => {
        if (vivienda.socioTitular === null) {
          viviendasDisponibles.push(vivienda);
        }
      });
      setViviendasDisponibles(viviendasDisponibles);
      console.log("viviendas disponibles" + viviendasDisponibles);
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
  
    if (!CedulaSocio) {
      errores.cedulaSocio = "La cédula es obligatoria";
    } else if (isNaN(CedulaSocio)) {
      errores.cedulaSocio = "La cédula debe ser un número";
    }
  
    if (!NroSocio) {
      errores.nroSocio = "El número de socio es obligatorio";
    } else if (isNaN(NroSocio)) {
      errores.nroSocio = "El número de socio debe ser un número";
    }
    else if (NroSocio < 1){
      errores.nroSocio = "El numero de socio debe ser mayor a 0"
    }

    if (!NombreSocio) {
      errores.nombreSocio = "El nombre es obligatorio";
    } else if (/[^a-zA-Z\s]/.test(NombreSocio)) {
      errores.nombreSocio = "El nombre solo debe contener letras";
    }
  
    if (!ApellidoSocio) {
      errores.apellidoSocio = "El apellido es obligatorio";
    } else if (/[^a-zA-Z\s]/.test(ApellidoSocio)) {
      errores.apellidoSocio = "El apellido solo debe contener letras";
    }
  
    if (!TelefonoSocio) {
      errores.telefonoSocio = "El teléfono es obligatorio";
    } else if (isNaN(TelefonoSocio)) {
      errores.telefonoSocio = "El teléfono debe ser un número";
    }
  
    if (!CapitalSocio) {
      errores.capitalSocio = "El capital es obligatorio";
    } else if (isNaN(CapitalSocio)) {
      errores.capitalSocio = "El capital debe ser un número";
    }
  
    if (!FechaIngreso) {
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";
    }
  
    if (!SeleccionVivienda) {
      errores.seleccionVivienda = "La selección de vivienda es obligatoria";
    }
  
    if (TieneSuplente) {
      if (!CedulaSuplente) {
        errores.cedulaSuplente = "La cédula del suplente es obligatoria";
      } else if (isNaN(CedulaSuplente)) {
        errores.cedulaSuplente = "La cédula del suplente debe ser un número";
      }
  
      if (!NombreSuplente) {
        errores.nombreSuplente = "El nombre del suplente es obligatorio";
      } else if (/[^a-zA-Z\s]/.test(NombreSuplente)) {
        errores.nombreSuplente = "El nombre del suplente solo debe contener letras";
      }
  
      if (!ApellidoSuplente) {
        errores.apellidoSuplente = "El apellido del suplente es obligatorio";
      } else if (/[^a-zA-Z\s]/.test(ApellidoSuplente)) {
        errores.apellidoSuplente = "El apellido del suplente solo debe contener letras";
      }
  
      if (!TelefonoSuplente) {
        errores.telefonoSuplente = "El teléfono del suplente es obligatorio";
      } else if (isNaN(TelefonoSuplente)) {
        errores.telefonoSuplente = "El teléfono del suplente debe ser un número";
      }
    }
  
    setErrores(errores);
  
    return Object.keys(errores).length === 0;
  };
  

  const handleSubmit = async (e) => {
    console.log("ID COOPERATIVA ", cooperativa.idCooperativa)
    e.preventDefault();
    console.log(FechaIngreso);
    if (!validarFormulario()) return;
    const SocioData = {
      cedulaSocio: CedulaSocio,
      nroSocio: NroSocio,
      nombreSocio: NombreSocio,
      apellidoSocio: ApellidoSocio,
      telefono: TelefonoSocio,
      capitalSocio: CapitalSocio,
      fechaIngreso: FechaIngreso,
    };
    const SuplenteData = {
      cedulaSuplente: CedulaSuplente,
      nombreSuplente: NombreSuplente,
      apellidoSuplente: ApellidoSuplente,
      telefonoSuplente: TelefonoSuplente,
    };

    try {
      
      const response = await postSocio(SocioData, SeleccionVivienda, cooperativa.idCooperativa);
      console.log(response);
      if (TieneSuplente === true) {
        const responseSuplente = await postSuplente(SuplenteData, CedulaSocio);
        console.log(responseSuplente);
      }
      setIdentificadorComponente(0);
    } catch (error) {
      console.error("Error al enviar los datos del socio:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nroSocio">
            Nro. Socio:
          </label>
          <input
            type="text"
            id="nroSocio"
            name="nroSocio"
            value={NroSocio}
            onChange={handleChangeNroSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.nroSocio && (
            <span className="text-red-500 text-sm">{Errores.nroSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="nombreSocio"
          >
            Nombres:
          </label>
          <input
            type="text"
            id="nombreSocio"
            name="nombreSocio"
            value={NombreSocio}
            onChange={handleChangeNombreSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.nombreSocio && (
            <span className="text-red-500 text-sm">{Errores.nombreSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="apellidoSocio"
          >
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidoSocio"
            name="apellidoSocio"
            value={ApellidoSocio}
            onChange={handleChangeApellidoSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.apellidoSocio && (
            <span className="text-red-500 text-sm">
              {Errores.apellidoSocio}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="cedulaSocio"
          >
            Número de CI.:
          </label>
          <input
            type="text"
            id="cedulaSocio"
            name="cedulaSocio"
            value={CedulaSocio}
            onChange={handleChangeCedulaSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.cedulaSocio && (
            <span className="text-red-500 text-sm">{Errores.cedulaSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="telefonoSocio"
          >
            Teléfono:
          </label>
          <input
            type="text"
            id="telefonoSocio"
            name="telefonoSocio"
            value={TelefonoSocio}
            onChange={handleChangeTelefonoSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.telefonoSocio && (
            <span className="text-red-500 text-sm">
              {Errores.telefonoSocio}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="capitalSocio"
          >
            Capital:
          </label>
          <input
            type="text"
            id="capitalSocio"
            name="capitalSocio"
            value={CapitalSocio}
            onChange={handleChangeCapitalSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.capitalSocio && (
            <span className="text-red-500 text-sm">{Errores.capitalSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="fechaIngreso"
          >
            Fecha de Ingreso:
          </label>
          <input
            type="date"
            id="fechaIngreso"
            name="fechaIngreso"
            value={FechaIngreso}
            onChange={handleChangeFechaIngreso}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.fechaIngreso && (
            <span className="text-red-500 text-sm">{Errores.fechaIngreso}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="seleccionVivienda"
          >
            Seleccione una vivienda:
          </label>
          <select
            id="seleccionVivienda"
            name="seleccionVivienda"
            value={SeleccionVivienda}
            onChange={handleChangeSeleccionVivienda}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione una vivienda</option>
            {ViviendasDisponibles.map((vivienda) => (
              <option key={vivienda.nroVivienda} value={vivienda.nroVivienda}>
                {`Vivienda Nro.: ${vivienda.nroVivienda} - ${vivienda.cantidadDormitorios} dormitorios`}
              </option>
            ))}
          </select>
          {Errores.seleccionVivienda && (
            <span className="text-red-500 text-sm">
              {Errores.seleccionVivienda}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="tieneSuplente"
          >
            Suplente:
          </label>
          <input
            type="checkbox"
            id="tieneSuplente"
            name="tieneSuplente"
            checked={TieneSuplente}
            onChange={handleChangeTieneSuplente}
            className="mr-2"
          />
        </div>
        {TieneSuplente && (
          <>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="nombreSuplente"
              >
                Nombre del Suplente:
              </label>
              <input
                type="text"
                id="nombreSuplente"
                name="nombreSuplente"
                value={NombreSuplente}
                onChange={handleChangeNombreSuplente}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {Errores.nombreSuplente && (
                <span className="text-red-500 text-sm">
                  {Errores.nombreSuplente}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="apellidoSuplente"
              >
                Apellido del Suplente:
              </label>
              <input
                type="text"
                id="apellidoSuplente"
                name="apellidoSuplente"
                value={ApellidoSuplente}
                onChange={handleChangeApellidoSuplente}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {Errores.apellidoSuplente && (
                <span className="text-red-500 text-sm">
                  {Errores.apellidoSuplente}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="cedulaSuplente"
              >
                Número de CI del Suplente:
              </label>
              <input
                type="text"
                id="cedulaSuplente"
                name="cedulaSuplente"
                value={CedulaSuplente}
                onChange={handleChangeCedulaSuplente}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {Errores.cedulaSuplente && (
                <span className="text-red-500 text-sm">
                  {Errores.cedulaSuplente}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="telefonoSuplente"
              >
                Teléfono del Suplente:
              </label>
              <input
                type="text"
                id="telefonoSuplente"
                name="telefonoSuplente"
                value={TelefonoSuplente}
                onChange={handleChangeTelefonoSuplente}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {Errores.telefonoSuplente && (
                <span className="text-red-500 text-sm">
                  {Errores.telefonoSuplente}
                </span>
              )}
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};
export default AltaSocio;
