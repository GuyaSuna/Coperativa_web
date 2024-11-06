"use client";

import { useState, useContext, useEffect } from "react";
import { updateConvenio, getConvenioById } from "../../../../Api/api";
import { MiembroContext } from "@/Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const UpdateConvenio = ({ convenio, ur, setIdentificadorComponente }) => {
  console.log("ACA", convenio);
  const [deudaEnUrOriginal, setDeudaEnUrOriginal] = useState("");
  const [urPorMes, setUrPorMes] = useState("");
  const [fechaInicioConvenio, setFechaInicioConvenio] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState("");
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [recibosImpagos, setRecibosImpagos] = useState([]);
  const [tipoDeuda, setTipoDeuda] = useState("");
  const [vigenciaEnRecibos, setVigenciaEnRecibos] = useState(12);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchConvenioData = async () => {
      const convenioResponse = await getConvenioById(convenio.idConvenio);
      if (convenioResponse) {
        setDeudaEnUrOriginal(convenioResponse.deudaEnUrOriginal);
        setUrPorMes(convenioResponse.urPorMes);
        setFechaInicioConvenio(convenioResponse.fechaInicioConvenio);
        setSocioSeleccionado(convenioResponse.socio);
        setTipoDeuda(convenioResponse.tipoConvenio);
        setVigenciaEnRecibos(convenioResponse.vigenciaEnRecibos);
      }
    };
    fetchConvenioData();
  }, [convenio.idConvenio]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!socioSeleccionado) {
      nuevosErrores.socioSeleccionado = "Debe seleccionar un socio.";
    }

    if (!deudaEnUrOriginal || deudaEnUrOriginal <= 0) {
      nuevosErrores.deudaEnUrOriginal = "La deuda en UR debe ser mayor a 0.";
    }

    if (!urPorMes || urPorMes <= 0) {
      nuevosErrores.urPorMes = "La UR por mes debe ser mayor a 0.";
    }

    if (!fechaInicioConvenio) {
      nuevosErrores.fechaInicioConvenio = "Debe seleccionar una fecha de inicio.";
    }

    if (!vigenciaEnRecibos || vigenciaEnRecibos <= 0) {
      nuevosErrores.vigenciaEnRecibos = "La vigencia en recibos debe ser mayor a 0.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setMostrarModal(true);
  };

  const handleConfirmacion = async (e) => {
    setMostrarModal(false);
    e.preventDefault();

    const ConvenioData = {
      idConvenio : convenio.idConvenio,
      cooperativaEntity : convenio.cooperativaEntity,
      deudaEnUrOriginal,
      deudaRestante : convenio.deudaRestante,
      listasFechasRecibos : convenio.listasFechasRecibos,
      socio : socioSeleccionado,
      urPorMes,
      vigenciaEnRecibos,
      fechaInicioConvenio,
      tipoConvenio: convenio.tipoConvenio,
    };

    try {
      await updateConvenio(ConvenioData);
      setIdentificadorComponente(26);
    } catch (error) {
      console.error("Error al actualizar el convenio:", error);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Actualizar Convenio</h2>

        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="socio">
            Socio
          </label>
          <select
            id="socio"
            value={socioSeleccionado}
            onChange={(e) => setSocioSeleccionado(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">{socioSeleccionado.nombreSocio} {socioSeleccionado.apellidoSocio}</option>
          </select>
          {errores.socioSeleccionado && (
            <span className="text-red-500">{errores.socioSeleccionado}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="deudaEnUrOriginal">
            Deuda en UR Original
          </label>
          <input
            type="number"
            id="deudaEnUrOriginal"
            value={deudaEnUrOriginal}
            onChange={(e) => setDeudaEnUrOriginal(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.deudaEnUrOriginal && (
            <span className="text-red-500">{errores.deudaEnUrOriginal}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="urPorMes">
            UR por Mes
          </label>
          <input
            type="number"
            id="urPorMes"
            value={urPorMes}
            onChange={(e) => setUrPorMes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.urPorMes && (
            <span className="text-red-500">{errores.urPorMes}</span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="fechaInicioConvenio">
            Fecha de Inicio
          </label>
          <input
            type="date"
            id="fechaInicioConvenio"
            value={fechaInicioConvenio}
            onChange={(e) => setFechaInicioConvenio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.fechaInicioConvenio && (
            <span className="text-red-500">{errores.fechaInicioConvenio}</span>
          )}
        </div>
  
        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="vigenciaEnRecibos">
            Vigencia en Recibos
          </label>
          <input
            type="number"
            id="vigenciaEnRecibos"
            value={vigenciaEnRecibos}
            onChange={(e) => setVigenciaEnRecibos(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.vigenciaEnRecibos && (
            <span className="text-red-500">{errores.vigenciaEnRecibos}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Actualizar Convenio
        </button>
        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea actualizar el convenio?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default UpdateConvenio;
