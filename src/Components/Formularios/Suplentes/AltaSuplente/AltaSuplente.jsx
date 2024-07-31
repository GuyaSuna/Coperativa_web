"use client";
import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import { useRouter } from "next/navigation";
import { postSuplente, getAllSocios } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaSuplente = () => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);

  const [cedulaSuplente, setCedulaSuplente] = useState("");
  const [nombreSuplente, setNombreSuplente] = useState("");
  const [apellidoSuplente, setApellidoSuplente] = useState("");
  const [telefonoSuplente, setTelefonoSuplente] = useState("");

  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [socioDelSuplente, setSocioDelSuplente] = useState("");
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      let sociosSinSuplente = [];
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

  const handleChangeSocioDelSuplente = (e) => {
    setSocioDelSuplente(e.target.value);
  };

  const handleChangeCedulaSuplente = (e) => {
    setCedulaSuplente(e.target.value);
  };

  const handleChangeNombreSuplente = (e) => {
    setNombreSuplente(e.target.value);
  };

  const handleChangeApellidoSuplente = (e) => {
    setApellidoSuplente(e.target.value);
  };

  const handleChangeTelefonoSuplente = (e) => {
    setTelefonoSuplente(e.target.value);
  };

  const validarFormulario = () => {
    const errores = {};

    if (!cedulaSuplente) errores.cedulaSuplente = "La cédula es obligatoria";
    if (!nombreSuplente) errores.nombreSuplente = "El nombre es obligatorio";
    if (!apellidoSuplente)
      errores.apellidoSuplente = "El apellido es obligatorio";
    if (!telefonoSuplente)
      errores.telefonoSuplente = "El teléfono es obligatorio";
    if (!socioDelSuplente)
      errores.socioDelSuplente = "El suplente debe pertenecer a un socio.";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const SuplenteData = {
      cedulaSuplente: cedulaSuplente,
      nombreSuplente: nombreSuplente,
      apellidoSuplente: apellidoSuplente,
      telefonoSuplente: telefonoSuplente,
    };

    try {
      const response = await postSuplente(SuplenteData, socioDelSuplente);
      if (response.status === 201) {
        alert("Error al agregar suplente");
      } else {
        alert("Suplente agregado exitosamente");
      }
    } catch (error) {
      console.error("Error al enviar los datos del suplente:", error);
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
          Cédula:
          <input
            type="text"
            name="cedulaSuplente"
            value={cedulaSuplente}
            onChange={handleChangeCedulaSuplente}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.cedulaSuplente && (
            <span className="error">{Errores.cedulaSuplente}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Nombres:
          <input
            type="text"
            name="nombreSuplente"
            value={nombreSuplente}
            onChange={handleChangeNombreSuplente}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.nombreSuplente && (
            <span className="error">{Errores.nombreSuplente}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Apellidos:
          <input
            type="text"
            name="apellidoSuplente"
            value={apellidoSuplente}
            onChange={handleChangeApellidoSuplente}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.apellidoSuplente && (
            <span className="error">{Errores.apellidoSuplente}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Teléfono:
          <input
            type="text"
            name="telefonoSuplente"
            value={telefonoSuplente}
            onChange={handleChangeTelefonoSuplente}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.telefonoSuplente && (
            <span className="error">{Errores.telefonoSuplente}</span>
          )}
        </label>

        <label className="block text-sm font-medium mb-2">
          Seleccione el Socio para el Suplente:
          <select
            name="socioDelSuplente"
            value={socioDelSuplente}
            onChange={handleChangeSocioDelSuplente}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio </option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {`Socio: ${socio.nombreSocio} ${socio.apellidoSocio}`}
              </option>
            ))}
          </select>
          {Errores.socioDelSuplente && (
            <span className="error">{Errores.socioDelSuplente}</span>
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

export default AltaSuplente;
