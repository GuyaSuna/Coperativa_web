"use client";

import React, { useState, useEffect, useContext } from "react";
import { getRecargo, updateRecargo } from "@/Api/api"; 
import { MiembroContext } from "@/Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const ModificarRecargo = ({ idRecargoParam, setIdentificadorComponente }) => {
  const [idRecargo, setIdRecargo] = useState(idRecargoParam);
  const [recargo, setRecargo] = useState({});
  const [fechaInicio, setFechaInicio] = useState("");
  const [totalRecargoUr, setTotalRecargoUr] = useState("");
  const [pagoRecargo, setPagoRecargo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [socio, setSocio] = useState("");
  const [vigenciaEnRecibos , setVigenciaEnRecibos] = useState(0);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    const fetchRecargo = async () => {
      try {
        const data = await getRecargo(idRecargoParam);
        console.log(data);
        if (data) {
          setFechaInicio(data.fechaInicio);
          setTotalRecargoUr(data.totalRecargoUr);
          setPagoRecargo(data.pagoRecargo);
          setMotivo(data.motivo);
          setVigenciaEnRecibos(data.vigenciaEnRecibos);
          setSocio(data.socio ? data.socio.cedulaSocio : "");
          setRecargo(data);
        }
      } catch (error) {
        console.error("Error al obtener el recargo:", error);
      }
    };

    fetchRecargo();
  }, []);

  const validarFormulario = () => {
    const errores = {};

    if (!fechaInicio) errores.fechaInicio = "La fecha de inicio es obligatoria";
    if (!totalRecargoUr) errores.totalRecargoUr = "El total del recargo es obligatorio";
    if (!pagoRecargo) errores.pagoRecargo = "El pago del recargo es obligatorio";
    if (!motivo) errores.motivo = "El motivo es obligatorio";
    if (!socio || socio === "0") errores.socio = "Debe seleccionar un socio";
    if(!vigenciaEnRecibos) errores.vigenciaEnRecibos = "Se debe seleccionar una vigencia"

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
      await updateRecargo({
        idRecargo: recargo.idRecargo,
        fechaInicio,
        totalRecargoUr,
        pagoRecargo,
        vigenciaEnRecibos,
        motivo,
        socio: recargo.socio,
      });
      setMostrarModal(false);
      setIdentificadorComponente(50); 
    } catch (error) {
      console.error("Error al actualizar el recargo:", error);
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Vigencia En Recibos:</label>
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
            <option value="1">
              {recargo?.socio?.nombreSocio} {recargo?.socio?.apellidoSocio}
            </option>
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
            mensaje="¿Está seguro de que desea modificar este recargo?"
            onConfirm={() => handleConfirmacion()}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default ModificarRecargo;
