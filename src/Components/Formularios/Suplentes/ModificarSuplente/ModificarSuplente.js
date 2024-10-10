"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import { getAllSuplentes, updateSuplente } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const ModificarSuplente = ({ suplenteParam }) => {
  console.log("Suplente", suplenteParam)
  const [cedulaSuplente, setCedulaSuplente] = useState(0);
  const [nombreSuplente, setNombreSuplente] = useState("");
  const [apellidoSuplente, setApellidoSuplente] = useState("");
  const [telefonoSuplente, setTelefonoSuplente] = useState(0);
  const [allSuplentes, setAllSuplentes] = useState([]);
  const [cedulaOriginal, setCedulaOriginal] = useState("");
  const [errores, setErrores] = useState({});

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    if (suplenteParam) {
      setCedulaSuplente(suplenteParam.cedulaSuplente);
      setNombreSuplente(suplenteParam.nombreSuplente);
      setApellidoSuplente(suplenteParam.apellidoSuplente);
      setTelefonoSuplente(suplenteParam.telefonoSuplente);
      setCedulaOriginal(suplenteParam.cedulaSuplente);
    }
  }, [suplenteParam]);

  useEffect(() => {
    const fetchSuplentes = async () => {
      try {
        const suplentesResponse = await getAllSuplentes();
        setAllSuplentes(suplentesResponse);
      } catch (error) {
        console.error("Error al obtener suplentes:", error);
      }
    };
    fetchSuplentes();
  }, [cedulaSuplente]);

  const cedulaExiste = () => {
    return allSuplentes.find(
      (suplente) =>
        suplente.cedulaSuplente === cedulaSuplente &&
        suplente.cedulaSuplente !== cedulaOriginal
    );
  };

  const validarFormulario = () => {
    const errores = {};

    if (!cedulaSuplente) {
      errores.cedulaSuplente = "La cédula es obligatoria";
    } else if (cedulaExiste()) {
      errores.cedulaSuplente = "La cédula ya existe";
    }

    if (!nombreSuplente) errores.nombreSuplente = "El nombre es obligatorio";
    if (!apellidoSuplente) errores.apellidoSuplente = "El apellido es obligatorio";
    if (!telefonoSuplente) {
      errores.telefonoSuplente = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(telefonoSuplente)) {
      errores.telefonoSuplente = "Debe ingresar números, no letras";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      await updateSuplente(
        cedulaSuplente,
        apellidoSuplente,
        nombreSuplente,
        telefonoSuplente
      );
    } catch (error) {
      console.error("Error al actualizar suplente:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <label className="block text-sm font-medium mb-2">
            Cédula del Suplente:
            <input
              type="text"
              name="cedulaSuplente"
              value={cedulaSuplente}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.cedulaSuplente && (
              <span className="error">{errores.cedulaSuplente}</span>
            )}
          </label>
          <label className="block text-sm font-medium mb-2">
            Nombres:
            <input
              type="text"
              name="nombreSuplente"
              value={nombreSuplente}
              onChange={(e) => setNombreSuplente(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.nombreSuplente && (
              <span className="error">{errores.nombreSuplente}</span>
            )}
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <label className="block text-sm font-medium mb-2">
            Apellidos:
            <input
              type="text"
              name="apellidoSuplente"
              value={apellidoSuplente}
              onChange={(e) => setApellidoSuplente(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.apellidoSuplente && (
              <span className="error">{errores.apellidoSuplente}</span>
            )}
          </label>

          <label className="block text-sm font-medium mb-2">
            Teléfono:
            <input
              type="text"
              name="telefonoSuplente"
              value={telefonoSuplente}
              onChange={(e) => setTelefonoSuplente(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.telefonoSuplente && (
              <span className="error">{errores.telefonoSuplente}</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarSuplente;
