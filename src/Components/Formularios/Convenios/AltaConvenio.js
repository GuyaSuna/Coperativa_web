"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postConvenio, getAllSociosImpagos, getRecibosImpagosSocio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";

const AltaConvenio = ({ur}) => {
  const { cooperativa } = useContext(MiembroContext);
  const router = useRouter();
  const [deudaEnUrOriginal, setDeudaEnUrOriginal] = useState("");
  const [urPorMes, setUrPorMes] = useState("");
  const [fechaInicioConvenio, setFechaInicioConvenio] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState("");
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [recibosImpagos, setRecibosImpagos] = useState([]);
  const [tipoDeuda, setTipoDeuda] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  useEffect(() => {
    if (tipoDeuda === "recibo" && socioSeleccionado) {
      fetchRecibosImpagos(socioSeleccionado);
    }
  }, [tipoDeuda, socioSeleccionado]);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSociosImpagos(cooperativa.idCooperativa);
      const sociosSinArchivar = response.filter((socio) => !socio.archivado);
      setSociosDisponibles(sociosSinArchivar);
    } catch (error) {
      console.error("Error al obtener los socios", error);
    }
  };

  const fetchRecibosImpagos = async (cedulaSocio) => {
    try {
      const response = await getRecibosImpagosSocio(cedulaSocio, cooperativa.idCooperativa);
      setRecibosImpagos(response);
      console.log(ur)
      // Calcular el total de UR de todos los recibos impagos usando el valor de la UR
      const totalDeudaEnUr = response.reduce((total, recibo) => {
        const cuotaMensualEnPesos = recibo.cuotaMensual; // Asumiendo que 'cuotaMensual' es el campo que trae el monto en pesos
        const deudaEnUr = cuotaMensualEnPesos / ur; // Dividir la cuota en pesos por el valor de la UR
        return total + deudaEnUr; // Sumar el total
      }, 0);
      setDeudaEnUrOriginal(totalDeudaEnUr);
    } catch (error) {
      console.error("Error al obtener los recibos impagos", error);
    }
};


  const handleChangeDeudaEnUrOriginal = (e) => setDeudaEnUrOriginal(e.target.value);
  const handleChangeUrPorMes = (e) => setUrPorMes(e.target.value);
  const handleChangeFechaInicio = (e) => setFechaInicioConvenio(e.target.value);
  const handleChangeSocioSeleccionado = (e) => setSocioSeleccionado(e.target.value);
  const handleChangeTipoDeuda = (e) => setTipoDeuda(e.target.value);

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!deudaEnUrOriginal) errores.deudaEnUrOriginal = "La deuda del convenio es obligatoria";
    if (!urPorMes) errores.urPorMes = "El valor del convenio es obligatorio";
    if (!fechaInicioConvenio) {
      errores.fechaInicioConvenio = "La fecha de inicio es obligatoria";
    } else if (fechaInicioConvenio > fechaHoy) {
      errores.fechaOtorgado = "La fecha de inicio no puede ser mayor a la fecha actual";
    }
    if (!socioSeleccionado) errores.socioSeleccionado = "Debe seleccionar un socio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const ConvenioData = {
      deudaEnUrOriginal: deudaEnUrOriginal,
      deudaRestante: deudaEnUrOriginal,
      urPorMes: urPorMes,
      fechaInicioConvenio: fechaInicioConvenio,
      tipoDeuda: tipoDeuda,
    };

    try {
      const response = await postConvenio(ConvenioData, socioSeleccionado, cooperativa.idCooperativa);
      console.log(response);
      alert("Convenio dado de alta correctamente");
      router.push("/convenios");
    } catch (error) {
      console.error("Error al enviar los datos del convenio:", error);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
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
            <option value="">Seleccione el tipo de deuda</option>
            <option value="recibo">Recibo</option>
            <option value="otro">Otro tipo de deuda</option>
          </select>
        </div>
        {tipoDeuda === "recibo" && recibosImpagos.length > 0 && (
          <div className="relative z-0 w-full mb-5 group">
            <label className="block text-sm font-medium mb-2" htmlFor="recibosImpagos">
              Recibos Impagos
            </label>
            <ul className="list-disc ml-5">
              {recibosImpagos.map((recibo, index) => (
                <li key={index}>
                  {`Fecha: ${recibo.fecha}, Monto: ${recibo.cuotaMensual}`}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label className="block text-sm font-medium mb-2" htmlFor="deudaUrOriginal">
              Deuda general UR
            </label>
            <input
              type="text"
              name="deudaUrOriginal"
              id="deudaUrOriginal"
              value={deudaEnUrOriginal}
              onChange={handleChangeDeudaEnUrOriginal}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block text-sm font-medium mb-2" htmlFor="urPorMes">
              UR por mes convenidas
            </label>
            <input
              type="text"
              name="urPorMes"
              id="urPorMes"
              value={urPorMes}
              onChange={handleChangeUrPorMes}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="fechaInicioConvenio">
            Fecha de Inicio del Convenio
          </label>
          <input
            type="date"
            name="fechaInicioConvenio"
            id="fechaInicioConvenio"
            value={fechaInicioConvenio}
            onChange={handleChangeFechaInicio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="block text-sm font-medium mb-2" htmlFor="socioSeleccionado">
            Seleccione Socio
          </label>
          <select
            id="socioSeleccionado"
            name="socioSeleccionado"
            value={socioSeleccionado}
            onChange={handleChangeSocioSeleccionado}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">Seleccione un socio</option>
            {sociosDisponibles.map((socio) => (
              <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                {`${socio.nombreSocio} ${socio.apellidoSocio} - ${socio.cedulaSocio}`}
              </option>
            ))}
          </select>
        </div>
        <div className="text-red-500 text-sm mb-4">
          {Object.values(errores).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Confirmar convenio
        </button>
      </form>
    </div>
  );
};

export default AltaConvenio;
