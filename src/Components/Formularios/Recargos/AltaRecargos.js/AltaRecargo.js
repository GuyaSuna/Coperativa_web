"use client";

import React, { useState, useEffect, useContext } from "react";
import { postRecargo, getAllSocios } from "@/Api/api"; 
import { ModalConfirmacion } from "@/Components/ModalConfirmacion.js";
import { MiembroContext } from "@/Provider/provider";

const AltaRecargo = ({ setIdentificadorComponente }) => {
  const [totalRecargoUr, setTotalRecargoUr] = useState("");
  const [pagoRecargo, setPagoRecargo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [vigenciaEnRecibos, setVigenciaEnRecibos] = useState("");
  const [motivo, setMotivo] = useState(""); 
  const [socio, setSocio] = useState({});
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [socios, setAllSocios] = useState([]);
  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    setFechaInicio(obtenerFechaHoy());
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    const response = await getAllSocios(cooperativa.idCooperativa);
    setAllSocios(response);
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!totalRecargoUr) errores.totalRecargoUr = "El total del recargo es obligatorio";
    if (!pagoRecargo) errores.pagoRecargo = "El pago del recargo es obligatorio";
    if (!fechaInicio) {
      errores.fechaInicio = "La fecha de inicio es obligatoria";
    } else if (fechaInicio > fechaHoy) {
      errores.fechaInicio = "La fecha de inicio no puede ser mayor a la fecha actual";
    }
    if (!vigenciaEnRecibos) errores.vigenciaEnRecibos = "La vigencia en recibos es obligatoria";
    if (!motivo) errores.motivo = "El motivo es obligatorio";
    if (!socio) errores.socio = "El socio es obligatorio";
    else if (socio == 0) errores.socio = "El socio debe seleccionarse";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMostrarModal(true);
    }
  };

  const handleChangeSocio = (e) => {
    setSocio(e.target.value);
  };

  const handleConfirmacion = async () => {
    setMostrarModal(false);
    if (!validarFormulario()) return;

    const socioSelect = socios.find((socioF) => socioF.cedulaSocio == socio);
    const recargoData = {
      totalRecargoUr,
      pagoRecargo,
      fechaInicio,
      vigenciaEnRecibos,
      motivo,
      socio: socioSelect,
    };

    try {
      const response = await postRecargo(recargoData);
      console.log("Recargo registrado exitosamente:", response);
      setIdentificadorComponente(50);
    } catch (error) {
      console.error("Error al enviar los datos del recargo:", error);
      alert("Error interno del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Total Recargo UR:</label>
          <input
            type="number"
            value={totalRecargoUr}
            onChange={handleChange(setTotalRecargoUr)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.totalRecargoUr && (
            <span className="text-red-500 text-sm">{errores.totalRecargoUr}</span>
          )}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pago Recargo:</label>
            <input
              type="number"
              value={pagoRecargo}
              onChange={handleChange(setPagoRecargo)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.pagoRecargo && (
              <span className="text-red-500 text-sm">{errores.pagoRecargo}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Fecha de Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={handleChange(setFechaInicio)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.fechaInicio && (
              <span className="text-red-500 text-sm">{errores.fechaInicio}</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vigencia en Recibos:</label>
            <input
              type="number"
              value={vigenciaEnRecibos}
              onChange={handleChange(setVigenciaEnRecibos)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.vigenciaEnRecibos && (
              <span className="text-red-500 text-sm">{errores.vigenciaEnRecibos}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Motivo del Recargo:</label>
            <input
              type="text"
              value={motivo}
              onChange={handleChange(setMotivo)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.motivo && (
              <span className="text-red-500 text-sm">{errores.motivo}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="seleccionSocio">
            Seleccionar Socio:
          </label>
          <select
            id="seleccionSocio"
            name="seleccionSocio"
            value={socio}
            onChange={handleChangeSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="0">Seleccione un socio</option>
            {socios.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {`${socio.nombreSocio} ${socio.apellidoSocio}`}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Recargo
        </button>

        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea registrar este recargo?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaRecargo;
