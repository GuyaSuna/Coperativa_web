"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateAdministrador } from "@/Api/api";

const ModificarAdministrador = ({ administrador, setIdentificadorComponente }) => {
  const [nombreMiembro, setNombreMiembro] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [tipoAdministrador, setTipoAdministrador] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});

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

  const validarCampos = () => {
    const nuevosErrores = {};
    const regexTexto = /^[a-zA-ZÀ-ÿñÑ]+(?:\s[a-zA-ZÀ-ÿñÑ]+)*$/; // No permite solo espacios
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!nombreMiembro.trim()) {
      nuevosErrores.nombreMiembro = "El nombre es obligatorio";
    } else if (!regexTexto.test(nombreMiembro.trim())) {
      nuevosErrores.nombreMiembro = "El nombre solo puede contener letras y no debe ser solo espacios";
    }
  
    if (!contraseña.trim()) {
      nuevosErrores.contraseña = "La contraseña es obligatoria";
    } else if (contraseña.trim().length < 6) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }
  
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!regexEmail.test(email.trim())) {
      nuevosErrores.email = "El email no es válido";
    }
  
    if (!tipoAdministrador.trim()) {
      nuevosErrores.tipoAdministrador = "El tipo de administrador es obligatorio";
    } else if (!regexTexto.test(tipoAdministrador.trim())) {
      nuevosErrores.tipoAdministrador = "El tipo solo puede contener letras y no debe ser solo espacios";
    }
  
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      setMensaje("Hay errores en el formulario");
      return;
    }

    const data = {
      idMiembro: administrador.idMiembro,
      nombreMiembro,
      contraseña,
      email,
      tipoAdministrador,
    };

    try {
      await updateAdministrador(data);
      setMensaje("Administrador modificado con éxito");
      setIdentificadorComponente(27);
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
          {errores.nombreMiembro && <p className="text-red-600">{errores.nombreMiembro}</p>}
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
          {errores.contraseña && <p className="text-red-600">{errores.contraseña}</p>}
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
          {errores.email && <p className="text-red-600">{errores.email}</p>}
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
          {errores.tipoAdministrador && <p className="text-red-600">{errores.tipoAdministrador}</p>}
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
