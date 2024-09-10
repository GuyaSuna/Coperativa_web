"use client";

import React, { useState, useEffect, useContext } from "react";
import "./subsidioStyle.css";
import { useRouter } from "next/navigation";
import {
  postSubsidio,
  getAllSocios,
  getViviendaPorSocio,
} from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaSubsidio = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);

  const [valorViviendaUr, setValorViviendaUr] = useState("");
  const [cuotaApagarUr, setCuotaApagarUr] = useState("");
  const [subsidioUr, setSubsidioUr] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [vigenciaEnMeses, setVigenciaEnMeses] = useState("");
  const [fechaOtorgado, setFechaOtorgado] = useState("");
  const [fechaExpira, setFechaExpira] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState("");

  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setFechaOtorgado(obtenerFechaHoy());
  }, []);

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  useEffect(() => {
    if (subsidioUr && valorViviendaUr) {
      const subsidioValue = parseFloat(subsidioUr);
      const valorViviendaValue = parseFloat(valorViviendaUr);
      if (
        !isNaN(subsidioValue) &&
        !isNaN(valorViviendaValue) &&
        valorViviendaValue !== 0
      ) {
        // Calcular cuota a pagar
        const cuota = valorViviendaValue - subsidioValue;
        setCuotaApagarUr(cuota.toFixed(2));

        // Calcular porcentaje
        const porcentaje = (subsidioValue / valorViviendaValue) * 100;
        setPorcentaje(porcentaje.toFixed(2));
      } else {
        console.error("Valores no válidos:", { subsidioUr, valorViviendaUr });
      }
    }
  }, [subsidioUr, valorViviendaUr]);

  useEffect(() => {
    if (fechaOtorgado && vigenciaEnMeses) {
      const fechaOtorgamiento = new Date(fechaOtorgado);
      fechaOtorgamiento.setMonth(
        fechaOtorgamiento.getMonth() + parseInt(vigenciaEnMeses)
      );

      // Asegurarse de que la fecha sea UTC para evitar problemas de zona horaria
      const year = fechaOtorgamiento.getUTCFullYear();
      const month = ("0" + (fechaOtorgamiento.getUTCMonth() + 1)).slice(-2);
      const day = ("0" + fechaOtorgamiento.getUTCDate()).slice(-2);

      const nuevaFechaExpira = `${year}-${month}-${day}`;
      setFechaExpira(nuevaFechaExpira);
    }
  }, [vigenciaEnMeses, fechaOtorgado]);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      setSociosDisponibles(response);
      console.log("Socios disponibles: ", response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleChangeCuotaApagarUr = (e) => setCuotaApagarUr(e.target.value);
  const handleChangeSubsidioUr = (e) => setSubsidioUr(e.target.value);
  const handleChangeVigenciaEnMeses = (e) => setVigenciaEnMeses(e.target.value);
  const handleChangeFechaOtorgado = (e) => setFechaOtorgado(e.target.value);

  const handleChangeSocioSeleccionado = async (e) => {
    const selectedCedula = e.target.value;
    console.log(selectedCedula, "cedula seleccionada handle");
    const selectedSocio = sociosDisponibles.find(
      (socio) => socio.cedulaSocio == selectedCedula
    );
    setSocioSeleccionado(selectedSocio);
    console.log(selectedSocio, "socio seleccionado");
    if (selectedSocio) {
      try {
        const vivienda = await getViviendaPorSocio(selectedSocio.cedulaSocio);
        if (vivienda) {
          setValorViviendaUr(vivienda.valorVivienda);
          console.log("Vivienda obtenida:", vivienda);
        }
      } catch (error) {
        console.error("Error al obtener la vivienda del socio:", error);
      }
    }
  };

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0"); // Asegura que tenga 2 dígitos
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!valorViviendaUr)
      errores.valorViviendaUr = "La cuota total es obligatoria";
    if (!cuotaApagarUr)
      errores.cuotaApagarUr = "La cuota a pagar es obligatoria";
    if (!subsidioUr) errores.subsidioUr = "El subsidio es obligatorio";
    if (!porcentaje) errores.porcentaje = "El porcentaje es obligatorio";
    if (!vigenciaEnMeses)
      errores.vigenciaEnMeses = "La vigencia en meses es obligatoria";

    if (!fechaOtorgado) {
      errores.fechaOtorgado = "La fecha de otorgamiento es obligatoria";
    } else if (fechaOtorgado > fechaHoy) {
      errores.fechaOtorgado =
        "La fecha de otorgamiento no puede ser mayor a la fecha actual";
    }

    if (!fechaExpira)
      errores.fechaExpira = "La fecha de expiración es obligatoria";
    if (!socioSeleccionado)
      errores.socioSeleccionado = "Debe seleccionar un socio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmacion = window.confirm(
      `¿Está seguro de que quiere seleccionar al socio ${socioSeleccionado.nombreSocio} ${socioSeleccionado.apellidoSocio}?`
    );
    if (!confirmacion) return;

    if (!validarFormulario()) return;

    const subsidioEntity = {
      cuotaTotalUr: valorViviendaUr,
      cuotaApagarUr,
      subsidioUr,
      porcentaje: Math.round(porcentaje),
      vigenciaEnMeses,
      fechaOtorgado,
      fechaExpira,
      socio: socioSeleccionado,
    };

    try {
      const response = await postSubsidio(subsidioEntity);
      if (response.status === 201) {
        alert("Error al agregar subsidio");
      } else {
        alert("Subsidio agregado exitosamente");
      }
    } catch (error) {
      console.error("Error al enviar los datos del subsidio:", error);
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
          Seleccione el Socio:
          <select
            name="socioSeleccionado"
            value={socioSeleccionado?.cedulaSocio || ""}
            onChange={handleChangeSocioSeleccionado}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio</option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {socio.nombreSocio} {socio.apellidoSocio}
              </option>
            ))}
          </select>
          {errores.socioSeleccionado && (
            <span className="error">{errores.socioSeleccionado}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Valor Cuota UR:
          <input
            type="text"
            name="valorViviendaUr"
            value={valorViviendaUr}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.valorViviendaUr && (
            <span className="error">{errores.valorViviendaUr}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Subsidio UR:
          <input
            type="text"
            name="subsidioUr"
            value={subsidioUr}
            onChange={handleChangeSubsidioUr}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.subsidioUr && (
            <span className="error">{errores.subsidioUr}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Porcentaje de Subsidio:
          <input
            type="text"
            name="porcentaje"
            value={porcentaje}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.porcentaje && (
            <span className="error">{errores.porcentaje}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Cuota a Pagar UR:
          <input
            type="text"
            name="cuotaApagarUr"
            value={cuotaApagarUr}
            onChange={handleChangeCuotaApagarUr}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.cuotaApagarUr && (
            <span className="error">{errores.cuotaApagarUr}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Vigencia en cantidad de meses:
          <input
            type="text"
            name="vigenciaEnMeses"
            value={vigenciaEnMeses}
            onChange={handleChangeVigenciaEnMeses}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.vigenciaEnMeses && (
            <span className="error">{errores.vigenciaEnMeses}</span>
          )}
        </label>

        <label className="block text-sm font-medium mb-2">
          Fecha de Otorgamiento:
          <input
            type="date"
            name="fechaOtorgado"
            value={fechaOtorgado}
            onChange={handleChangeFechaOtorgado}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.fechaOtorgado && (
            <span className="error">{errores.fechaOtorgado}</span>
          )}
        </label>
        <label className="block text-sm font-medium mb-2">
          Fecha de Expiración:
          <input
            type="date"
            name="fechaExpira"
            value={fechaExpira}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            readOnly
          />
          {errores.fechaExpira && (
            <span className="error">{errores.fechaExpira}</span>
          )}
        </label>
        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Agregar Subsidio
        </button>
      </form>
    </div>
  );
};

export default AltaSubsidio;
