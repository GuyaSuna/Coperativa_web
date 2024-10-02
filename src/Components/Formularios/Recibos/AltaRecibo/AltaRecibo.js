"use client";

import React, { useState, useEffect, useContext } from "react";
import { NumerosALetras } from "numero-a-letras";

import { useRouter } from "next/navigation";
import {
  postRecibo,
  getUltimoReajuste,
  getUr,
  getAllViviendas,
  getConveniosVigenteSocio,
  getSubsidioVigenteSocio,
  postIngreso,
  updateSocio,
} from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
import { Recargo } from "@/Calculos/Calculos.js";
const AltaRecibo = ({ Socio, ur }) => {
  const router = useRouter();
  const { miembro, cooperativa } = useContext(MiembroContext);
  const [fechaEmision, setFechaEmision] = useState();
  const [nombreSocio, setNombreSocio] = useState("");
  const [apellidoSocio, setApellidoSocio] = useState("");
  const [recargo, setRecargo] = useState(0); // suma a la cuota dependiendo de cuantos dias hayan pasado
  const [capitalExcel, setCapitalExcel] = useState(0);
  const [interesExcel, setInteresExcel] = useState(0);
  const [interes, setInteres] = useState(0); // interes se descuenta de capital (cuotaMensual en ur * valor calculado de el contador)
  const [capital, setCapital] = useState(0); // NO sale del socio y se le resta el interes
  const [cuotaSocial, setCuotaSocial] = useState(0); // valor de 300 pesos aprox
  const [convenios, setConvenios] = useState([]); // el convenio es un contrato en donde si te atrasas con un pago te permiten pagarla sumandole dinero a la cuota por meses
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
  const [valorConvenio , setValorCovenio] = useState(0);

  //Nahuel- va en altaRecibo la peticion de ur

  // useEffect (() => {
  //   fetchUr();
  // },[])

  // const fetchUr = async () => {
  //   const dataUr = await getUr();
  // }

  useEffect(() => {
    console.log("UNIDAD REAJUSTABLE MENSUAL",ur)
    const FechaActual = new Date();
    console.log("FECHA ACTUAL", FechaActual.getMonth() + 1);
    console.log("FECHA ACTUAL", FechaActual.getFullYear());
    console.log("COOPERATIVA",cooperativa)
    cooperativa.listaCapitalInteres.map((data) => {
      let fechaData = new Date(data.fecha);
      if (
        fechaData.getMonth() == FechaActual.getMonth() &&
        fechaData.getFullYear() == FechaActual.getFullYear()
      ) {
        setCapitalExcel(data.capital);
        setInteresExcel(data.interes);
      }
    });
  }, []);
  useEffect(() => {
    fetchReajusteAnual();
  }, [Socio]);

  useEffect(() => {
    fetchSubsidio();
    fetchConvenio();
  }, [reajuste]);

  useEffect(() => {
    if (convenios == null) return;
    fetchCalculos();
    setCuotaSocial(400);
    console.log(Socio, "SOCIO");
    setNombreSocio(Socio.nombreSocio || "");
    setApellidoSocio(Socio.apellidoSocio || "");
  }, [convenios]);

  useEffect(() => {
    setCuotaMensual(cuotaMensualBase + recargo);
    let valorEnLetras = NumerosALetras(Math.round(cuotaMensualBase + recargo));
    valorEnLetras = valorEnLetras.replace("00/100 M.N.", "");
    setSumaPesos(valorEnLetras);
  }, [recargo]);

  const fetchReajusteAnual = async () => {
    const reajusteData = await getUltimoReajuste();
    console.log("Reajuste Anual", reajusteData);
    setReajuste(reajusteData);
  };

  const fetchSubsidio = async () => {
    const subsidioResponse = await getSubsidioVigenteSocio(Socio.cedulaSocio);
    if (subsidioResponse != null) {
      console.log(subsidioResponse);
      setSubsidio(subsidioResponse);
    } else {
      setSubsidio(0);
    }
  };

  const fetchConvenio = async () => {
    const convenioResponse = await getConveniosVigenteSocio(Socio.cedulaSocio);
    if (convenioResponse != null) {
      console.log(convenioResponse);
      setConvenios(convenioResponse);
      if (convenioResponse.length > 0) {
        const totalConvenio = convenioResponse.reduce((acc, convenio) => acc + convenio.urPorMes, 0);
        setValorCovenio(totalConvenio); 
      }
      
      
    } else {
      setConvenios(0);
    }
  };

  
  useEffect(() => {

    fetchConvenio()
    Recargo(fechaEmision,fechaPago, setRecargo, ur);

  }, [fechaPago]);

  useEffect(() => {
    setValorVivienda(vivienda.valorVivienda);
  }, [vivienda]);

  useEffect(() => {
    let valorDormitorios;
    if (vivienda.cantidadDormitorios === 2) {
      valorDormitorios = reajuste.cuotaMensualDosHabitacionesEnPesos;
    } else if (vivienda.cantidadDormitorios === 3) {
      valorDormitorios = reajuste.cuotaMensualTresHabitacionesEnPesos;
    }

    setInteres(interesExcel * (valorDormitorios / ur));
    setCapital(capitalExcel * (valorDormitorios / ur));

    let ValorViviendaModificar = valorVivienda;

    if (subsidio && subsidio.subsidioUr) {
      ValorViviendaModificar -= subsidio.subsidioUr;
    }

    let valorConConveniosPesos = 0;
    if (convenios.length > 0) {
      convenios.forEach((convenio) => {
        if (convenio && convenio.urPorMes) {
          valorConConveniosPesos += convenio.urPorMes * ur;
        }
      });
    }
    


    let valorCuotaTotalEnPesos =
      ValorViviendaModificar * reajuste.valorUr + valorConConveniosPesos;

    let cuenta = parseFloat(valorCuotaTotalEnPesos) + parseFloat(cuotaSocial);
    setCuotaMensualBase(cuenta);
    setCuotaMensual(Math.round(cuenta));

    let valorEnLetras = NumerosALetras(Math.round(cuenta));
    valorEnLetras = valorEnLetras.replace("00/100 M.N.", "");
    setSumaPesos(valorEnLetras);
  }, [valorVivienda, reajuste, subsidio, convenios]);




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
    console.log("ENTRA y este es el miembro", miembro);
    e.preventDefault();
    if (!validarFormulario()) return;

    console.log("Admin", miembro.responseBody    );
    try {
      const response = await postRecibo(
        fechaEmision,
        fechaPago,
        recargo,
        interes,
        capital,
        cuotaSocial,
        convenios,
        subsidio,
        cuotaMensual,
        sumaPesos,
        Socio,
        miembro.responseBody
      );
      if(response == null){
        alert("No se puede realizar un recibo a una misma persona para un mismo mes")
        return
      }
      console.log(response);

      let fechaActual = new Date();

      const ingreso = {
        subRubro: "Amortizacion",
        denominacion: `Recibo dado de alta el ${fechaEmision}`,
        ingreso: cuotaMensual,
        cooperativaEntity: cooperativa,
        tipoMoneda: "UR",
        fechaDatosContables : fechaActual,
      };
      try {
        const IngresoResponse = await postIngreso(ingreso);
        console.log("Ingreso exitoso:", IngresoResponse);      
        setIngreso(IngresoResponse);
        console.log("Ingreso Response", IngresoResponse);
        alert("Dado de alta correctamente");
      } catch (error) {
        console.error("Error en el ingreso:", error.message);
      }
      

    } catch (error) {
      console.error("Error al enviar los datos del recibo:", error);
    }
  };

  useEffect(() => {
    automaticUpdate();
  }, [ingreso]);

  const automaticUpdate = async () => {
    let socioActualizar = Socio;
    let capitalMenosInteres = capital - interes;
    socioActualizar.capitalSocio += capitalMenosInteres;
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
        <label className="block text-sm font-medium mb-2 text-right">
        </label>
        <label className="block text-sm font-medium mb-2 text-right">
          Valor UR del Mes: {ur || 0}
        </label>
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
              value={miembro.responseBody.socio.nombreSocio}
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
              value={miembro.responseBody.socio.apellidoSocio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fechaEmision"
            >
              Fecha de Recibo:
            </label>
            <input
              type="date"
              id="fechaIngreso"
              name="fechaIngreso"
              value={fechaEmision || ''}
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
              value={valorConvenio}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores.Convenios && (
              <span className="text-red-500 text-sm">{Errores.Convenios}</span>
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
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="cuotaSocial"
            >
              Cuota Social:
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
              Cuota Mensual:
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

          <div className="mb-4 col-span-2">
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
