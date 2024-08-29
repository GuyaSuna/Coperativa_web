"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { postUsuario, getAllSocios } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaUsuario = () => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);

  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      console.log("Socios disponibles:", response);
      setSociosDisponibles(response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const validarFormulario = () => {
    const errores = {};
    if (!contraseña) errores.contraseña = "La contraseña es obligatoria";
    if (!email) errores.email = "El email es obligatorio";
    if (!socioSeleccionado)
      errores.socioSeleccionado = "Debe seleccionar un socio";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSocioChange = (e) => {
    const cedulaSeleccionada = e.target.value;
    console.log("Cedula seleccionada:", cedulaSeleccionada);

    // Buscar el socio en los disponibles
    const socioEncontrado = sociosDisponibles.find(
      (socio) => socio.cedulaSocio == cedulaSeleccionada
    );

    console.log("Socio encontrado:", socioEncontrado);

    // Establecer el socio seleccionado
    setSocioSeleccionado(socioEncontrado || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const usuarioEntity = {
      contraseña,
      email,
      socio: socioSeleccionado,
    };

    try {
      const response = await postUsuario(usuarioEntity);
      if (response.status === 201) {
        alert("Usuario agregado exitosamente");
      } else {
        alert("Error al agregar usuario");
      }
    } catch (error) {
      console.error("Error al enviar los datos del usuario:", error);
      alert("Error interno del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <label className="block text-sm font-medium mb-2">
          Seleccione el Socio:
          <select
            name="socioDelusuario"
            value={socioSeleccionado ? socioSeleccionado.cedulaSocio : ""}
            onChange={handleSocioChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio</option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {`${socio.nombreSocio} ${socio.apellidoSocio}`}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium mb-2">
          Contraseña:
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="block text-sm font-medium mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        {Object.keys(errores).length > 0 && (
          <div className="text-red-500">
            {Object.values(errores).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default AltaUsuario;
