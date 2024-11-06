"use client";

import React, { useState, useEffect, useContext } from "react";
import { getDevolucion, updateDevolucion } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const ModificarDevolucion = ({ idDevolucionParam , setIdentificadorComponente }) => {
  const [idDevolucion, setIdDevolucion] = useState(idDevolucionParam);
  const [devolucion, setDevolucion] = useState({});
  const [fechaInicio, setFechaInicio] = useState("");
  const [totalDevolucionUr, setTotalDevolucionUr] = useState("");
  const [pagoDevolucion, setPagoDevolucion] = useState("");
  const [vigenciaEnRecibos, setVigenciaEnRecibos] = useState("");
  const [motivo, setMotivo] = useState("");
  const [socio, setSocio] = useState("");
  const [socios, setSocios] = useState([]);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    const fetchDevolucion = async () => {
      try {
        const data = await getDevolucion(idDevolucionParam);
        console.log(data)
        if (data) {
          setFechaInicio(data.fechaInicio);
          setTotalDevolucionUr(data.totalDevolucionUr);
          setPagoDevolucion(data.pagoDevolucion);
          setVigenciaEnRecibos(data.vigenciaEnRecibos);
          setMotivo(data.motivo);
          setSocio(data.socio ? data.socio.cedulaSocio : "");
          setDevolucion(data);
        }
      } catch (error) {
        console.error("Error al obtener la devolución:", error);
      }
    };


      fetchDevolucion();

  },[]);

  const validarFormulario = () => {
    const errores = {};

    if (!fechaInicio) errores.fechaInicio = "La fecha de inicio es obligatoria";
    if (!totalDevolucionUr)
      errores.totalDevolucionUr = "El total de la devolución es obligatorio";
    if (!pagoDevolucion)
      errores.pagoDevolucion = "El pago de la devolución es obligatorio";
    if (!vigenciaEnRecibos)
      errores.vigenciaEnRecibos = "La vigencia en recibos es obligatoria";
    if (!motivo) errores.motivo = "El motivo es obligatorio";
    if (!socio || socio === "0") errores.socio = "Debe seleccionar un socio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMostrarModal(true); 
    }
  };

  const handleConfirmacion = async () => {
    if (!validarFormulario()) return;
    try {
      await updateDevolucion(
        {
          idDevolucion : devolucion.idDevolucion,
          fechaInicio,
          totalDevolucionUr,
          pagoDevolucion,
          vigenciaEnRecibos,
          motivo,
          socio : devolucion.socio,
        },
      );
      setMostrarModal(true);
      setIdentificadorComponente(47);
    } catch (error) {
      console.error("Error al actualizar la devolución:", error);
    }
  };

  const handleChange = (setter) => (e) => setter(e.target.value);


  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Total Devolución UR:</label>
          <input
            type="number"
            value={totalDevolucionUr}
            onChange={handleChange(setTotalDevolucionUr)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.totalDevolucionUr && (
            <span className="text-red-500 text-sm">{errores.totalDevolucionUr}</span>
          )}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pago Devolución:</label>
            <input
              type="number"
              value={pagoDevolucion}
              onChange={handleChange(setPagoDevolucion)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.pagoDevolucion && (
              <span className="text-red-500 text-sm">{errores.pagoDevolucion}</span>
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
            <label className="block text-sm font-medium mb-2">Motivo de la Devolución:</label>
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
            Socio:
          </label>
          <select
            id="seleccionSocio"
            name="seleccionSocio"
            value={socio}
            onChange={console.log("Nada")}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="1">{devolucion?.socio?.nombreSocio} {devolucion?.socio?.apellidoSocio}</option>
          </select>
          {errores.socio && <span className="text-red-500 text-sm">{errores.socio}</span>}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Modificar
        </button>

        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea modificar esta devolución?"
            onConfirm={() => handleConfirmacion()}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default ModificarDevolucion;
