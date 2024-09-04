"use client";

import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/navigation";
import {
  postRecibo,
  getUltimoReajuste,
  getUr,
  getAllViviendas,
  getUltimoConvenioSocio,
  getUltimoSubsidioSocio,
  postIngreso,
  updateSocio,
} from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
import { Recargo } from "@/Calculos/Calculos.js";
const AltaRecibo = ({ Socio, ur, interesParm, capitalParm }) => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [fechaEmision, setFechaEmision] = useState();
  const [nombreSocio, setNombreSocio] = useState("");
  const [apellidoSocio, setApellidoSocio] = useState("");
  const [recargo, setRecargo] = useState(0); // suma a la cuota dependiendo de cuantos dias hayan pasado
  const [interes, setInteres] = useState(0); // interes se descuenta de capital (cuotaMensual en ur * valor calculado de el contador)
  const [capital, setCapital] = useState(0); // NO sale del socio y se le resta el interes
  const [cuotaSocial, setCuotaSocial] = useState(0); // valor de 300 pesos aprox
  const [convenio, setConvenio] = useState(null); // el convenio es un contrato en donde si te atrasas con un pago te permiten pagarla sumandole dinero a la cuota por meses
  const [subsidio, setSubsidio] = useState(null);
  const [cuotaMensualBase, setCuotaMensualBase] = useState(0);
  const [cuotaMensual, setCuotaMensual] = useState(0); // cuota fija que se divide por el valor de la ur (se multiplica por el interes)
  const [sumaPesos, setSumaPesos] = useState(""); // Texto del dinero total
  const [fechaPago, setFechaPago] = useState();
  const [reajuste, setReajuste] = useState({});
  const [valorVivienda, setValorVivienda] = useState(0);
  const [Errores, setErrores] = useState({});
  const [vivienda, setVivienda] = useState({});
  const [ingreso, setIngreso] = useState(null);

  //Nahuel- va en altaRecibo la peticion de ur

  // useEffect (() => {
  //   fetchUr();
  // },[])

  // const fetchUr = async () => {
  //   const dataUr = await getUr();
  // }

  useEffect(() => {
    console.log(interesParm, capitalParm);
    fetchReajusteAnual();
  }, [Socio]);

  useEffect(() => {
    fetchSubsidio();
    fetchConvenio();
  }, [reajuste]);

  useEffect(() => {
    if (convenio == null) return;
    fetchCalculos();
    setCuotaSocial(400);
    console.log(Socio, "SOCIO");
    setNombreSocio(Socio.nombreSocio || "");
    setApellidoSocio(Socio.apellidoSocio || "");
  }, [convenio]);

  useEffect(() => {
    setCuotaMensual(cuotaMensualBase + recargo);
  }, [recargo]);

  const fetchReajusteAnual = async () => {
    const reajusteData = await getUltimoReajuste();
    console.log("Reajuste Anual", reajusteData);
    setReajuste(reajusteData);
  };

  const fetchSubsidio = async () => {
    const subsidioResponse = await getUltimoSubsidioSocio(Socio.cedulaSocio);
    if (subsidioResponse != null) {
      console.log(subsidioResponse);
      setSubsidio(subsidioResponse);
    } else {
      setSubsidio(0);
    }
  };

  const fetchConvenio = async () => {
    const convenioResponse = await getUltimoConvenioSocio(Socio.cedulaSocio);
    if (convenioResponse != null) {
      console.log(convenioResponse);
      setConvenio(convenioResponse);
    } else {
      setConvenio(0);
    }
  };
  //Corregir fecha a mas de un mes
  useEffect(() => {
    Recargo(fechaPago, setRecargo, ur);
  }, [fechaPago]);

  useEffect(() => {
    setValorVivienda(vivienda.valorVivienda);
  }, [vivienda]);

  useEffect(() => {
    let valorDormitorios;
    console.log(vivienda);
    if (vivienda.cantidadDormitorios == 2) {
      valorDormitorios = reajuste.cuotaMensualDosHabitacionesEnPesos;
    } else if (vivienda.cantidadDormitorios == 3) {
      valorDormitorios = reajuste.cuotaMensualTresHabitacionesEnPesos;
    }

    console.log("Valor dormitorios", valorDormitorios);
    setInteres(interesParm * (valorDormitorios / ur.buy));
    setCapital(capitalParm * (valorDormitorios / ur.buy));

    let ValorViviendaModificar = valorVivienda;

    if (subsidio && subsidio.subsidioUr) {
      console.log("Esta entrando al subsidio");
      ValorViviendaModificar -= subsidio.subsidioUr;
      console.log(
        "Valor cuotaPesos del mes",
        ValorViviendaModificar * reajuste.valorUr
      );
    }

    let valorConConvenioPesos = 0;
    if (convenio && convenio.urPorMes) {
      valorConConvenioPesos += convenio.urPorMes * ur.buy;
    }

    let valorCuotaTotalEnPesos =
      ValorViviendaModificar * reajuste.valorUr + valorConConvenioPesos;

    console.log("Valor Total", valorCuotaTotalEnPesos);

    let cuenta = parseFloat(valorCuotaTotalEnPesos) + parseFloat(cuotaSocial);
    setCuotaMensualBase(cuenta);
    setCuotaMensual(cuenta);
  }, [valorVivienda, reajuste, subsidio, convenio]);

  const fetchCalculos = async () => {
    const viviendasData = await getAllViviendas(cooperativa.idCooperativa);

    viviendasData.forEach((vivienda) => {
      if (vivienda.socio != null) {
        console.log("Entra al primero", Socio);
        if (vivienda.socio.cedulaSocio == Socio.cedulaSocio) {
          setVivienda(vivienda);
          console.log("Vivienda seleccionada", vivienda);
        }
      }
    });
  };

  const handleChangefechaRecibo = (e) => {
    setFechaEmision(e.target.value);
  };

  const handleChangefechaPago = (event) => {
    const fechaSeleccionada = event.target.value;
    setFechaPago(fechaSeleccionada);
  };

  const handleChangeSumaPesos = (e) => {
    setSumaPesos(e.target.value);
  };

  const validarFormulario = () => {
    const errores = {};
    if (!fechaEmision)
      errores.fechaEmision = "La fecha de ingreso es obligatoria";
    if (!interes) errores.Interes = "El Interes es obligatorio";
    if (!capital) errores.Capital = "El Capital es obligatorio";
    if (!cuotaSocial) errores.CuotaSocial = "La Cuota Social es obligatorio";
    if (!cuotaMensual) errores.CuotaMensual = "La CuotaMensual es obligatorio";
    if (!sumaPesos) errores.SumaPesos = "La Suma en Pesos es obligatorio";
    if (!fechaPago) errores.fechaPago = "La fecha del pago es obligatoria";

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("ENTRA");
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const response = await postRecibo(
        fechaEmision,
        fechaPago,
        recargo,
        interes,
        capital,
        cuotaSocial,
        convenio,
        subsidio,
        cuotaMensual,
        sumaPesos,
        Socio,
        miembro
      );
      console.log(response);

      const ingreso = {
        subRubro: "Amortizacion",
        denominacion: `Recibo dado de alta el ${fechaEmision}`,
        ingreso: cuotaMensual,
        cooperativaEntity: cooperativa,
        tipoMoneda: "UR",
      };
      const IngresoResponse = await postIngreso(ingreso);
      setIngreso(IngresoResponse);
      console.log("Ingreso Response", IngresoResponse);
      alert("Dado de alta correctamente");
    } catch (error) {
      console.error("Error al enviar los datos del recibo:", error);
    }
  };

  useEffect(() => {
    automaticUpdate();
  }, [ingreso]);

  const automaticUpdate = async () => {
    let socioActualizar = Socio;
    socioActualizar.capitalSocio += capital;
    if (ingreso != null) {
      const socioUpdate = await updateSocio(socioActualizar);
      console.log("Socio Update", socioUpdate);
    }
  };
  //      ruta dinamica
  //      router.push(`/UserInfo/${NroSocio}`);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-screen min-w-lg bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="nombreSocio"
            >
              Nombre Socio:
            </label>
            <input
              type="text"
              readOnly
              id="nombreSocio"
              name="nombreSocio"
              value={nombreSocio || ""}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="apellidoSocio"
            >
              Apellido Socio:
            </label>
            <input
              type="text"
              id="apellidoSocio"
              name="apellidoSocio"
              readOnly
              value={apellidoSocio || ""}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="cedulaSocio"
            >
              Número de CI.:
            </label>
            <input
              type="text"
              id="cedulaSocio"
              name="cedulaSocio"
              readOnly
              value={Socio.cedulaSocio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="telefonoSocio"
            >
              Nombre Administrador:
            </label>
            <input
              type="text"
              id="nombreSocio"
              name="nombreSocio"
              readOnly
              value={miembro.socio.nombreSocio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="capitalSocio"
            >
              Apellido Administrador:
            </label>
            <input
              type="text"
              id="capitalSocio"
              name="capitalSocio"
              readOnly
              value={miembro.socio.apellidoSocio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fechaEmision"
            >
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
            {Errores.fechaEmision && (
              <span className="text-red-500 text-sm">
                {Errores.fechaEmision}
              </span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fechaPago"
            >
              Fecha de Pago:
            </label>
            <input
              type="date"
              id="fechaPago"
              name="fechaPago"
              value={fechaPago}
              onChange={handleChangefechaPago}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.fechaPago && (
              <span className="text-red-500 text-sm">{Errores.fechaPago}</span>
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
              readOnly
              value={recargo}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.Recargo && (
              <span className="text-red-500 text-sm">{Errores.Recargo}</span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="interes">
              Interes:
            </label>
            <input
              type="text"
              id="interes"
              name="interes"
              readOnly
              value={interes}
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
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.Capital && (
              <span className="text-red-500 text-sm">{Errores.Capital}</span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="convenio"
            >
              Convenio:
            </label>
            <input
              type="text"
              id="convenio"
              name="convenio"
              readOnly
              value={convenio?.urPorMes || 0}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.Convenio && (
              <span className="text-red-500 text-sm">{Errores.Convenio}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="subsidio"
            >
              Subsidio:
            </label>
            <input
              type="text"
              id="subsidio"
              name="subsidio"
              readOnly
              value={subsidio?.subsidioUr || 0}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.Subsidio && (
              <span className="text-red-500 text-sm">{Errores.Subsidio}</span>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="cuotaSocial"
            >
              cuotaSocial:
            </label>
            <input
              type="number"
              id="cuotaSocial"
              name="cuotaSocial"
              value={cuotaSocial}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.CuotaSocial && (
              <span className="text-red-500 text-sm">
                {Errores.CuotaSocial}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="cuotaMensual"
            >
              cuotaMensual:
            </label>
            <input
              type="number"
              id="cuotaMensual"
              name="cuotaMensual"
              readOnly
              value={Math.round(cuotaMensual)}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.CuotaMensual && (
              <span className="text-red-500 text-sm">
                {Errores.CuotaMensual}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="sumaPesos"
            >
              Pesos Uruguayos:
            </label>
            <input
              type="text"
              id="sumaPesos"
              name="sumaPesos"
              value={sumaPesos}
              onChange={handleChangeSumaPesos}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.sumaPesos && (
              <span className="text-red-500 text-sm">{Errores.SumaPesos}</span>
            )}
          </div>
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
