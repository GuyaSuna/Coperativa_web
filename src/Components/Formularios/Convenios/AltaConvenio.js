"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSocios, postConvenio } from "../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";

const AltaConvenio = () => {
  const { cooperativa } = useContext(MiembroContext);
  const [deudaSocio, setDeudaSocio] = useState("");
  const [valorConvenio, setValorConvenio] = useState("");
  const [cantidadCuotas, setCantidadCuotas] = useState("");
  const [fechaInicioConvenio, setFechaInicioConvenio] = useState("");
  const [fechaFinConvenio, setFechaFinConvenio] = useState("");
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
      console.log("Socios disponibles", response);
    } catch (error) {
      console.error("Error al obtener los socios", error);
    }
  };

  const handleChangeDeudaSocio = (e) => setDeudaSocio(e.target.value);
  const handleChangeValorConvenio = (e) => setValorConvenio(e.target.value);
  const handleChangeCantidadCuotas = (e) => setCantidadCuotas(e.target.value);
  const handleChangeFechaInicio = (e) => setFechaInicioConvenio(e.target.value);
  const handleChangeFechaFin = (e) => setFechaFinConvenio(e.target.value);
  const handleChangeSocioSeleccionado = (e) => {
    const selectedCedula = e.target.value;
    console.log(selectedCedula, "cedula seleccionada handle");
    const selectedSocio = sociosDisponibles.find(
      (socio) => socio.cedulaSocio == selectedCedula
    );
    setSocioSeleccionado(selectedSocio);
    console.log(selectedSocio, "socio seleccionado");
  };

  const validarFormulario = () => {
    const errores = {};
    const fechaHoy = new Date().toISOString().split("T")[0];

    if (!deudaSocio)
      errores.deudaSocio = "La deuda del convenio es obligatoria";
    if (!valorConvenio)
      errores.valorConvenio = "El valor del convenio es obligatorio";
    if (!cantidadCuotas)
      errores.cantidadCuotas = "La cantidad de cuotas es obligatoria";
    if (!fechaInicioConvenio) {
      errores.fechaInicioConvenio = "La fecha de inicio es obligatoria";
    } else if (fechaInicioConvenio > fechaHoy) {
      errores.fechaOtorgado =
        "La fecha de inicio no puede ser mayor a la fecha actual";
    }

    if (!fechaFinConvenio) {
      errores.fechaFinConvenio = "La fecha de finalizacion es obligatoria";
    } else if (fechaFinConvenio < fechaHoy) {
      ("La fecha de fin no puede ser menor a las fecha actual.");
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
      deudaSocio: deudaSocio,
      valorConvenio: valorConvenio,
      cantidadCuotas: cantidadCuotas,
      fechaInicioConvenio: fechaInicioConvenio,
      fechaFinConvenio: fechaFinConvenio,
    };

    try {
      const response = await postConvenio(ConvenioData, socioSeleccionado);
      console.log(response);
      alert("Dado de alta correctamente");
    } catch (error) {
      console.error("Error al enviar los datos del convenio:", error);
    }
  };
  return (
    <div className="max-h-screen flex items-center justify-center  bg-white dark:bg-gray-800 text-black dark:text-white">
      {/*<form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="houseNumber"
          >
            Mensaje:
          </label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={Mensaje}
            onChange={handleChangeMensaje}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <select
          id="seleccionVivienda"
          name="seleccionVivienda"
          value={usuario}
          onChange={handleChangeUsuario}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.idMiembro} value={usuario.idMiembro}>
              {`Usuario Nro.: ${usuario.idMiembro} - ${usuario.nombreMiembro}`}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-60 mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Subir Aviso
        </button>
      </form>*/}

      <form
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="deudaSocio"
            id="deudaSocio"
            value={deudaSocio}
            onChange={handleChangeDeudaSocio}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Deuda Socio
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="valorConvenio"
            id="valorConvenio"
            value={valorConvenio}
            onChange={handleChangeValorConvenio}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Valor Convenio
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="cantidadCuotas"
            id="cantidadCuotas"
            value={cantidadCuotas}
            onChange={handleChangeCantidadCuotas}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cantidad De Cuotas
          </label>
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
              className="block text-sm font-medium mb-2"
              htmlFor="fechaFin"
            >
              Fecha de Finalizacion
            </label>
            <input
              type="date"
              id="fechaDeFin"
              name="fechaDeFin"
              value={fechaFinConvenio}
              onChange={handleChangeFechaFin}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errores.fechaFinConvenio && (
              <span className="text-red-500 text-sm">
                {errores.fechaFinConvenio}
              </span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select un socio
            </label>
            <select
              id="seleccionSocio"
              name="seleccionSocio"
              value={socioSeleccionado}
              onChange={handleChangeSocioSeleccionado}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Seleccione un socio </option>
              {sociosDisponibles.map((socio) => (
                <option key={socio.cedulaSocio} value={socio.cedulaSocio}>
                  {`Socio: ${socio.nombreSocio} ${socio.apellidoSocio}`}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group"></div>
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
