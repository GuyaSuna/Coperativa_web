"use client";

import React, { useState, useEffect } from "react";
import { postDevolucionCapital, getSocio } from "../../../../Api/api.js";

const DevolucionCapital = ({ socio, setIdentificadorComponente }) => {

  const [capitalDescuento, setCapitalDescuento] = useState(0);
  const [razonRetiro, setRazonRetiro] = useState("");
  const [tipoRetiro, setTipoRetiro] = useState(""); 
  const [errores, setErrores] = useState({});

  const handleChangeCapitalDescuento = (e) => setCapitalDescuento(e.target.value);
  const handleChangeRazonRetiro = (e) => setRazonRetiro(e.target.value);
  const handleChangeTipoRetiro = (e) => setTipoRetiro(e.target.value);

  const validarFormulario = () => {
    const errores = {};
  
    if (!capitalDescuento) {
      errores.capitalDescuento = "El descuento de capital es obligatorio";
    } else if (isNaN(capitalDescuento)) {
      errores.capitalDescuento = "El descuento de capital debe ser un número";
    } else if (parseFloat(capitalDescuento) < 0) {
      errores.capitalDescuento = "El descuento de capital debe ser un numero positivo";
    }
  
    if (!razonRetiro) {
      errores.razonRetiro = "La razón del retiro es obligatoria";
    } 
  
    if (!tipoRetiro) {
      errores.tipoRetiro = "Debe especificar el tipo de retiro";
    } else if (tipoRetiro !== "True" && tipoRetiro !== "False") {
      errores.tipoRetiro = "El tipo de retiro debe ser 'expulsion' o 'decisionPropia'";
    }
  
    setErrores(errores);
  
    return Object.keys(errores).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    let expulsado;
    if(tipoRetiro == "True"){
      expulsado = true;
    } else{
      expulsado = false;
    }
    const devolucionData = {
      socio,
      porcentajeDescuento: capitalDescuento,
      razon:razonRetiro,
      expulsado : tipoRetiro,
    };

    try {
      const response = await postDevolucionCapital(devolucionData);
      console.log(response)
    } catch (error) {
      console.error("Error al enviar los datos de la devolución:", error);
      alert("Error interno del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      {socio ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre: {socio.nombreSocio}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Apellido: {socio.apellidoSocio}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cédula: {socio.cedulaSocio}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Capital: {socio.capitalSocio.toFixed(2)}</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="capitalDescuento">
              Porcentaje de Descuento de Capital:
            </label>
            <input
              type="text"
              id="capitalDescuento"
              value={capitalDescuento}
              onChange={handleChangeCapitalDescuento}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.capitalDescuento && (
              <span className="text-red-500 text-sm">{errores.capitalDescuento}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="razonRetiro">
              Razón del Retiro:
            </label>
            <textarea
              id="razonRetiro"
              value={razonRetiro}
              onChange={handleChangeRazonRetiro}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.razonRetiro && (
              <span className="text-red-500 text-sm">{errores.razonRetiro}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tipo de Retiro:</label>
            <select
              value={tipoRetiro}
              onChange={handleChangeTipoRetiro}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Seleccione el Tipo de Retiro</option>
              <option value="True">Expulsado</option>
              <option value="False">Decisión propia</option>
            </select>
            {errores.tipoRetiro && (
              <span className="text-red-500 text-sm">{errores.tipoRetiro}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Registrar Devolución de Capital
          </button>
        </form>
      ) : (
        <p>Cargando datos del socio...</p>
      )}
    </div>
  );
};

export default DevolucionCapital;
