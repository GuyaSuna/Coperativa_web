"use client";

import React, { useState, useEffect, useContext } from "react";
import "./subsidioStyle.css";
import { useRouter } from "next/navigation";
import {
  postSubsidio,
  getAllSocios,
  getAllSubsidios,
  getViviendaPorSocio,
} from "../../../../Api/api";
import { MiembroContext } from "../../../../Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const AltaSubsidio = ({ setIdentificadorComponente }) => {
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
  const [allSubsidios, setAllSubsidios] = useState([]);
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [sociosSinSubsidio, setSosciosSinSubsidios] = useState([]);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    setFechaOtorgado(obtenerFechaHoy());
  }, []);

  useEffect(() => {
    //
  }, [allSubsidios, sociosDisponibles]);

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  useEffect(() => {
    fetchAllSubsidios();
  }, []);

  const fetchAllSubsidios = async () => {
    try {
      const responseSubsidio = await getAllSubsidios();
      setAllSubsidios(responseSubsidio);
    } catch {
      console.log("Error en el gatAllSubsidio");
    }
  };

  useEffect(() => {
    if (subsidioUr && valorViviendaUr) {
      const subsidioValue = parseFloat(subsidioUr);
      const valorViviendaValue = parseFloat(valorViviendaUr);
      if (
        !isNaN(subsidioValue) &&
        !isNaN(valorViviendaValue) &&
        valorViviendaValue !== 0
      ) {
        const cuota = valorViviendaValue - subsidioValue;
        setCuotaApagarUr(cuota.toFixed(2));

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
      const sociosSinArchivar = response.filter(socio => socio.archivado === false);
      setSociosDisponibles(sociosSinArchivar);
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

    const selectedSocio = sociosDisponibles.find(
      (socio) => socio.cedulaSocio == selectedCedula
    );
    setSocioSeleccionado(selectedSocio);
    if (selectedSocio) {
      try {
        const vivienda = await getViviendaPorSocio(selectedSocio.cedulaSocio);
        if (vivienda) {
          setValorViviendaUr(vivienda.valorVivienda);

        }
      } catch (error) {
        console.error("Error al obtener la vivienda del socio:", error);
      }
    }
  };

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0"); 
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); 
    const año = hoy.getFullYear();
    return `${año}-${mes}-${dia}`;
  };

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0]; 

    if (!valorViviendaUr) {
      errores.valorViviendaUr = "El valor de la vivienda es obligatorio";
    } else if (valorViviendaUr < 0) {
      errores.valorViviendaUr = "El valor de la vivienda no puede ser negativo";
    }
  
    if (!cuotaApagarUr) {
      errores.cuotaApagarUr = "La cuota a pagar es obligatoria";
    } else if (cuotaApagarUr < 0) {
      errores.cuotaApagarUr = "La cuota a pagar no puede ser negativa";
    }
  
    if (!subsidioUr) {
      errores.subsidioUr = "El subsidio es obligatorio";
    } else if (subsidioUr < 0) {
      errores.subsidioUr = "El subsidio no puede ser negativo";
    }
  
    if (!porcentaje) {
      errores.porcentaje = "El porcentaje es obligatorio";
    } else if (porcentaje < 0 || porcentaje > 100) {
      errores.porcentaje = "El porcentaje debe estar entre 0 y 100";
    }
  
    if (!vigenciaEnMeses) {
      errores.vigenciaEnMeses = "La vigencia en meses es obligatoria";
    } else if (vigenciaEnMeses < 0) {
      errores.vigenciaEnMeses = "La vigencia en meses no puede ser negativa";
    }
  
    // Validación de fechas
    if (!fechaOtorgado) {
      errores.fechaOtorgado = "La fecha de otorgamiento es obligatoria";
    } else if (fechaOtorgado > fechaHoy) {
      errores.fechaOtorgado = "La fecha de otorgamiento no puede ser mayor a la fecha actual";
    }
  
    if (!fechaExpira) {
      errores.fechaExpira = "La fecha de expiración es obligatoria";
    } else if (fechaExpira < fechaOtorgado) {
      errores.fechaExpira = "La fecha de expiración no puede ser anterior a la fecha de otorgamiento";
    }
  
    if (!socioSeleccionado) {
      errores.socioSeleccionado = "Debe seleccionar un socio";
    }
  
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setMostrarModal(true);
  };

  const handleConfirmacion = async (e) => {
    e.preventDefault();
    setMostrarModal(false);


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
        setIdentificadorComponente(17);
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
        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea dar de alta este subsidio?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaSubsidio;
