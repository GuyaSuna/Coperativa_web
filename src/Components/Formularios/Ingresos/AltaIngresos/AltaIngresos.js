"use client";

import React, { useState, useContext, useEffect } from "react";
import { postIngreso } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion"; // Importa el modal de confirmación

const AltaIngreso = () => {
  const [subRubro, setSubRubro] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [ingreso, setIngreso] = useState("");
  const [errores, setErrores] = useState({});
  const [tipoMoneda, setTipoMoneda] = useState("UYU");
  const [fechaDatosContables, setFechaDatosContables] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar el modal

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
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMostrarModal(true);
    }
  };

  const handleConfirmacion = async () => {
    setMostrarModal(false);
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
    } catch (error) {
      console.error("Error al enviar los datos del Ingreso:", error);
      alert("Error interno del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        {/* Campos del formulario */}
        <div className="grid md:grid-cols-2 md:gap-6">
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
          </div>
          <div className="mb-4">
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
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
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
              <span className="text-red-500 text-sm">
                {errores.denominacion}
              </span>
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
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="ingreso">
            Monto Ingreso:
          </label>
          <input
            type="text"
            placeholder="$"
            id="ingreso"
            value={ingreso}
            onChange={handleChangeIngreso}
            className="w-auto p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.ingreso && (
            <span className="text-red-500 text-sm">{errores.ingreso}</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Ingreso
        </button>

        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea registrar este ingreso?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaIngreso;
