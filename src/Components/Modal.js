import React from "react";

const ModalDetail = ({ isOpen, onClose, socio }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl transform transition-all w-4/5 h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Detalles del Socio
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
          <p className="text-sm text-gray-500">Nombre: {socio.nombreSocio}</p>
          <p className="text-sm text-gray-500">Apellido: {socio.apellidoSocio}</p>
          <p className="text-sm text-gray-500">Capital: ${socio.capitalSocio}</p>
          <p className="text-sm text-gray-500">Fecha de Ingreso: {socio.fechaIngreso}</p>
          {/* Agrega más campos según sea necesario */}
        </div>
        <div className="p-4 border-t">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
