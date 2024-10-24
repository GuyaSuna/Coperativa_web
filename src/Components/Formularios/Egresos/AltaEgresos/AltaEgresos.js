"use client";

import React, { useState, useContext, useEffect } from "react";
import { postEgreso } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider.js";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion"; // Importa el modal de confirmación
import { set } from "date-fns";

const AltaEgreso = ({setIdentificadorComponente}) => {
  const [subRubro, setSubRubro] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [egreso, setEgreso] = useState("");
  const [errores, setErrores] = useState({});
  const [tipoMoneda, setTipoMoneda] = useState("UYU");
  const { cooperativa } = useContext(MiembroContext);
  const [fechaDatosContables, setFechaDatosContables] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar el modal

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
    else if(isNaN(egreso)) errores.egreso = "El egreso debe ser un numero";
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
      setIdentificadorComponente(21)
    } catch (error) {
      console.error("Error al enviar los datos del egreso:", error);
      alert("Error interno del servidor");
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
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium "
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
              <option value="UYU">Pesos Uruguayos</option>
              <option value="USD">Dolares</option>
            </select>
            {errores.tipoMoneda && (
              <span className="text-red-500 text-sm">{errores.tipoMoneda}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="egreso">
            Monto Egreso:
          </label>
          <input
            placeholder="$"
            type="text"
            id="egreso"
            value={egreso}
            onChange={handleChangeEgreso}
            className="w-auto p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {errores.egreso && (
            <span className="text-red-500 text-sm">{errores.egreso}</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Egreso
        </button>

        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea registrar este egreso?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaEgreso;
