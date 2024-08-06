"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postAviso, getAllUsuarios } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";

const AltaAviso = () => {
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [Mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(0);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await getAllUsuarios(cooperativa.idCooperativa);
      setUsuarios(response);
    } catch (error) {
      console.error("Error al recibir los datos de los usuarios:", error);
    }
  };

  const handleChangeMensaje = (e) => {
    setMensaje(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeUsuario = (e) => {
    setUsuario(parseInt(e.target.value));
    console.log(e.target.value);
    console.log(usuario.parteInt());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(usuario);
    const data = {
      mensaje: Mensaje,
    };
    console.log(data);

    const response = await postAviso(data, miembro.idMiembro, usuario);

    console.log(response);
  };

  return (
    <div className="max-h-screen flex items-center justify-center  bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="houseNumber"
          >
            Mensaje:
          </label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={Mensaje}
            onChange={handleChangeMensaje}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <select
          id="seleccionVivienda"
          name="seleccionVivienda"
          value={usuario}
          onChange={handleChangeUsuario}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.idMiembro} value={usuario.idMiembro}>
              {`Usuario Nro.: ${usuario.idMiembro} - ${usuario.nombreMiembro}`}
            </option>
          ))}
        </select>
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
