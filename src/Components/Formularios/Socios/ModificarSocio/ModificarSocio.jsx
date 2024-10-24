"use client";

import React, { useState, useEffect, useContext } from "react";
import { getSocio, updateSocio , getAllViviendas} from "../../../../Api/api";
import { MiembroContext } from "@/Provider/provider";

const ModificarSocio = ({ socio }) => {
  const [cedulaSocio, setCedulaSocio] = useState(socio?.cedulaSocio);
  const [nroSocio, setNroSocio] = useState(socio?.nroSocio);
  const [nombreSocio, setNombreSocio] = useState(socio?.nombreSocio);
  const [apellidoSocio, setApellidoSocio] = useState(socio?.apellidoSocio);
  const [capitalSocio, setCapitalSocio] = useState(socio?.capitalSocio.toFixed(2));
  const [telefono, setTelefono] = useState(socio?.telefono);
  const [fechaIngreso, setFechaIngreso] = useState(socio?.fechaIngreso);
  const [fechaIngresoCooperativa, setFechaIngresoCooperativa] = useState(socio?.fechaIngresoCooperativa);
  const [suplente, setSuplente] = useState(socio?.suplente || null);
  const [viviendas, setViviendas] = useState([]);
  const [viviendaSocio, setViviendaSocio] = useState(null);
  const [viviendaSeleccionada, setViviendaSeleccionada] = useState(null);
  const [errores, setErrores] = useState({});
  const {cooperativa} = useContext(MiembroContext);

  useEffect(() => {
    console.log(socio);
    fetchViviendas();
  }, []);

  const fetchViviendas = async () => {
    const response = await getAllViviendas(cooperativa.idCooperativa);
    const viviendaSocioFilter = response.find(vivienda => vivienda.socio?.cedulaSocio === socio.cedulaSocio);
    setViviendaSocio(viviendaSocioFilter);
    setViviendaSeleccionada(viviendaSocioFilter?.idVivienda);
    const viviendasFiltradas = response.filter(vivienda => !vivienda.socio);
    setViviendas(viviendasFiltradas);
  };

  const validarFormulario = () => {
    const errores = {};
  
    // Verificar si la cédula es válida
    if (!cedulaSocio) {
      errores.cedulaSocio = "La cédula es obligatoria";
    } else if (isNaN(cedulaSocio)) {
      errores.cedulaSocio = "La cédula debe ser un número";
    }
  
    // Validar el número de socio
    if (!nroSocio) {
      errores.nroSocio = "El número de socio es obligatorio";
    } else if (isNaN(nroSocio)) {
      errores.nroSocio = "El número de socio debe ser un número";
    } else if (nroSocio < 1) {
      errores.nroSocio = "El número de socio debe ser mayor a 0";
    }
  
    // Validar el nombre
    if (!nombreSocio) {
      errores.nombreSocio = "El nombre es obligatorio";
    } else if (/[^a-zA-Z\s]/.test(nombreSocio)) {
      errores.nombreSocio = "El nombre solo debe contener letras";
    }
  
    // Validar el apellido
    if (!apellidoSocio) {
      errores.apellidoSocio = "El apellido es obligatorio";
    } else if (/[^a-zA-Z\s]/.test(apellidoSocio)) {
      errores.apellidoSocio = "El apellido solo debe contener letras";
    }
  
    // Validar el teléfono
    if (!telefono) {
      errores.telefono = "El teléfono es obligatorio";
    } else if (isNaN(telefono)) {
      errores.telefono = "El teléfono debe ser un número";
    }
  
    // Validar el capital
    if (!capitalSocio) {
      errores.capitalSocio = "El capital es obligatorio";
    } else if (isNaN(capitalSocio)) {
      errores.capitalSocio = "El capital debe ser un número";
    }
  
    // Validar la fecha de ingreso
    if (!fechaIngreso) {
      errores.fechaIngreso = "La fecha de ingreso es obligatoria";
    }
  
    // Validar la fecha de ingreso a la cooperativa
    if (!fechaIngresoCooperativa) {
      errores.fechaIngresoCooperativa = "La fecha de ingreso a la cooperativa es obligatoria";
    } else {
      const fechaIngresoC = new Date(fechaIngresoCooperativa);
      const fechaHoy = new Date();
  
      if (fechaIngresoC > fechaHoy) {
        errores.fechaIngresoCooperativa = "La fecha de ingreso no puede ser mayor a la fecha actual";
      }
    }
  
    // Validar datos del suplente si existe uno
    if (suplente) {
      if (!suplente.cedulaSuplente) {
        errores.cedulaSuplente = "La cédula del suplente es obligatoria";
      } else if (isNaN(suplente.cedulaSuplente)) {
        errores.cedulaSuplente = "La cédula del suplente debe ser un número";
      }
  
      if (!suplente.nombreSuplente) {
        errores.nombreSuplente = "El nombre del suplente es obligatorio";
      } else if (/[^a-zA-Z\s]/.test(suplente.nombreSuplente)) {
        errores.nombreSuplente = "El nombre del suplente solo debe contener letras";
      }
  
      if (!suplente.apellidoSuplente) {
        errores.apellidoSuplente = "El apellido del suplente es obligatorio";
      } else if (/[^a-zA-Z\s]/.test(suplente.apellidoSuplente)) {
        errores.apellidoSuplente = "El apellido del suplente solo debe contener letras";
      }
  
      if (!suplente.telefonoSuplente) {
        errores.telefonoSuplente = "El teléfono del suplente es obligatorio";
      } else if (isNaN(suplente.telefonoSuplente)) {
        errores.telefonoSuplente = "El teléfono del suplente debe ser un número";
      }
    }
  
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const socioUpdate = {
      cedulaSocio,
      nroSocio,
      nombreSocio,
      archivado : socio.archivado,
      apellidoSocio,
      capitalSocio,
      telefono,
      fechaIngreso,
      fechaIngresoCooperativa,
      suplenteEntity: suplente,
    };

    try {
      console.log(viviendaSeleccionada)
      await updateSocio(socioUpdate, viviendaSeleccionada);
    } catch (error) {
      console.error("Error al actualizar socio:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nro. Socio:
              <input
                type="text"
                name="nroSocio"
                value={nroSocio}
                onChange={(e) => setNroSocio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.nroSocio && (
                <span className="error">{errores.nroSocio}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nombres:
              <input
                type="text"
                name="nombreSocio"
                value={nombreSocio}
                onChange={(e) => setNombreSocio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.nombreSocio && (
                <span className="error">{errores.nombreSocio}</span>
              )}
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Apellidos:
              <input
                type="text"
                name="apellidoSocio"
                value={apellidoSocio}
                onChange={(e) => setApellidoSocio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.apellidoSocio && (
                <span className="error">{errores.apellidoSocio}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Número de CI.:
              <input
                type="text"
                name="cedulaSocio"
                value={cedulaSocio}
                onChange={(e) => setCedulaSocio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.cedulaSocio && (
                <span className="error">{errores.cedulaSocio}</span>
              )}
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Teléfono:
              <input
                type="text"
                name="telefonoSocio"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.telefonoSocio && (
                <span className="error">{errores.telefonoSocio}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Capital:
              <input
                type="text"
                name="capitalSocio"
                value={capitalSocio}
                onChange={(e) => setCapitalSocio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.capitalSocio && (
                <span className="error">{errores.capitalSocio}</span>
              )}
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Fecha de Ingreso:
              <input
                type="date"
                name="fechaIngreso"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.fechaIngreso && (
                <span className="error">{errores.fechaIngreso}</span>
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Fecha de Ingreso Cooperativa:
              <input
                type="date"
                name="fechaIngresoCooperativa"
                value={fechaIngresoCooperativa}
                onChange={(e) => setFechaIngresoCooperativa(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errores.fechaIngresoCooperativa && (
                <span className="error">{errores.fechaIngresoCooperativa}</span>
              )}
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <label className="block text-sm font-medium mb-2">
              Vivienda:
              <select
                name="vivienda"
                value={viviendaSeleccionada}
                onChange={(e) => setViviendaSeleccionada(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
          
                {viviendaSocio && (
                  <option value={viviendaSocio.idVivienda}>
                    {viviendaSocio.nroVivienda} (Actual)
                  </option>
                )}
                {/* Mostrar viviendas disponibles */}
                {viviendas.map((vivienda) => (
                  <option key={vivienda.idVivienda} value={vivienda.idVivienda}>
                    {vivienda.nroVivienda}
                  </option>
                ))}
              </select>
              {errores.idVivienda && <span className="error">{errores.idVivienda}</span>}
            </label>
          </div>
        </div>
        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarSocio;
