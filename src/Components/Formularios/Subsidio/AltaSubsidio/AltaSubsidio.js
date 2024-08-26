"use client";

import React, { useState, useEffect, useContext } from "react";
import "./subsidioStyle.css";
import { useRouter } from "next/navigation";
import { postSubsidio, getAllSocios } from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";

const AltaSubsidio = () => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);

  const [cuotaTotalUr, setCuotaTotalUr] = useState("");
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
    fetchSociosDisponibles();
  }, []);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      setSociosDisponibles(response);
      console.log("Socios disponibles: ", response);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    }
  };

  const handleChangeCuotaTotalUr = (e) => setCuotaTotalUr(e.target.value);
  const handleChangeCuotaApagarUr = (e) => setCuotaApagarUr(e.target.value);
  const handleChangeSubsidioUr = (e) => setSubsidioUr(e.target.value);
  const handleChangePorcentaje = (e) => setPorcentaje(e.target.value);
  const handleChangeVigenciaEnMeses = (e) => setVigenciaEnMeses(e.target.value);
  const handleChangeFechaOtorgado = (e) => setFechaOtorgado(e.target.value);
  const handleChangeFechaExpira = (e) => setFechaExpira(e.target.value);

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
        const vivienda = await getViviendaBySocio(selectedSocio.cedulaSocio);
        if (vivienda) {
          setCuotaTotalUr(vivienda.cuotaUr);
        }
      } catch (error) {
        console.error("Error al obtener la vivienda del socio:", error);
      }
    }
  };

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!cuotaTotalUr) errores.cuotaTotalUr = "La cuota total es obligatoria";
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
      cuotaTotalUr,
      cuotaApagarUr,
      subsidioUr,
      porcentaje,
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
            name="cuotaTotalUr"
            value={cuotaTotalUr}
            onChange={handleChangeCuotaTotalUr}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.cuotaTotalUr && (
            <span className="error">{errores.cuotaTotalUr}</span>
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
          />
          {errores.cuotaApagarUr && (
            <span className="error">{errores.cuotaApagarUr}</span>
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
            onChange={handleChangePorcentaje}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errores.porcentaje && (
            <span className="error">{errores.porcentaje}</span>
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
            onChange={handleChangeFechaExpira}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
