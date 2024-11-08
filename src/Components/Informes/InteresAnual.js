'use client'
import React, { useState, useContext, useEffect } from "react";
import { getInteresAnual } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";

const InteresAnual = ({ setIdentificadorComponente }) => {
  const [year, setYear] = useState("");
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear); // Por defecto, seleccionar el año actual
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!year || !cooperativa.idCooperativa) {
      console.error("Año o ID de cooperativa no definidos");
      setLoading(false);
      return;
    }

    // Convertimos el año en una fecha completa (01-01-[año])
    const fechaCompleta = `${year}-01-01`;

    try {
      const response = await getInteresAnual(fechaCompleta, cooperativa.idCooperativa);
      setResultados(response);
    } catch (error) {
      console.error("Error al obtener el informe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Informe de Interés Anual
        </h2>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Selecciona el año:
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Obtener Informe
        </button>
        
      </form>

      {loading && (
        <div className="mt-6">
          <p className="text-lg font-medium text-blue-500">Cargando...</p>
        </div>
      )}

      {resultados != null && !loading && (
        <div className="w-full max-w-lg mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Resultados:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300">
            {resultados.listaInteresAnual.map((dato) => (
              <li key={dato.socio.cedulaSocio} className="leading-relaxed">
                <strong>{dato.socio.nombreSocio}:</strong> {dato.interes} Ur
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteresAnual;
