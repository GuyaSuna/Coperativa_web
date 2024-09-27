"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSocios, register } from "@/Api/api";

const AltaAdministrador = ({ cooperativa, setIdentificadorComponente }) => {
  const [socios, setSocios] = useState([]);
  const [selectedSocio, setSelectedSocio] = useState("");
  const [nombreMiembro, setNombreMiembro] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [tipoAdministrador, setTipoAdministrador] = useState("ADMIN");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchSociosData = async () => {
      try {
        const response = await getAllSocios(cooperativa.idCooperativa);
        setSocios(response);
      } catch (error) {
        console.error("Error al cargar los socios:", error);
      }
    };

    fetchSociosData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let SocioEncontrado = socios.find(
      (socio) => (socio.cedulaSocio = selectedSocio)
    );
    console.log("Socio encontrado", SocioEncontrado);
    const data = {
      firstname: SocioEncontrado.nombreSocio,
      lastname: SocioEncontrado.apellidoSocio,
      username: nombreMiembro,
      password: contraseña,
      email,
      role: tipoAdministrador,
    };

    try {
      console.log("ANTES DE API", cooperativa.idCooperativa);
      const response = await register(
        data,
        SocioEncontrado.cedulaSocio,
        cooperativa.idCooperativa
      );
      console.log(response);
      setMensaje("Administrador creado con éxito");
      setIdentificadorComponente(27);
    } catch (error) {
      console.error("Error al crear el administrador:", error);
      setMensaje("Error al crear el administrador");
    }
  };

  return (
    <div className="max-h-screen items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="socio">
            Seleccionar Socio:
          </label>
          <select
            id="socio"
            name="socio"
            value={selectedSocio}
            onChange={(e) => setSelectedSocio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio</option>
            {socios.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {socio.nombreSocio} {socio.apellidoSocio} ({socio.cedulaSocio})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="nombreMiembro"
          >
            Nombre de Usuario:
          </label>
          <input
            type="text"
            id="nombreMiembro"
            name="nombreMiembro"
            value={nombreMiembro}
            onChange={(e) => setNombreMiembro(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="contraseña"
          >
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
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="tipoAdministrador"
          >
            Tipo de Administrador:
          </label>
          <select
            id="tipoAdministrador"
            name="tipoAdministrador"
            value={tipoAdministrador}
            onChange={(e) => setTipoAdministrador(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="OTRO">OTRO</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Crear Administrador
        </button>
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AltaAdministrador;
