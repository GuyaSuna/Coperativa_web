"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { postCooperativa } from "../../../../Api/api";

const AltaCooperativa = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombrePresidente, setNombrePresidente] = useState("");
  const [nombreVicePresidente, setNombreVicePresidente] = useState("");
  const [cantidadViviendas, setCantidadViviendas] = useState("");
  const [cuposLibre, setCuposLibre] = useState("");
  const [estadoCooperativa, setEstadoCooperativa] = useState("Activa");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre,
      direccion,
      telefono,
      nombrePresidente,
      nombreVicePresidente,
      cantidadViviendas: parseInt(cantidadViviendas),
      cuposLibre: parseInt(cuposLibre),
      estadoCooperativa,
    };

    try {
      const response = await postCooperativa(data);
      console.log(response);
      setMensaje("Cooperativa creada con éxito");
    } catch (error) {
      console.error("Error al crear la cooperativa:", error);
      setMensaje("Error al crear la cooperativa");
    }
  };

  return (
    <div className="max-h-screen  items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nombre">
            Nombre de la Cooperativa:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="direccion">
            Dirección:
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="telefono">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="nombrePresidente"
          >
            Nombre del Presidente:
          </label>
          <input
            type="text"
            id="nombrePresidente"
            name="nombrePresidente"
            value={nombrePresidente}
            onChange={(e) => setNombrePresidente(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="nombreVicePresidente"
          >
            Nombre del Vicepresidente:
          </label>
          <input
            type="text"
            id="nombreVicePresidente"
            name="nombreVicePresidente"
            value={nombreVicePresidente}
            onChange={(e) => setNombreVicePresidente(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="cantidadViviendas"
          >
            Cantidad de Viviendas:
          </label>
          <input
            type="number"
            id="cantidadViviendas"
            name="cantidadViviendas"
            value={cantidadViviendas}
            onChange={(e) => setCantidadViviendas(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="cuposLibre"
          >
            Cupos Libres:
          </label>
          <input
            type="number"
            id="cuposLibre"
            name="cuposLibre"
            value={cuposLibre}
            onChange={(e) => setCuposLibre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="estadoCooperativa"
          >
            Estado de la Cooperativa:
          </label>
          <select
            id="estadoCooperativa"
            name="estadoCooperativa"
            value={estadoCooperativa}
            onChange={(e) => setEstadoCooperativa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Crear Cooperativa
        </button>
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AltaCooperativa;
