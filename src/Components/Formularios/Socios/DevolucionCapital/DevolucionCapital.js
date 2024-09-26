"use client";

import React, { useState } from "react";
import { postDevolucionCapital } from "../../../../Api/api.js";

const DevolucionCapital = ({ socio, setIdentificadorComponente }) => {
  const [capitalDescuento, setCapitalDescuento] = useState(0);
  const [razonRetiro, setRazonRetiro] = useState("");
  const [tipoRetiro, setTipoRetiro] = useState("");
  const [errores, setErrores] = useState({});
  const [montoDescuento, setMontoDescuento] = useState("");
  const [descripcionDescuento, setDescripcionDescuento] = useState("");
  const [listaDeudas, setListaDeudas] = useState([]);

  const handleChangeCapitalDescuento = (e) => setCapitalDescuento(e.target.value);
  const handleChangeRazonRetiro = (e) => setRazonRetiro(e.target.value);
  const handleChangeTipoRetiro = (e) => setTipoRetiro(e.target.value);
  const handleChangeMontoDescuento = (e) => setMontoDescuento(e.target.value);
  const handleChangeDescripcionDescuento = (e) => setDescripcionDescuento(e.target.value);

  const validarFormulario = () => {
    const errores = {};
  
    if (!capitalDescuento) {
      errores.capitalDescuento = "El descuento de capital es obligatorio";
    } else if (isNaN(capitalDescuento)) {
      errores.capitalDescuento = "El descuento de capital debe ser un número";
    } else if (parseFloat(capitalDescuento) < 0) {
      errores.capitalDescuento = "El descuento de capital debe ser un número positivo";
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

  const agregarDescuento = () => {
    if (montoDescuento && descripcionDescuento && !isNaN(montoDescuento) && parseFloat(montoDescuento) > 0) {
      setListaDeudas([...listaDeudas, { monto: montoDescuento, descripcion: descripcionDescuento }]);
      setMontoDescuento("");
      setDescripcionDescuento("");
    } else {
      alert("Por favor, ingresa un monto y descripción válidos para el descuento.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    let expulsado = tipoRetiro === "True";

    const devolucionData = {
      socio,
      porcentajeDescuento: capitalDescuento,
      razon: razonRetiro,
      expulsado,
      listaDeudas,
    };

    try {
      const response = await postDevolucionCapital(devolucionData);
      console.log(response);
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

          {/* Sección para agregar listaDeudas */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Agregar Descuento o Deuda:</h3>
            <input
              type="text"
              placeholder="Monto del descuento"
              value={montoDescuento}
              onChange={handleChangeMontoDescuento}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white mt-2"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcionDescuento}
              onChange={handleChangeDescripcionDescuento}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white mt-2"
            />
            <button
              type="button"
              onClick={agregarDescuento}
              className="w-full py-2 mt-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200"
            >
              Agregar Descuento
            </button>
          </div>

          {/* Lista de listaDeudas */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Lista de listaDeudas o Deudas:</h3>
            <ul className="list-disc pl-5">
              {listaDeudas.map((descuento, index) => (
                <li key={index}>
                  {descuento.descripcion}: {parseFloat(descuento.monto).toFixed(2)} 
                </li>
              ))}
            </ul>
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
