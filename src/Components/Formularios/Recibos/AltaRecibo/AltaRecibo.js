"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import { useRouter } from "next/navigation";
import { postRecibo } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
const AltaRecibo= ({Socio}) => {
  const router = useRouter();
  const {miembro} = useContext(MiembroContext) 
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [recargo, setRecargo] = useState(0);
  const [interes, setInteres] = useState(0);
  const [capital, setCapital] = useState(0);
  const [cuotaSocial, setCuotaSocial] = useState(0);
  const [convenio, setConvenio] = useState(0);
  const [cuotaMensual, setCuotaMensual] = useState(0);
  const [sumaPesos, setSumaPesos] = useState("");
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    console.log(Socio)
  }, [Socio]);
 
  const handleChangefechaRecibo = (e) => {
    setFechaIngreso(e.target.value);
  };

  const handleChangeRecargo = (e) => {
    setRecargo(e.target.value);
  };

  const handleChangeInteres = (e) => {
    setInteres(e.target.value);
  };

  const handleChangeCuotaSocial = (e) => {
    setCuotaSocial(e.target.value);
  };

  const handleChangeConvenio = (e) => {
    setConvenio(e.target.value);
  };
  const handleChangeCuotaMensual = (e) => {
    setCuotaMensual(e.target.value);
  };
  const handleChangeSumaPesos = (e) => {
    setSumaPesos(e.target.value);
  };
  const handleChangeCapital = (e) => {
    setCapital(e.target.value);
  };

  const handleChangeTieneSuplente = (e) => {
    setTieneSuplente(e.target.checked);
  };

  const validarFormulario = () => {
    const errores = {};
    if (!fechaIngreso) errores.FechaIngreso = "La fecha de ingreso es obligatoria";
    if (!recargo) errores.Recargo = "El Recargo es obligatoria";
    if (!interes) errores.Interes = "El Interes es obligatorio";
    if (!capital) errores.Capital = "La Capital es obligatorio";
    if (!cuotaSocial) errores.CuotaSocial = "La Cuota Social es obligatorio";
    if (!convenio) errores.Convenio = "El Convenio es obligatorio";
    if (!cuotaMensual) errores.CuotaMensual = "La CuotaMensual es obligatorio";
    if (!sumaPesos) errores.SumaPesos = "La Suma en Pesos es obligatorio";  

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    console.log(ViviendaData.nroVivienda);

    const ReciboData = {
        capital : capital,
        convenio : convenio,
        cuota_mensual : cuotaMensual,
        cuota_social: cuotaSocial,
        fecha_recibo : fechaIngreso,
        interes : interes,
        recargo : recargo,
        suma_en_pesos : sumaPesos,
    }

    try {
      const response = await postRecibo(ReciboData, Socio.cedulaSocio , miembro.idMiembro);
      console.log(response);
      alert("Dado de alta correctamente");
    } catch (error) {
      console.error("Error al enviar los datos del recibo:", error);
    }
  };
  //      ruta dinamica
  //      router.push(`/UserInfo/${NroSocio}`);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form onSubmit={handleSubmit} className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nroSocio">
            Nro. Recibo:
          </label>
          <input
            type="text"
            id="nroSocio"
            name="nroSocio"
            value={NroRecibo}
            onChange={handleChangeNroRecibo}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.nroSocio && (
            <span className="text-red-500 text-sm">{Errores.nroSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nombreSocio">
            Nombres:
          </label>
          <input
            type="text"
            id="nombreSocio"
            name="nombreSocio"
            value={NombreSocio}
            onChange={handleChangeNombreSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.nombreSocio && (
            <span className="text-red-500 text-sm">{Errores.nombreSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="apellidoSocio">
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidoSocio"
            name="apellidoSocio"
            value={ApellidoSocio}
            onChange={handleChangeApellidoSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.apellidoSocio && (
            <span className="text-red-500 text-sm">{Errores.apellidoSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="cedulaSocio">
            Número de CI.:
          </label>
          <input
            type="text"
            id="cedulaSocio"
            name="cedulaSocio"
            value={CedulaSocio}
            onChange={handleChangeCedulaSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.cedulaSocio && (
            <span className="text-red-500 text-sm">{Errores.cedulaSocio}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="telefonoSocio">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefonoSocio"
            name="telefonoSocio"
            value={TelefonoSocio}
            onChange={handleChangeTelefonoSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.telefonoSocio && (
            <span className="text-red-500 text-sm">{Errores.telefonoSocio}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="capitalSocio">
            Capital:
          </label>
          <input
            type="text"
            id="capitalSocio"
            name="capitalSocio"
            value={CapitalSocio}
            onChange={handleChangeCapitalSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.capitalSocio && (
            <span className="text-red-500 text-sm">{Errores.capitalSocio}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="fechaIngreso">
            Fecha de Ingreso:
          </label>
          <input
            type="date"
            id="fechaIngreso"
            name="fechaIngreso"
            value={FechaIngreso}
            onChange={handleChangeFechaIngreso}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.fechaIngreso && (
            <span className="text-red-500 text-sm">{Errores.fechaIngreso}</span>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 mb-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};
export default AltaRecibo;