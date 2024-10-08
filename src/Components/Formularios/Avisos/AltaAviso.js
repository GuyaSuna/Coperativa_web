"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postAviso, getAllUsuarios, postAvisoToAll } from "../../../Api/api.js"; // postAvisoToAll es una nueva función para enviar a todos
import { MiembroContext } from "@/Provider/provider";

const AltaAviso = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [Mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores de validación
  const [success, setSuccess] = useState(null); // Estado para manejar éxito en el envío

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getAllUsuarios(cooperativa.idCooperativa);
      console.log("Usuarios", response);
      setUsuarios(response);
    } catch (error) {
      console.error("Error al recibir los datos de los usuarios:", error);
      setError("Error al cargar los usuarios, inténtelo más tarde.");
    }
  };

  const handleChangeMensaje = (e) => {
    setMensaje(e.target.value);
  };
  const handleChangeUsuario = (e) => {
    const selectedUser = parseInt(e.target.value);
    setUsuario(selectedUser);
    console.log("Usuario seleccionado:", selectedUser); // Agrega este log
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
        const response = await postAvisoToAll(data, miembro.id);
        console.log("Enviado a todos los miembros:", response);
        setSuccess("El aviso ha sido enviado a todos los miembros.");
      } else {
        const response = await postAviso(data, miembro.responseBody.id, usuario);
        console.log("Enviado a un usuario:", response);
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
          <label className="block text-sm font-medium mb-2" htmlFor="seleccionUsuario">
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
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {`Usuario: ${usuario.firstname} ${usuario.lastname}`}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-500">
            {success}
          </div>
        )}

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
