"use client";

import React, { useState, useEffect } from "react";
import { getSocio, updateSocio } from "../../../../Api/api";

const ModificarSocio = ({ socio }) => {
  const [cedulaSocio, setCedulaSocio] = useState(socio?.cedulaSocio);
  const [nroSocio, setNroSocio] = useState(socio?.nroSocio );
  const [nombreSocio, setNombreSocio] = useState(socio?.nombreSocio);
  const [apellidoSocio, setApellidoSocio] = useState(socio?.apellidoSocio);
  const [capitalSocio, setCapitalSocio] = useState(socio?.capitalSocio.toFixed(2) );
  const [telefono, setTelefono] = useState(socio?.telefono );
  const [fechaIngreso, setFechaIngreso] = useState(socio?.fechaIngreso );
  const [fechaIngresoCooperativa, setFechaIngresoCooperativa] = useState(socio?.fechaIngresoCooeprativa );
  const [suplente, setSuplente] = useState(socio?.suplente || null);
  const [errores, setErrores] = useState({});

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
    if (!fechaIngresoCooperativa)
      errores.fechaIngresoCooperativa = "La fecha de ingreso a la cooperativa es obligatoria";

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
      apellidoSocio,
      capitalSocio,
      telefono,
      fechaIngreso,
      fechaIngresoCooperativa,
      suplenteEntity: suplente,
    };

    try {
      const result = await updateSocio(socioUpdate);
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
        </div>
        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarSocio;
