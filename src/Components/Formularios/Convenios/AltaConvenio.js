"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSocios, postConvenio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";

const AltaConvenio = () => {
  const { cooperativa } = useContext(MiembroContext);
  const router = useRouter();
  const [deudaEnUrOriginal, setdeudaEnUrOriginal] = useState("");
  const [urPorMes, seturPorMes] = useState("");
  const [fechaInicioConvenio, setFechaInicioConvenio] = useState("");
  const [socioSeleccionado, setsocioSeleccionado] = useState("");
  const [sociosDisponibles, setSociosDisponibles] = useState([]);
  const [errores, setErrores] = useState({});

  console.log(socioSeleccionado, "SOCIO QUE LE CORRESPONDE");
  useEffect(() => {
    fetchSociosDisponibles();
  }, []);

  const fetchSociosDisponibles = async () => {
    try {
      const response = await getAllSocios(cooperativa.idCooperativa);
      setSociosDisponibles(response);
      console.log("Socios disponibles", response);
    } catch (error) {
      console.error("Error al obtener los socios", error);
    }
  };

  const handleChangedeudaEnUrOriginal = (e) =>
    setdeudaEnUrOriginal(e.target.value);
  const handleChangeurPorMes = (e) => seturPorMes(e.target.value);
  const handleChangeFechaInicio = (e) => setFechaInicioConvenio(e.target.value);
  const handleChangesocioSeleccionado = (e) =>
    setsocioSeleccionado(e.target.value);

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!deudaEnUrOriginal)
      errores.deudaEnUrOriginal = "La deuda del convenio es obligatoria";
    if (!urPorMes) errores.urPorMes = "El valor del convenio es obligatorio";
    if (!fechaInicioConvenio) {
      errores.fechaInicioConvenio = "La fecha de inicio es obligatoria";
    } else if (fechaInicioConvenio > fechaHoy) {
      errores.fechaOtorgado =
        "La fecha de inicio no puede ser mayor a la fecha actual";
    }
    if (!socioSeleccionado)
      errores.socioSeleccionado = "Debe seleccionar un socio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const ConvenioData = {
      deudaEnUrOriginal: deudaEnUrOriginal,
      deudaRestante : deudaEnUrOriginal,
      urPorMes: urPorMes,
      fechaInicioConvenio: fechaInicioConvenio,
    };

    try {
      const response = await postConvenio(
        ConvenioData,
        socioSeleccionado,
        cooperativa.idCooperativa
      );
      console.log(response);
      alert("Dado de alta correctamente");
    } catch (error) {
      console.error("Error al enviar los datos del convenio:", error);
    }
  };
  return (
    <div className="max-h-screen flex items-center justify-center  bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_email"
              className="block text-sm font-medium mb-2"
            >
              Deuda general UR
            </label>
            <input
              type="text"
              name="deudaUrOriginal"
              id="deudaUrOriginal"
              value={deudaEnUrOriginal}
              onChange={handleChangedeudaEnUrOriginal}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_password"
              className="block text-sm font-medium mb-2"
            >
              UR por mes convenidas
            </label>
            <input
              type="text"
              name="urPorMes"
              id="urPorMes"
              value={urPorMes}
              onChange={handleChangeurPorMes}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder=" "
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fechaIngreso"
            >
              Fecha de Incio
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={fechaInicioConvenio}
              onChange={handleChangeFechaInicio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.fechaInicioConvenio && (
              <span className="text-red-500 text-sm">
                {errores.fechaInicioConvenio}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="seleccionSocio"
              className="block text-sm font-medium mb-2"
            >
              Seleccionar un socio
            </label>
            <select
              id="seleccionSocio"
              name="seleccionSocio"
              value={socioSeleccionado}
              onChange={handleChangesocioSeleccionado}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Seleccione un socio </option>
              {sociosDisponibles.map((socio) => (
                <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                  {`Socio: ${socio.nombreSocio}- ${socio.apellidoSocio}`}
                </option>
              ))}
            </select>
            {errores.socioSeleccionado && (
              <span className="text-red-500 text-sm">
                {errores.socioSeleccionado}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Agregar Convenio
        </button>
      </form>
    </div>
  );
};
export default AltaConvenio;
