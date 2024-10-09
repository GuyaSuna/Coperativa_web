"use client";

import React, { useState, useContext } from "react";
import { postBalanceAnual } from "../../../Api/api";
import { MiembroContext } from "@/Provider/provider";

const BalanceAnual = ({ setIdentificadorComponente }) => {
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [mensaje, setMensaje] = useState("");
  const { cooperativa } = useContext(MiembroContext);

  const handleChangeAnio = (e) => {
    setAnioSeleccionado(e.target.value);
  };

  const handleRegistrarBalance = async (e) => {
    e.preventDefault();

    // Crear una fecha completa con el primer día del año seleccionado
    const fechaCompleta = new Date(`${anioSeleccionado}-01-01T00:00:00Z`);

    try {
      const response = await postBalanceAnual(fechaCompleta, cooperativa.idCooperativa);
      if (response != null) {
        setMensaje(`Balance anual para el año ${anioSeleccionado} registrado exitosamente.`);
      } else {
        setMensaje("Ocurrió un error al registrar el balance.");
      }
    } catch (error) {
      console.error("Error al registrar balance anual:", error);
      setMensaje("Hubo un error al registrar el balance anual.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-8">
      <form
        onSubmit={handleRegistrarBalance}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Registrar Balance Anual
        </h2>
        
        <div className="mb-4">
          <label htmlFor="anio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Selecciona el año:
          </label>
          <select
            id="anio"
            name="anio"
            value={anioSeleccionado}
            onChange={handleChangeAnio}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
        >
          Registrar Balance
        </button>

        {mensaje && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
};

export default BalanceAnual;
