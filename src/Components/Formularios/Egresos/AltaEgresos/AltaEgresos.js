"use client";

import React, { useState, useContext, useEffect } from "react";
import { postEgreso } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";

const AltaEgreso = () => {
  const [subRubro, setSubRubro] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [egreso, setEgreso] = useState("");
  const [errores, setErrores] = useState({});
  const [tipoMoneda, setTipoMoneda] = useState("UR");
  const { cooperativa } = useContext(MiembroContext);
  const [fechaDatosContables, setFechaDatosContables] = useState("");

  useEffect(() => {
    setFechaDatosContables(obtenerFechaHoy());
  }, []);

  const handleChangeDenominacion = (e) => setDenominacion(e.target.value);
  const handleChangeEgreso = (e) => setEgreso(e.target.value);
  const handleChangeSeleccionSubRubro = (e) => setSubRubro(e.target.value);
  const handleChangeTipoMoneda = (e) => setTipoMoneda(e.target.value);
  const handleChangeFechaDatosContables = (e) =>
    setFechaDatosContables(e.target.value);
  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!subRubro) errores.subRubro = "El subrubro es obligatorio";
    if (!denominacion) errores.denominacion = "La denominación es obligatoria";
    if (!egreso) errores.egreso = "El egreso es obligatorio";
    if (!fechaDatosContables) {
      errores.fechaDatosContables = "La fecha del Egreso es obligatoria";
    } else if (fechaDatosContables > fechaHoy) {
      errores.fechaDatosContables =
        "La fecha de Egreso no puede ser mayor a la fecha actual";
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

    const egresoData = {
      subRubro,
      denominacion,
      egreso,
      cooperativaEntity: cooperativa,
      tipoMoneda,
      fechaDatosContables,
    };

    try {
      const response = await postEgreso(egresoData);
      if (response.status === 201) {
        alert("Error al agregar Egreso");
      } else {
        alert("Egreso agregado exitosamente");
      }
    } catch (error) {
      console.error("Error al enviar los datos del egreso:", error);
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
            Fecha del Egreso:
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
            <option value="Gastos Extras en Dolares">
              Gastos Extras en Dolares
            </option>
            <option value="Cuota Social">ANV</option>
            <option value="F.U.C.V.A.M">F.U.C.V.A.M</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Barraca">Barraca</option>
            <option value="Libreria">Libreria</option>
            <option value="Gastos Fijos">Gastos fijos</option>
            <option value="INACOOP">INACOOP</option>
            <option value="Tramites">Tramites</option>
            <option value="Otros">Otros</option>
          </select>
          {errores.seleccionSubRubro && (
            <span className="text-red-500 text-sm">
              {errores.seleccionSubRubro}
            </span>
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
          <label className="block text-sm font-medium mb-2" htmlFor="egreso">
            Egreso:
          </label>
          <input
            type="text"
            id="egreso"
            value={egreso}
            onChange={handleChangeEgreso}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.egreso && (
            <span className="text-red-500 text-sm">{errores.egreso}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Registrar Egreso
        </button>
      </form>
    </div>
  );
};

export default AltaEgreso;
