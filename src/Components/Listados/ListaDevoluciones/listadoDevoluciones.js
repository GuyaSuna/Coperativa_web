"use client";
import React, { useState, useEffect, useContext } from "react";
import { getAlldevoluciones } from "@/Api/api";
import { MiembroContext } from "@/Provider/provider.js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import VerDevoluciones from "@/Components/VerDetalles/VerDevoluciones/verDevoluciones";

const ListadoDevoluciones = () => {
  const { cooperativa } = useContext(MiembroContext);
  const [devoluciones, setDevoluciones] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [buscadorFiltrado, setBuscadorFiltrado] = useState(devoluciones);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devolucionSeleccionada, setDevolucionSeleccionada] = useState(null);

  useEffect(() => {
    fetchAllDevoluciones();
  }, []);

  const fetchAllDevoluciones = async () => {
    try {
      const response = await getAlldevoluciones(cooperativa.idCooperativa);
      console.log(response);
      setDevoluciones(response);
    } catch (error) {
      console.error("Error al obtener las devoluciones:", error);
    }
  };

  useEffect(() => {
    if (buscador === "") {
      setBuscadorFiltrado(devoluciones);
    } else {
      const filtrado = devoluciones.filter((devolucion) =>
        devolucion.socio.nombreSocio
          .toLowerCase()
          .includes(buscador.toLowerCase())
      );
      setBuscadorFiltrado(filtrado);
    }
  }, [devoluciones, buscador]);

  const handleChangeBuscador = (event) => {
    setBuscador(event.target.value);
  };

  const handleAgregarDevolucion = () => {
    // Lógica para agregar devolución
  };

  const handleEliminar = (idDevolucion) => {
    // Lógica para eliminar devolución
  };

  const handleModificar = (idDevolucion) => {
    // Lógica para modificar devolución
  };

  const handleVerDetalles = (devolucion) => {
    setDevolucionSeleccionada(devolucion);
    setIsModalOpen(true);
  };

  return (
    <div className="sm:p-7 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            value={buscador}
            onChange={handleChangeBuscador}
            placeholder="Buscar por nombre de socio"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={handleAgregarDevolucion}
            type="button"
            className="flex items-center justify-center text-white bg-blue-600 hover:bg-gray-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            AGREGAR DEVOLUCIÓN
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-screen">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-gray-700 border-b">
            <tr>
              <th className="px-4 py-3">Fecha Inicio</th>
              <th className="px-4 py-3">Total Devolución</th>
               <th className="px-4 py-3">Pago Devolución</th>
              <th className="px-4 py-3">Nombre Socio</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {buscadorFiltrado.map((devolucion) => (
              <tr className="border-b dark:border-gray-700 sm:table-row" key={devolucion.idDevolucion}>
  <td className="block sm:table-cell px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    <span className="sm:hidden font-semibold">Nro Devolución:</span>
    {devolucion.fechaInicio}
  </td>
  <td className="block sm:table-cell px-4 py-3">
    <span className="sm:hidden font-semibold">Cantidad Total:</span>
    {devolucion.totalDevolucionUr}
  </td>
  <td className="block sm:table-cell px-4 py-3">
    <span className="sm:hidden font-semibold">Cantidad/Recibo:</span>
    {devolucion.pagoDevolucion}
  </td>
  <td className="block sm:table-cell px-4 py-3">
    <span className="sm:hidden font-semibold">Nombre socio:</span>
    {devolucion.socio.nombreSocio} {devolucion.socio.apellidoSocio}
  </td>
  <td className="block sm:table-cell px-4 py-3">
    <button
      type="button"
      onClick={() => handleVerDetalles(devolucion)}
      className="text-white bg-gradient-to-br from-slate-400 to-slate-600 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
    >
      Ver
    </button>
  </td>
  <td className="px-4 py-3 flex items-center justify-end md:table-cell">
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center hidden md:inline-flex">
          <svg
            viewBox="0 0 24 24"
            className="w-5"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={1} />
            <circle cx={19} cy={12} r={1} />
            <circle cx={5} cy={12} r={1} />
          </svg>
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
        >
          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => handleEliminar(devolucion.nroDevolucion)}
                className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
              >
                Eliminar
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => handleModificar(devolucion.nroDevolucion)}
                className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900"
              >
                Modificar
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  </td>
  <td className="px-4 py-3 flex justify-end gap-2 md:hidden">
    <button
      onClick={() => handleEliminar(devolucion.nroDevolucion)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
    >
      Eliminar
    </button>
    <button
      onClick={() => handleModificar(devolucion.nroDevolucion)}
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
    >
      Modificar
    </button>
  </td>
</tr>

            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerDevoluciones
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          devolucion={devolucionSeleccionada}
        />
      )}
    </div>
  );
};

export default ListadoDevoluciones;
