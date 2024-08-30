"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateAdministrador } from "@/Api/api";

const ModificarAdministrador = ({ administrador , setIdentificadorComponente }) => {
  const [nombreMiembro, setNombreMiembro] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [tipoAdministrador, setTipoAdministrador] = useState("");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      try {
        setNombreMiembro(administrador.nombreMiembro);
        setContraseña(administrador.contraseña);
        setEmail(administrador.email);
        setTipoAdministrador(administrador.tipoAdministrador);
      } catch (error) {
        console.error("Error al cargar el administrador:", error);
      }
    };

    fetchData();
  }, [administrador]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idMiembro: administrador.idMiembro,
      nombreMiembro,
      contraseña,
      email,
      tipoAdministrador,
    };

    try {
      const response = await updateAdministrador(data);
      console.log(response);
      setMensaje("Administrador modificado con éxito");
      setIdentificadorComponente(27);  // Cambia el identificador según corresponda
    } catch (error) {
      console.error("Error al modificar el administrador:", error);
      setMensaje("Error al modificar el administrador");
    }
  };

  return (
    <div className="max-h-screen items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nombreMiembro">
            Nombre del Administrador:
          </label>
          <input
            type="text"
            id="nombreMiembro"
            name="nombreMiembro"
            value={nombreMiembro}
            onChange={(e) => setNombreMiembro(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="contraseña">
            Contraseña:
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="tipoAdministrador">
            Tipo de Administrador:
          </label>
          <input
            type="text"
            id="tipoAdministrador"
            name="tipoAdministrador"
            value={tipoAdministrador}
            onChange={(e) => setTipoAdministrador(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Modificar Administrador
        </button>
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default ModificarAdministrador;
