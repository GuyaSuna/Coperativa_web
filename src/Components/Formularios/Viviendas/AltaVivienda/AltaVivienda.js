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
  const [viviendasExistentes, setViviendasExistentes] = useState([]);

  useEffect(() => {
    validarCupos();
    cargarViviendas();
  }, []);

  // Cargar todas las viviendas existentes
  const cargarViviendas = async () => {
    const ViviendaResponse = await getAllViviendas(cooperativa.idCooperativa);
    setViviendasExistentes(ViviendaResponse);
  };

  const validarFormulario = () => {
    const errores = {};

    // Validar número de vivienda
    if (!NroVivienda) {
      errores.nroVivienda = "El número de vivienda es obligatorio";
    } else if (isNaN(NroVivienda)) {
      errores.nroVivienda = "El número de vivienda debe ser un número válido";
    } else if (viviendasExistentes.some(v => v.nroVivienda == NroVivienda)) {
      errores.nroVivienda = "Ya existe una vivienda con ese número";
    }

    // Validar cantidad de dormitorios
    if (!CantidadDormitorios) {
      errores.cantidadDormitorios = "La cantidad de dormitorios es obligatoria";
    } else if (isNaN(CantidadDormitorios)) {
      errores.cantidadDormitorios =
        "La cantidad de dormitorios debe ser un número válido";
    } else if (![2, 3].includes(Number(CantidadDormitorios))) {
      errores.cantidadDormitorios =
        "La cantidad de dormitorios debe ser 2 o 3";
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleChangeNroVivienda = (e) => {
    setNroVivienda(e.target.value);
  };

  const handleChangeCantidadDormitorios = (e) => {
    setCantidadDormitorios(e.target.value);
  };

  const validarCupos = async () => {
    const ViviendaResponse = await getAllViviendas(cooperativa.idCooperativa);
    if (ViviendaResponse.length >= cooperativa.cuposLibre) {
      setIsOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setMostrarModal(true);
  };

  const handleConfirmacion = async (e) => {
    e.preventDefault();
    setMostrarModal(false);
    if (!validarFormulario()) return;
    if (!isOpen) {
      alert("No quedan cupos libres en la cooperativa");
      return;
    }
    const data = {
      nroVivienda: NroVivienda,
      cantidadDormitorios: CantidadDormitorios,
    };
    await postVivienda(data, cooperativa.idCooperativa);
    setIdentificadorComponente(1);
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
