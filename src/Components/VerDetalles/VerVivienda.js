"use client";

import React, { useState, useEffect, useContext } from "react";
import "./livingPlaceStyle.css";
import {
  getVivienda,
  updateVivienda,
  getAllSocios,
  getSocio,
} from "../../Api/api";
import { MiembroContext } from "@/Provider/provider";

const VerVivienda = ({ nroViviendaParam, setIdentificadorComponente }) => {
  const [nroVivienda, setNroVivienda] = useState(nroViviendaParam);
  const [vivienda, setVivienda] = useState({});
  const [cantidadDormitorios, setCantidadDormitorios] = useState("");
  const [socio, setSocio] = useState({});
  const [socios, setSocios] = useState([]);

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const data = await getVivienda(nroVivienda);
        if (data) {
          setCantidadDormitorios(data.cantidadDormitorios);
        }
        if (data.socio) {
          console.log(data.socio);
          const dataSocio = await getSocio(data.socio.cedulaSocio);
          setSocio(dataSocio);
        }
      } catch (error) {
        console.error("An error has occurred in fetchVivienda:", error);
      }
    };

    if (nroVivienda) {
      fetchVivienda();
    }
  }, [nroVivienda]);

  return (
    <div className="general-container">
      <h2>Detalles de la Vivienda</h2>
      <div className="detail-item">
        <strong>Nro. Vivienda:</strong> {vivienda.nroVivienda}
      </div>
      <div className="detail-item">
        <strong>Cantidad de Dormitorios:</strong> {vivienda.cantidadDormitorios}
      </div>
      <div className="detail-item">
        <strong>Socio Actual:</strong>
        {socio.nombreSocio
          ? `${socio.nombreSocio} ${socio.apellidoSocio}`
          : "Sin socio"}
      </div>
      <button
        onClick={() => setIdentificadorComponente(1)}
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
      >
        Volver
      </button>
    </div>
  );
};

export default VerVivienda;
