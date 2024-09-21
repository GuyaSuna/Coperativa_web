"use client";

import React, { useState, useEffect } from "react";
import { postDevolucionCapital, getSocio } from "../../../../Api/api.js";

const DevolucionCapital = ({ cedula, setIdentificadorComponente }) => {
  const [socio, setSocio] = useState(null);
  const [capitalDescuento, setCapitalDescuento] = useState("");
  const [razonRetiro, setRazonRetiro] = useState("");
  const [tipoRetiro, setTipoRetiro] = useState(""); 
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const socioData = await getSocio(cedula);
        setSocio(socioData);
      } catch (error) {
        console.error("Error al obtener los datos del socio:", error);
      }
    };

    fetchSocio();
  }, [cedula]);

  const handleChangeCapitalDescuento = (e) => setCapitalDescuento(e.target.value);
  const handleChangeRazonRetiro = (e) => setRazonRetiro(e.target.value);
  const handleChangeTipoRetiro = (e) => setTipoRetiro(e.target.value);

  const validarFormulario = () => {
    const errores = {};

    if (!capitalDescuento) errores.capitalDescuento = "El descuento de capital es obligatorio";
    if (!razonRetiro) errores.razonRetiro = "La razón del retiro es obligatoria";
    if (!tipoRetiro) errores.tipoRetiro = "Debe especificar el tipo de retiro";

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const devolucionData = {
      cedula: socio.cedula,
      capitalDescuento,
      razonRetiro,
      tipoRetiro,
    };

    try {
      const response = await postDevolucionCapital(devolucionData);
      if (response.status === 201) {
        alert("Devolución de capital registrada con éxito");
      } else {
        alert("Error al registrar la devolución");
      }
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
            <label className="block text-sm font-medium mb-2">Nombre:</label>
            <p>{socio.nombre}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Apellido:</label>
            <p>{socio.apellido}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cédula:</label>
            <p>{socio.cedula}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Capital:</label>
            <p>{socio.capital}</p>
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
              <option value="Expulsado">Expulsado</option>
              <option value="Decisión propia">Decisión propia</option>
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
