"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postReajuste , getUltimoReajuste } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
const AltaReajuste = ({ ur , setIdentificadorComponente }) => {
  const [valorUr, setValorUr] = useState("");
  const [fechaReajuste, setFechaReajuste] = useState("");
  const [cuotaMensualDosHabitacionesEnPesos, setCuotaMensualDosHabitacionesEnPesos] = useState("");
  const [cuotaMensualTresHabitacionesEnPesos, setCuotaMensualTresHabitacionesEnPesos] = useState("");
  const [mensaje, setMensaje] = useState("");
  const {cooperativa} = useContext(MiembroContext);
  const [errores, setErrores] = useState({});

  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFechaReajuste(today);
    fetchReajuste();
  },[])


  const fetchReajuste = async () => {
    const response = await getUltimoReajuste();
    if(response != null){
      setCuotaMensualDosHabitacionesEnPesos(response.cuotaMensualDosHabitacionesEnPesos.toFixed(2))
      setCuotaMensualTresHabitacionesEnPesos(response.cuotaMensualTresHabitacionesEnPesos.toFixed(2))
    }
    setValorUr(ur);

  };

  const validarFormulario = () => {
    const errores = {};
  
    if (!valorUr) {
      errores.valorUr = "El valor UR es obligatorio";
    } else if (isNaN(valorUr) || valorUr <= 0) {
      errores.valorUr = "El valor UR debe ser un número mayor que 0";
    }
  
    if (!cuotaMensualDosHabitacionesEnPesos) {
      errores.cuotaMensualDosHabitacionesEnPesos = "La cuota de 2 habitaciones es obligatoria";
    } else if (isNaN(cuotaMensualDosHabitacionesEnPesos) || cuotaMensualDosHabitacionesEnPesos <= 0) {
      errores.cuotaMensualDosHabitacionesEnPesos = "Debe ser un número mayor que 0";
    }
  
    if (!cuotaMensualTresHabitacionesEnPesos) {
      errores.cuotaMensualTresHabitacionesEnPesos = "La cuota de 3 habitaciones es obligatoria";
    } else if (isNaN(cuotaMensualTresHabitacionesEnPesos) || cuotaMensualTresHabitacionesEnPesos <= 0) {
      errores.cuotaMensualTresHabitacionesEnPesos = "Debe ser un número mayor que 0";
    }
  
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };



 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validarFormulario()) {
    return;
  }

  const data = {
    valorUr: parseFloat(valorUr),
    fechaReajuste: new Date(fechaReajuste),
    cuotaMensualDosHabitacionesEnPesos: parseFloat(cuotaMensualDosHabitacionesEnPesos),
    cuotaMensualTresHabitacionesEnPesos: parseFloat(cuotaMensualTresHabitacionesEnPesos),
  };

  try {
    const response = await postReajuste(data, cooperativa.idCooperativa);
    setMensaje("Reajuste creado con éxito" , response);
  } catch (error) {
    console.error("Error al crear el reajuste:", error);
    setMensaje("Error al crear el reajuste");
  }
};

return (
  <div className="max-h-screen items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="valorUr">
          Valor UR:
        </label>
        <input
          type="number"
          id="valorUr"
          name="valorUr"
          value={valorUr}
          onChange={(e) => setValorUr(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {errores.valorUr && (
          <span className="text-red-500 text-sm">{errores.valorUr}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="fechaReajuste">
          Fecha de Reajuste:
        </label>
        <input
          type="date"
          id="fechaReajuste"
          name="fechaReajuste"
          value={fechaReajuste}
          onChange={(e) => setFechaReajuste(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {errores.fechaReajuste && (
          <span className="text-red-500 text-sm">{errores.fechaReajuste}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="cuotaMensualDosHabitacionesEnPesos">
          Cuota Mensual (2 Habitaciones) en Pesos:
        </label>
        <input
          type="number"
          id="cuotaMensualDosHabitacionesEnPesos"
          name="cuotaMensualDosHabitacionesEnPesos"
          value={cuotaMensualDosHabitacionesEnPesos}
          onChange={(e) => setCuotaMensualDosHabitacionesEnPesos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {errores.cuotaMensualDosHabitacionesEnPesos && (
          <span className="text-red-500 text-sm">
            {errores.cuotaMensualDosHabitacionesEnPesos}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="cuotaMensualTresHabitacionesEnPesos">
          Cuota Mensual (3 Habitaciones) en Pesos:
        </label>
        <input
          type="number"
          id="cuotaMensualTresHabitacionesEnPesos"
          name="cuotaMensualTresHabitacionesEnPesos"
          value={cuotaMensualTresHabitacionesEnPesos}
          onChange={(e) => setCuotaMensualTresHabitacionesEnPesos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {errores.cuotaMensualTresHabitacionesEnPesos && (
          <span className="text-red-500 text-sm">
            {errores.cuotaMensualTresHabitacionesEnPesos}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
      >
        Crear Reajuste
      </button>
      {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
    </form>
  </div>
);

};

export default AltaReajuste;
