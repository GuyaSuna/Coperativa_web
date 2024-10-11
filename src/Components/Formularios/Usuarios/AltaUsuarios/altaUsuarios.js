"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  postUsuario,
  getAllSocios,
  getAllUsuarios,
  register,
} from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const AltaUsuario = () => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const usuarioResponse = await getAllUsuarios(cooperativa.idCooperativa);

      const socioConUsuario = usuarioResponse.map(
        (usuario) => usuario.socio.cedulaSocio
      );
      const sociosSinUsuario = response.filter(
        (socio) => !socioConUsuario.includes(socio.cedulaSocio)
      );
      const sociosSinArchivar = sociosSinUsuario.filter(socio => socio.archivado === false);
      setSociosDisponibles(sociosSinArchivar);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const validarFormulario = () => {
    const errores = {};
    if (!password) errores.password = "La contraseña es obligatoria";
    if (!email) errores.email = "El email es obligatorio";
    if (!socioSeleccionado)
      errores.socioSeleccionado = "Debe seleccionar un socio";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSocioChange = (e) => {
    const cedulaSeleccionada = e.target.value;
    const socioEncontrado = sociosDisponibles.find(
      (socio) => socio.cedulaSocio == cedulaSeleccionada
    );
    
    if (socioEncontrado) {
      setSocioSeleccionado(socioEncontrado);
      setFirstname(socioEncontrado.nombreSocio); // Actualiza el nombre
      setLastname(socioEncontrado.apellidoSocio); // Actualiza el apellido
    } else {
      setSocioSeleccionado(null);
      setFirstname(""); // Limpia el campo de nombre si no se selecciona un socio válido
      setLastname(""); // Limpia el campo de apellido si no se selecciona un socio válido
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const registerRequest = {
      firstname,
      lastname,
      username,
      role: "USER",
      socio: socioSeleccionado,
      password,
      email,
    };
    try {
      const response = await register(
        registerRequest,
        socioSeleccionado.cedulaSocio,
        cooperativa.idCooperativa
      );
      if (response.status === 201) {
        alert("Error al agregar usuario");
      } else {
        alert("Usuario agregado exitosamente");
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
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Seleccione el Socio:
            <select
              name="socioDelusuario"
              value={socioSeleccionado ? socioSeleccionado.cedulaSocio : ""}
              onChange={handleSocioChange}
              className="w-auto p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white max-w-64"
            >
              <option value="">Seleccione un socio</option>
              {sociosDisponibles.map((socio) => (
                <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                  {`${socio.nombreSocio} ${socio.apellidoSocio}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Nombre:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-auto max-w-64 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Apellido:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-auto max-w-64 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </label>

          {Object.keys(errores).length > 0 && (
            <div className="text-red-500">
              {Object.values(errores).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-auto max-w-64 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </label>

          {Object.keys(errores).length > 0 && (
            <div className="text-red-500">
              {Object.values(errores).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-auto max-w-64 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </label>

          {Object.keys(errores).length > 0 && (
            <div className="text-red-500">
              {Object.values(errores).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="grid text-sm font-medium mb-2">
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-auto max-w-64 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </label>

          {Object.keys(errores).length > 0 && (
            <div className="text-red-500">
              {Object.values(errores).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-auto max-w-64 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default AltaUsuario;
