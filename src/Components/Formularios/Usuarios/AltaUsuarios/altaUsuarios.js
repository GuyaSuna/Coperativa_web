"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { postUsuario, getAllSocios } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaUsuario = () => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [socioDelUsuario, setSocioDelUsuario] = useState("");
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);


  // validar los socios que no tengan usurio creado
  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      let sociosSinUsuario = [];
      response.forEach((socioTitular) => {
        if (socioTitular.suplenteEntity === null) {
          sociosSinSuplente.push(socioTitular);
        }
      });
      setSociosDisponibles(sociosSinSuplente);
      console.log("Socios disponibles: ", sociosSinSuplente);
    } catch (error) {
      console.error("Error al obtener las viviendas:", error);
    }
  };

  const handleChangeSocioDelUsuario = (e) => {
    setSocioDelUsuario(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeContraseña = (e) => {
    setContraseña(e.target.value);
  };


  const validarFormulario = () => {
    const errores = {};

    if (!email) errores.emailUsuario = "El Email es obligatorio";
    if (!contraseña) errores.contraseñaUsuario = "La contraseña es obligatoria";
    if (!socioDelUsuario)
      errores.socioDelUsuario = "El Usuario debe pertenecer a un socio.";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const UsuarioData = {
      email: email,
      contraseña: contraseña,
      socio: socioDelUsuario,
    };

    try {
      const response = await postUsauario(UsuarioData);
      if (response.status === 201) {
        alert("Error al agregar usuario");
      } else {
        alert("usuario agregado exitosamente");
      }
    } catch (error) {
      console.error("Error al enviar los datos del usuario :", error);
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
            name="EmailUsuario"
            value={email}
            onChange={handleChangeEmail}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.emailUsuario && (
            <span className="error">{Errores.emailUsuario}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Contraseña:
          <input
            type="text"
            name="nombreSuplente"
            value={contraseña}
            onChange={handleChangeContraseña}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.contraseñaUsuario && (
            <span className="error">{Errores.contraseñaUsuario}</span>
          )}
        </label>
        
        <label className="block text-sm font-medium mb-2">
          Seleccione el Socio para generar el usuario:
          <select
            name="socioDelUsuario"
            value={socioDelUsuario}
            onChange={handleChangeSocioDelUsuario}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio </option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {`Socio: ${socio.nombreSocio} ${socio.apellidoSocio}`}
              </option>
            ))}
          </select>
          {Errores.socioDelUsuario && (
            <span className="error">{Errores.socioDelUsuario}</span>
          )}
        </label>

        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AltaUsuario;
