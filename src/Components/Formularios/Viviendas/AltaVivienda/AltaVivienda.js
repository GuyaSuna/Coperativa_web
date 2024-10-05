"use client";

import { useState, useContext, useEffect } from "react";
import "./livingPlaceStyle.css";
import { useRouter } from "next/navigation";
import { postVivienda, getAllViviendas } from "../../../../Api/api.js";
import { MiembroContext } from "@/Provider/provider";
import { ModalConfirmacion } from "@/Components/ModalConfirmacion";

const AltaVivienda = ({ setIdentificadorComponente }) => {
  const router = useRouter();
  const { cooperativa } = useContext(MiembroContext);
  const [NroVivienda, setNroVivienda] = useState();
  const [CantidadDormitorios, setCantidadDormitorios] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [Errores, setErrores] = useState();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChangeCantidadDormitorios = (e) => {
    setCantidadDormitorios(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    validarCupos();
  }, []);

  const validarFormulario = () => {
    const errores = {};
    if (!NroVivienda) {
      errores.nroVivienda = "El número de vivienda es obligatorio";
    } else if (isNaN(NroVivienda)) {
      errores.nroVivienda = "El número de vivienda debe ser un número válido";
    }

    if (!CantidadDormitorios) {
      errores.cantidadDormitorios = "La cantidad de dormitorios es obligatoria";
    } else if (isNaN(CantidadDormitorios)) {
      errores.cantidadDormitorios =
        "La cantidad de dormitorios debe ser un número válido";
    }

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  const handleChangeNroVivienda = (e) => {
    setNroVivienda(e.target.value);
    console.log(e.target.value);
  };

  const validarCupos = async () => {
    const ViviendaResponse = await getAllViviendas(cooperativa.idCooperativa);
    console.log("Cantidad viviendas", ViviendaResponse.length);
    if (ViviendaResponse.length >= cooperativa.cuposLibre) {
      console.log("Seteo false");
      setIsOpen(false);
    }
    return;
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
    if (!isOpen) {
      alert("No quedan cupos libres en la cooperativa");
      return;
    }
    const data = {
      nroVivienda: NroVivienda,
      cantidadDormitorios: CantidadDormitorios,
    };
    console.log(data);

    const response = await postVivienda(data, cooperativa.idCooperativa);
    setIdentificadorComponente(1);
    console.log(response);
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-md bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-md"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="houseNumber"
            >
              Número de vivienda:
            </label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={NroVivienda}
              onChange={handleChangeNroVivienda}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores?.nroVivienda && (
              <span className="text-red-500 text-sm">
                {Errores.nroVivienda}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="numberOfBedrooms"
            >
              Cantidad de Dormitorios:
            </label>
            <input
              type="text"
              id="numberOfBedrooms"
              name="numberOfBedrooms"
              value={CantidadDormitorios}
              onChange={handleChangeCantidadDormitorios}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {Errores?.cantidadDormitorios && (
              <span className="text-red-500 text-sm">
                {Errores.cantidadDormitorios}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Submit
        </button>
        {mostrarModal && (
          <ModalConfirmacion
            mensaje="¿Está seguro de que desea dar de alta esta vivienda?"
            onConfirm={handleConfirmacion}
            onCancel={() => setMostrarModal(false)}
          />
        )}
      </form>
    </div>
  );
};
export default AltaVivienda;
