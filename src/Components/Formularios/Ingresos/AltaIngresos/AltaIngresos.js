"use client";

import React, { useState, useContext, useEffect } from "react";
import { postIngreso } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";

const AltaIngreso = () => {
  const [subRubro, setSubRubro] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [errores, setErrores] = useState({});
  const [tipoMoneda, setTipoMoneda] = useState("UR");
  const [fechaDatosContables, setFechaDatosContables] = useState("");

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    setFechaDatosContables(obtenerFechaHoy());
  }, []);

  const handleChangeDenominacion = (e) => setDenominacion(e.target.value);
  const handleChangeIngreso = (e) => setIngreso(e.target.value);
  const handleChangeSeleccionSubRubro = (e) => setSubRubro(e.target.value);
  const handleChangeTipoMoneda = (e) => setTipoMoneda(e.target.value);
  const handleChangeFechaDatosContables = (e) =>
    setFechaDatosContables(e.target.value);

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!subRubro) errores.subRubro = "El subrubro es obligatorio";
    if (!denominacion) errores.denominacion = "La denominación es obligatoria";
    if (!ingreso) errores.ingreso = "El ingreso es obligatorio";
    if (!fechaDatosContables) {
      errores.fechaDatosContables = "La fecha del Ingreso es obligatoria";
    } else if (fechaDatosContables > fechaHoy) {
      errores.fechaDatosContables =
        "La fecha de Ingreso no puede ser mayor a la fecha actual";
    }

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0"); // Asegura que tenga 2 dígitos
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const ingresoData = {
      subRubro,
      denominacion,
      ingreso,
      cooperativaEntity: cooperativa,
      tipoMoneda,
      fechaDatosContables,
    };

    try {
      const response = await postIngreso(ingresoData);
      if (response.status === 201) {
        alert("Error al agregar un Ingreso");
      } else {
        alert("El Ingreso fue agregado exitosamente");
      }
    } catch (error) {
      console.error("Error al enviar los datos del Ingreso:", error);
      alert("Error interno del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Fecha del Ingreso:
            <input
              type="date"
              name="fechaDatosContables"
              value={fechaDatosContables}
              onChange={handleChangeFechaDatosContables}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.fechaDatosContables && (
              <span className="error">{errores.fechaDatosContables}</span>
            )}
          </label>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="seleccionSubVivienda"
          >
            Seleccione el Sub Rubro:
          </label>
          <select
            id="seleccionSubRubro"
            name="seleccionSubRubro"
            value={subRubro}
            onChange={handleChangeSeleccionSubRubro}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione el Sub Rubro</option>
            <option value="Amortización">Amortización</option>
            <option value="Cuota Social">Cuota Social</option>
            <option value="Convenios">Convenios</option>
            <option value="Comision de Fomento">Comision de Fomento</option>
            <option value="Salon comercial">Salon comercial</option>
            <option value="Ingresos extraordinarios">
              Ingresos extraordinarios
            </option>
            <option value="Multas">Multas</option>
            <option value="Cambio de moneda extranjera">
              Cambio de moneda extranjera
            </option>
            <option value="Otros">Otros</option>
          </select>
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
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="seleccionSubVivienda"
          >
            Seleccione un tipo de moneda:
          </label>
          <select
            id="tipoMoneda"
            name="tipoMoneda"
            value={tipoMoneda}
            onChange={handleChangeTipoMoneda}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="UR">Pesos Uruguayos</option>
            <option value="USD">Dolares</option>
          </select>
          {errores.tipoMoneda && (
            <span className="text-red-500 text-sm">{errores.tipoMoneda}</span>
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
          Registrar Ingreso
        </button>
      </form>
    </div>
  );
};

export default AltaIngreso;
