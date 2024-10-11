"use client";

import React, { useState } from "react";

const ModificarIngreso = ({ ingresoData }) => {
  const [subRubro, setSubRubro] = useState(ingresoData.subRubro);
  const [denominacion, setDenominacion] = useState(ingresoData.denominacion);
  const [ingreso, setIngreso] = useState(ingresoData.ingreso);
  const [errores, setErrores] = useState({});

  const handleChangeSubRubro = (e) => setSubRubro(e.target.value);
  const handleChangeDenominacion = (e) => setDenominacion(e.target.value);
  const handleChangeIngreso = (e) => setIngreso(e.target.value);

  const validarFormulario = () => {
    const errores = {};

    if (!subRubro) errores.subRubro = "El subrubro es obligatorio";
    if (!denominacion) errores.denominacion = "La denominación es obligatoria";
    if (!ingreso) errores.ingreso = "El ingreso es obligatorio";

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const updatedIngreso = {
      subRubro,
      denominacion,
      ingreso,
    };

    try {
      console.log("Ingreso modificado:", updatedIngreso);
    } catch (error) {
      console.error("Error al modificar el ingreso:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Modificar Ingreso</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="subRubro">
            SubRubro:
          </label>
          <input
            type="text"
            id="subRubro"
            value={subRubro}
            onChange={handleChangeSubRubro}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.subRubro && (
            <span className="text-red-500 text-sm">{errores.subRubro}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="denominacion"
          >
            Denominación:
          </label>
          <input
            type="text"
            id="denominacion"
            value={denominacion}
            onChange={handleChangeDenominacion}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.denominacion && (
            <span className="text-red-500 text-sm">{errores.denominacion}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="ingreso">
            Ingreso:
          </label>
          <input
            type="text"
            id="ingreso"
            value={ingreso}
            onChange={handleChangeIngreso}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.ingreso && (
            <span className="text-red-500 text-sm">{errores.ingreso}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Modificar Ingreso
        </button>
      </form>
    </div>
  );
};

export default ModificarIngreso;
