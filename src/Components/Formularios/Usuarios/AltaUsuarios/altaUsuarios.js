"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { postUsuario, getAllSocios, getAllUsuarios } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaUsuario = () => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [socioDelUsuario, setSocioDelUsuario] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetchUsuarios();
    fetchSociosDisponibles();
  }, []);

  useEffect(() => {
    fetchSociosDisponibles();
  }, [usuarios]);

  const fetchUsuarios = async () => {
    try {
      const usuariosResponse = await getAllUsuarios(cooperativa.idCooperativa);
      setUsuarios(usuariosResponse);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const fetchSociosDisponibles = async () => {
    try {
      const sociosResponse = await getAllSocios(cooperativa.idCooperativa);
      const sociosSinUsuario = sociosResponse.filter(
        (socio) =>
          !usuarios.some(
            (usuario) => usuario.socio.cedulaSocio === socio.cedulaSocio
          )
      );
      console.log("Aca estan los Socios Disponibles", sociosSinUsuario);
      setSociosDisponibles(sociosSinUsuario);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeContraseña = (e) => setContraseña(e.target.value);

  const handleChangeSocioDelUsuario = (e) => {
    const selectedCedula = e.target.value;
    const selectedSocio = sociosDisponibles.find(
      (socio) => socio.cedulaSocio === selectedCedula
    );
    setSocioDelUsuario(selectedSocio || "");
  };

  const validarFormulario = () => {
    const errores = {};
    if (!email) errores.email = "El Email es obligatorio";
    if (!contraseña) errores.contraseña = "La contraseña es obligatoria";
    if (!socioDelUsuario) errores.socioDelUsuario = "Debe seleccionar un socio";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const UsuarioEntity = {
      email: email,
      contraseña: contraseña,
      socio: socioDelUsuario,
    };

    const confirmacion = window.confirm(
      `¿Está seguro de que quiere asignar el usuario al socio ${socioDelUsuario.nombreSocio} ${socioDelUsuario.apellidoSocio}?`
    );
    if (!confirmacion) return;

    try {
      const response = await postUsuario(UsuarioEntity);
      console.log("Respuesta del servidor:", response);
      if (response.status !== 201) {
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
        <label className="block text-sm font-medium mb-2">
          Email:
          <input
            type="text"
            name="emailUsuario"
            value={email}
            onChange={handleChangeEmail}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.email && (
            <span className="text-red-500">{errores.email}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Contraseña:
          <input
            type="password"
            name="contraseñaUsuario"
            value={contraseña}
            onChange={handleChangeContraseña}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.contraseña && (
            <span className="text-red-500">{errores.contraseña}</span>
          )}
        </label>

        <label className="block text-sm font-medium mb-2">
          Seleccione el Socio:
          <select
            name="socioDelUsuario"
            value={socioDelUsuario?.cedulaSocio || ""}
            onChange={handleChangeSocioDelUsuario}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio</option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {socio.nombreSocio} {socio.apellidoSocio}
              </option>
            ))}
          </select>
          {errores.socioDelUsuario && (
            <span className="text-red-500">{errores.socioDelUsuario}</span>
          )}
        </label>

        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default AltaUsuario;
