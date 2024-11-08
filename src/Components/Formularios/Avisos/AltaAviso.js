"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { postAviso, postAvisoToAll } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
import useUsuarios from "../../../Hooks/Usuarios/useUsuarios";

const AltaAviso = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);

  const {
    data: usuarios,
    isLoading,
    error: errorUsuarios,
  } = useUsuarios(cooperativa.idCooperativa);
  const [Mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChangeMensaje = (e) => {
    setMensaje(e.target.value);
  };
  const handleChangeUsuario = (e) => {
    const selectedUser = parseInt(e.target.value);
    setUsuario(selectedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!Mensaje.trim()) {
      setError("El mensaje no puede estar vacío.");
      return;
    }

    if (usuario === 0) {
      setError("Debe seleccionar un usuario o 'Todos los miembros'.");
      return;
    }

    setError(null);
    setSuccess(null);

    const data = {
      mensaje: Mensaje,
    };

    try {
      if (usuario === -1) {
        const response = await postAvisoToAll(
          data,
          miembro.responseBody.id,
          cooperativa.idCooperativa
        );

        setSuccess("El aviso ha sido enviado a todos los miembros.");
      } else {
        const response = await postAviso(
          data,
          miembro.responseBody.id,
          usuario
        );

        setSuccess("El aviso ha sido enviado al usuario.");
      }
    } catch (error) {
      console.error("Error al enviar el aviso:", error);
      setError("Ocurrió un error al enviar el aviso. Inténtelo más tarde.");
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="mensaje">
            Mensaje:
          </label>
          <input
            type="text"
            id="mensaje"
            name="mensaje"
            value={Mensaje}
            onChange={handleChangeMensaje}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="seleccionUsuario"
          >
            Seleccionar usuario:
          </label>
          <select
            id="seleccionUsuario"
            name="seleccionUsuario"
            value={usuario}
            onChange={handleChangeUsuario}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="0">Seleccione un usuario</option>
            <option value={-1}>Todos los miembros</option>
            {isLoading ? (
              <option>Cargando usuarios...</option>
            ) : errorUsuarios ? (
              <option>Error al cargar los usuarios</option>
            ) : (
              usuarios?.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {`Usuario: ${usuario.firstname} ${usuario.lastname}`}
                </option>
              ))
            )}
          </select>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        <button
          type="submit"
          className="w-60 mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Subir Aviso
        </button>
      </form>
    </div>
  );
};

export default AltaAviso;
