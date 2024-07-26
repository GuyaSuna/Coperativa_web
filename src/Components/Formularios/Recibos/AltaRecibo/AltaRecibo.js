"use client";

import React, { useState, useEffect, useContext } from "react";
import "./FormStyle.css";
import { useRouter } from "next/navigation";
import { postRecibo } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
const AltaRecibo= ({Socio}) => {
  const router = useRouter();
  const {miembro} = useContext(MiembroContext) 
  const [fechaEmision, setFechaEmision] = useState(Date.now());
  const [recargo, setRecargo] = useState(0); // suma a la cuota dependiendo de cuantos dias hayan pasado
  const [interes, setInteres] = useState(0); // interes se descuenta de capital (cuotaMensual en ur * valor calculado de el contador)
  const [capital, setCapital] = useState(0); // sale del socio y se le resta el interes
  const [cuotaSocial, setCuotaSocial] = useState(0); // valor de 300 pesos aprox
  const [convenio, setConvenio] = useState(0); // dudoso creo que es plata que se suma por no cumplir horas de trabajo
  const [cuotaMensual, setCuotaMensual] = useState(0); // cuota fija que se divide por el valor de la ur
  const [sumaPesos, setSumaPesos] = useState(""); // Texto del dinero total
  const [Errores, setErrores] = useState({});

  useEffect(() => {
    console.log(Socio)
    console.log(fechaEmision)
  }, [Socio]);
 
  const handleChangefechaRecibo = (e) => {
    setFechaEmision(e.target.value);
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
          <label className="block text-sm font-medium mb-2" htmlFor="nombreSocio">
            Nombre Socio:
          </label>
          <input
            type="text"
            readOnly
            id="nombreSocio"
            name="nombreSocio"
            value={Socio.nombreSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="apellidoSocio">
            Apellido Socio:
          </label>
          <input
            type="text"
            id="apellidoSocio"
            name="apellidoSocio"
            readOnly
            value={Socio.apellidoSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="cedulaSocio">
            Número de CI.:
          </label>
          <input
            type="text"
            id="cedulaSocio"
            name="cedulaSocio"
            value={Socio.cedulaSocio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="telefonoSocio">
            Nombre Administrador:
          </label>
          <input
            type="text"
            id="telefonoSocio"
            name="telefonoSocio"
            readOnly
            value={miembro.nombreMiembro}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="capitalSocio">
            Apellido Administrador:
          </label>
          <input
            type="text"
            id="capitalSocio"
            name="capitalSocio"
            readOnly
            value={miembro.apellidoMiembro}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="fechaEmision">
            Fecha de Emision:
          </label>
          <input
            type="date"
            id="fechaIngreso"
            name="fechaIngreso"
            value={fechaEmision}
            onChange={handleChangefechaRecibo}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.fechaIngreso && (
            <span className="text-red-500 text-sm">{Errores.fechaIngreso}</span>
          )}
        </div>

        {/* posible optional */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="recargo">
            Recargo:
          </label>
          <input
            type="text"
            id="recargo"
            name="recargo"
            value={recargo}
            onChange={handleChangeRecargo}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.Recargo && (
            <span className="text-red-500 text-sm">{Errores.Recargo}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="interes">
            Interes:
          </label>
          <input
            type="text"
            id="interes"
            name="interes"
            value={interes}
            onChange={handleChangeInteres}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.Interes && (
            <span className="text-red-500 text-sm">{Errores.Interes}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="capital">
            Capital:
          </label>
          <input
            type="text"
            id="capital"
            name="capital"
            value={capital}
            onChange={handleChangeCapital}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.Capital && (
            <span className="text-red-500 text-sm">{Errores.Capital}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="convenio">
            Convenio:
          </label>
          <input
            type="text"
            id="convenio"
            name="convenio"
            value={convenio}
            onChange={handleChangeConvenio}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.Convenio && (
            <span className="text-red-500 text-sm">{Errores.Convenio}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="cuotaSocial">
            cuotaSocial:
          </label>
          <input
            type="text"
            id="cuotaSocial"
            name="cuotaSocial"
            value={cuotaSocial}
            onChange={handleChangeCuotaSocial}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.CuotaSocial && (
            <span className="text-red-500 text-sm">{Errores.CuotaSocial}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="cuotaMensual">
            cuotaMensual:
          </label>
          <input
            type="text"
            id="cuotaMensual"
            name="cuotaMensual"
            value={cuotaMensual}
            onChange={handleChangeCuotaMensual}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {Errores.CuotaMensual && (
            <span className="text-red-500 text-sm">{Errores.CuotaMensual}</span>
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