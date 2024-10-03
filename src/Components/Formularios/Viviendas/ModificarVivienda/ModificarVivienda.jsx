"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import {
  getVivienda,
  updateVivienda,
  getAllSocios,
  getSocio,
} from "../../../../Api/api";
import { MiembroContext } from "@/Provider/provider";

const ModificarVivienda = ({ nroViviendaParam }) => {
  const [nroVivienda, setNroVivienda] = useState(nroViviendaParam);
  const [vivienda, setVivienda] = useState({});
  const [cantidadDormitorios, setCantidadDormitorios] = useState("");
  const [socioTitular, setSocioTitular] = useState({});
  const [socios, setSocios] = useState([]);
  const [errores, setErrores] = useState({});

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const data = await getVivienda(nroVivienda);
        if (data) {
          setCantidadDormitorios(data.cantidadDormitorios);
        }
        if (data.socioTitular) {
          console.log(data.socioTitular);
          const dataSocio = await getSocio(data.socioTitular.cedulaSocio);
          setSocioTitular(dataSocio);
        }
      } catch (error) {
        console.error("An error has occurred in fetchVivienda:", error);
      }
    };

    if (nroVivienda) {
      fetchVivienda();
    }
  }, [nroVivienda]);

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const data = await getAllSocios();
        console.log(data, "data de los socios");
        setSocios(data);
      } catch (error) {
        console.error(`An error has occurred in fetchSocios: ${error.message}`);
      }
    };

    fetchSocios();
  }, []);

  const validarFormulario = () => {
    const errores = {};

    if (!nroVivienda)
      errores.nroVivienda = "El número de vivienda es obligatorio";
    if (!cantidadDormitorios)
      errores.cantidadDormitorios = "La cantidad de dormitorios es obligatoria";
    if (![2, 3].includes(Number(cantidadDormitorios)))
      errores.cantidadDormitorios = "La cantidad de dormitorios debe ser 2 o 3";
    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      const result = await updateVivienda(
        nroVivienda,
        cantidadDormitorios,
        cooperativa.idCooperativa,
        socioTitular
      );
      console.log("Vivienda actualizada:", result);
    } catch (error) {
      console.error("Error al actualizar vivienda:", error);
    }
  };

  const handleSocioChange = async (e) => {
    const cedulaSocio = e.target.value;
    console.log("CEDULAA : " + cedulaSocio);
    try {
      const socioData = await getSocio(cedulaSocio);
      console.log(socioData);
      setSocioTitular(socioData);
    } catch (error) {
      console.error("Error al obtener al socio titular:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <label className="block text-sm font-medium mb-2">
          Nro. Vivienda:
          <input
            type="text"
            name="nroVivienda"
            value={nroVivienda || ""}
            onChange={(e) => setNroVivienda(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.nroVivienda && (
            <span className="error">{errores.nroVivienda}</span>
          )}
        </label>
        <br />
        <label className="block text-sm font-medium mb-2">
          Cantidad de Dormitorios:
          <input
            type="text"
            name="cantidadDormitorios"
            value={cantidadDormitorios || ""}
            onChange={(e) => setCantidadDormitorios(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.cantidadDormitorios && (
            <span className="error">{errores.cantidadDormitorios}</span>
          )}
        </label>
        <br />

        <button type="submit" className="button">
          Modificar
        </button>
      </form>
    </div>
  );
};

export default ModificarVivienda;
