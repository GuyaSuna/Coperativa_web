"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { postCooperativa, getAllCooperativas } from "../../../../Api/api";

const AltaCooperativa = () => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombrePresidente, setNombrePresidente] = useState("");
  const [nombreVicePresidente, setNombreVicePresidente] = useState("");
  const [cantidadViviendas, setCantidadViviendas] = useState("");
  const [cuposLibre, setCuposLibre] = useState("");
  const [estadoCooperativa, setEstadoCooperativa] = useState("Activa");
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState({});

  const router = useRouter();

  const validarFormulario = () => {
    const errores = {};

    if (!nombre) {
      errores.nombre = "El nombre de la cooperativa es obligatoria.";
    }
    if (!direccion) {
      errores.direccion = "La direccion de la cooperativa es obligatoria.";
    }
    if (!localidad) {
      errores.localidad = "La localidad de la cooperativa es obligatoria";
    }
    if (!departamento) {
      errores.departamento =
        "El departamento de la cooperativa es obligatoria.";
    }
    if (!telefono) {
      errores.telefono = "El telefono de la cooperativa es obligatoria";
    }

    if (!cantidadViviendas) {
      errores.cantidadViviendas =
        "La cantida de viviendas de la cooperativa es obligatoria.";
    }

    if (!estadoCooperativa) {
      errores.estadoCooperativa = "El estado de la cooperativa es obligatorio.";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cooperativas = await getAllCooperativas();

      const nombreExiste = cooperativas.some(
        (cooperativa) => cooperativa.nombre === nombre
      );

      if (nombreExiste) {
        setMensaje(
          "El nombre de la cooperativa ya está en uso, por favor elige otro."
        );
        return;
      }

      if (!validarFormulario()) return;

      const data = {
        nombre,
        direccion,
        localidad,
        departamento,
        telefono,
        nombrePresidente,
        nombreVicePresidente,
        cantidadViviendas: parseInt(cantidadViviendas),
        cuposLibre: parseInt(cuposLibre),
        estadoCooperativa,
      };

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
          {errores.nombre && <span className="error">{errores.nombre}</span>}
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
          {errores.direccion && (
            <span className="error">{errores.direccion}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="direccion">
            Localidad:
          </label>
          <input
            type="text"
            id="localidad"
            name="localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.localidad && (
            <span className="error">{errores.localidad}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="direccion">
            Departamento:
          </label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.departamento && (
            <span className="error">{errores.departamento}</span>
          )}
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
          {errores.telefono && (
            <span className="error">{errores.telefono}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="nombrePresidente"
          >
            Presidente:
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
            Vicepresidente:
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
          {errores.cantidadViviendas && (
            <span className="error">{errores.cantidadViviendas}</span>
          )}
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
