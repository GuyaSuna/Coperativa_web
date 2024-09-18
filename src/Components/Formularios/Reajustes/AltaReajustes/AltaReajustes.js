"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { postReajuste } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider";
const AltaReajuste = ({ setIdentificadorComponente }) => {
  const [valorUr, setValorUr] = useState("");
  const [fechaReajuste, setFechaReajuste] = useState("");
  const [cuotaMensualDosHabitacionesEnPesos, setCuotaMensualDosHabitacionesEnPesos] = useState("");
  const [cuotaMensualTresHabitacionesEnPesos, setCuotaMensualTresHabitacionesEnPesos] = useState("");
  const [mensaje, setMensaje] = useState("");
  const {cooperativa} = useContext(MiembroContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      valorUr: parseFloat(valorUr),
      fechaReajuste: new Date(fechaReajuste),
      cuotaMensualDosHabitacionesEnPesos: parseFloat(cuotaMensualDosHabitacionesEnPesos),
      cuotaMensualTresHabitacionesEnPesos: parseFloat(cuotaMensualTresHabitacionesEnPesos),
    };
    console.log(cooperativa.idCooperativa)
    try {
        
      const response = await postReajuste(data, cooperativa.idCooperativa);
      console.log(response);
      setMensaje("Reajuste creado con éxito"); 
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
