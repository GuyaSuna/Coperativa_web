"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  postConvenio,
  getAllSociosImpagos,
  getRecibosImpagosSocio,
  getAllSocios,
} from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";
import { useSociosActivos } from "@/Hooks/Socios/useSociosActivos.js";

const AltaConvenio = ({ ur, setIdentificadorComponente }) => {
  const { cooperativa } = useContext(MiembroContext);
  const router = useRouter();
  const [deudaEnUrOriginal, setDeudaEnUrOriginal] = useState("");
  const [urPorMes, setUrPorMes] = useState("");
  const [fechaInicioConvenio, setFechaInicioConvenio] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState("");

  const [recibosImpagos, setRecibosImpagos] = useState([]);
  const [tipoDeuda, setTipoDeuda] = useState("");
  const [vigenciaEnRecibos, setVigenciaEnRecibos] = useState(12);
  const [allSocios, setAllSocios] = useState([]);
  const [allSociosImpagos, setAllSociosImpagos] = useState([]);
  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const {
    data: sociosActivos,
    isLoading,
    isError,
    error,
  } = useSociosActivos(cooperativa.idCooperativa);

  console.log("Socios Activos", sociosActivos);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFechaInicioConvenio(today);
    fetchSociosImpagos();
  }, []);

  useEffect(() => {
    if (tipoDeuda === "recibo" && socioSeleccionado) {
      fetchRecibosImpagos(socioSeleccionado);
    }
  }, [tipoDeuda, socioSeleccionado]);

  const fetchSociosImpagos = async () => {
    try {
      const response = await getAllSociosImpagos(cooperativa.idCooperativa);
      const sociosSinArchivar = response.filter((socio) => !socio.archivado);
      setAllSociosImpagos(sociosSinArchivar);
    } catch (error) {
      console.error("Error al obtener los socios", error);
    }
  };

  useEffect(() => {
    if (deudaEnUrOriginal && vigenciaEnRecibos > 0) {
      const urMensual = deudaEnUrOriginal / vigenciaEnRecibos;
      setUrPorMes(urMensual.toFixed(2));
    }
  }, [vigenciaEnRecibos, deudaEnUrOriginal]);

  const fetchRecibosImpagos = async (cedulaSocio) => {
    try {
      const response = await getRecibosImpagosSocio(
        cedulaSocio,
        cooperativa.idCooperativa
      );
      if (response != null || response.length > 0) {
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1;
        const anioActual = fechaActual.getFullYear();

        const recibosFiltrados = response.filter((recibo) => {
          const fechaRecibo = new Date(recibo.fechaRecibo);
          const mesRecibo = fechaRecibo.getMonth() + 1;
          const anioRecibo = fechaRecibo.getFullYear();

          return !(mesRecibo === mesActual && anioRecibo === anioActual);
        });

        setRecibosImpagos(recibosFiltrados);

        const totalDeudaEnUr = recibosFiltrados.reduce((total, recibo) => {
          const cuotaMensualEnPesos = recibo.cuotaMensual;
          const deudaEnUr = cuotaMensualEnPesos / ur;
          return total + deudaEnUr;
        }, 0);

        setDeudaEnUrOriginal(totalDeudaEnUr.toFixed(2));

        const urMensual = totalDeudaEnUr / vigenciaEnRecibos;
        setUrPorMes(urMensual.toFixed(2));
      } else {
        setUrPorMes(0);
        setDeudaEnUrOriginal(0);
      }
    } catch (error) {
      console.error("Error al obtener los recibos impagos", error);
    }
  };

  const handleChangeVigenciaEnRecibos = (e) =>
    setVigenciaEnRecibos(e.target.value);
  const handleChangeDeudaEnUrOriginal = (e) =>
    setDeudaEnUrOriginal(e.target.value);
  const handleChangeUrPorMes = (e) => setUrPorMes(e.target.value);
  const handleChangeFechaInicio = (e) => setFechaInicioConvenio(e.target.value);
  const handleChangeSocioSeleccionado = (e) =>
    setSocioSeleccionado(e.target.value);
  const handleChangeTipoDeuda = (e) => setTipoDeuda(e.target.value);

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!tipoDeuda || tipoDeuda.trim() === "") {
      errores.tipoDeuda = "La deuda debe tener un tipo de deuda";
    }

    if (!deudaEnUrOriginal || deudaEnUrOriginal.trim() === "") {
      errores.deudaEnUrOriginal = "La deuda del convenio es obligatoria";
    } else if (isNaN(deudaEnUrOriginal)) {
      errores.deudaEnUrOriginal = "La deuda debe ser un número";
    }

    if (!urPorMes || urPorMes.trim() === "") {
      errores.urPorMes = "El valor del convenio es obligatorio";
    } else if (isNaN(urPorMes)) {
      errores.urPorMes = "El valor por mes debe ser un número";
    }

    if (!fechaInicioConvenio) {
      errores.fechaInicioConvenio = "La fecha de inicio es obligatoria";
    } else if (fechaInicioConvenio > fechaHoy) {
      errores.fechaInicioConvenio =
        "La fecha de inicio no puede ser mayor a la fecha actual";
    }

    if (!socioSeleccionado) {
      errores.socioSeleccionado = "Debe seleccionar un socio";
    }

    if (tipoDeuda === "recibo" && recibosImpagos.length === 0) {
      errores.tipoDeuda =
        "El socio debe tener al menos un recibo impago para aplicar este convenio";
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
    setMostrarModal(false);
    e.preventDefault();
    if (!validarFormulario()) return;

    const listaFechasRecibos = recibosImpagos.map(
      (recibo) => recibo.fechaRecibo
    );

    const ConvenioData = {
      deudaEnUrOriginal,
      deudaRestante: deudaEnUrOriginal,
      urPorMes,
      vigenciaEnRecibos,
      fechaInicioConvenio,
      tipoConvenio: tipoDeuda,
      listaFechasRecibos,
    };

    try {
      const response = await postConvenio(
        ConvenioData,
        socioSeleccionado,
        cooperativa.idCooperativa
      );

      setIdentificadorComponente(26);
    } catch (error) {
      console.error("Error al enviar los datos del convenio:", error);
    }
  };

  // useEffect(() => {
  //   const fetchSocios = async () => {
  //     try {
  //       if (tipoDeuda === "recibo") {
  //         const sociosSinArchivar = allSociosImpagos.filter(
  //           (socio) => !socio.archivado
  //         );
  //         setSociosDisponibles(sociosSinArchivar);
  //       } else if (tipoDeuda === "otro") {
  //         const sociosSinArchivar = allSocios.filter(
  //           (socio) => !socio.archivado
  //         );
  //         setSociosDisponibles(sociosSinArchivar);
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener los socios", error);
  //     }
  //   };

  //   fetchSocios();
  // }, [tipoDeuda, cooperativa.idCooperativa]);

  if (isLoading) return <p>Cargando socios...</p>;
  if (isError) return <p>Error al cargar socios: {error.message}</p>;

  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Tipo de Deuda */}
        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="tipoDeuda">
            Tipo de Deuda
          </label>
          <select
            id="tipoDeuda"
            name="tipoDeuda"
            value={tipoDeuda}
            onChange={handleChangeTipoDeuda}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un tipo de deuda</option>
            <option value="recibo">Recibo</option>
            <option value="otro">Otro</option>
          </select>
          {errores.tipoDeuda && (
            <span className="text-red-500">{errores.tipoDeuda}</span>
          )}
        </div>

        {/* Socio Seleccionado */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="socioSeleccionado"
          >
            Socio Seleccionado
          </label>
          <select
            id="socioSeleccionado"
            name="socioSeleccionado"
            value={socioSeleccionado}
            onChange={handleChangeSocioSeleccionado}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccione un socio</option>
            {!isLoading &&
              !isError &&
              sociosActivos?.map((socio) => (
                <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                  {socio.nombreSocio} {socio.apellidoSocio} ({socio.cedulaSocio}
                  )
                </option>
              ))}
          </select>
        </div>

        {/* Fecha de Inicio del Convenio */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="fechaInicioConvenio"
          >
            Fecha de Inicio del Convenio
          </label>
          <input
            type="date"
            id="fechaInicioConvenio"
            name="fechaInicioConvenio"
            value={fechaInicioConvenio}
            onChange={handleChangeFechaInicio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          {errores.fechaInicioConvenio && (
            <span className="text-red-500">{errores.fechaInicioConvenio}</span>
          )}
        </div>

        {/* Vigencia en Meses */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="vigenciaEnRecibos"
          >
            Vigencia en Recibos
          </label>
          <input
            type="number"
            name="vigenciaEnRecibos"
            id="vigenciaEnRecibos"
            value={vigenciaEnRecibos}
            onChange={handleChangeVigenciaEnRecibos}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Total Deuda en UR */}
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="deudaEnUrOriginal"
          >
            Total Deuda en UR
          </label>
          <input
            type="text"
            id="deudaEnUrOriginal"
            name="deudaEnUrOriginal"
            value={deudaEnUrOriginal}
            onChange={handleChangeDeudaEnUrOriginal}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          {errores.deudaEnUrOriginal && (
            <span className="text-red-500">{errores.deudaEnUrOriginal}</span>
          )}
        </div>

        {/* Valor a Pagar Mensual (UR por Mes) */}
        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="urPorMes">
            Valor a Pagar Mensual (UR por Mes)
          </label>
          <input
            type="text"
            id="urPorMes"
            name="urPorMes"
            value={urPorMes}
            onChange={handleChangeUrPorMes}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          {errores.urPorMes && (
            <span className="text-red-500">{errores.urPorMes}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Dar de Alta Convenio
        </button>
        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea dar de alta este socio?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AltaConvenio;
