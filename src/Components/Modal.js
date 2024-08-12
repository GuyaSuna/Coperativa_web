import React from "react";

const ModalDetail = ({ isOpen, onClose, socio }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 overflow-y-auto z-50">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
            style={{ width: "80%", height: "80%" }}
          >
            <div className="absolute top-0 right-0 p-4">
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
            <div className="bg-white p-6 h-full flex">
              {/* Datos del Socio */}
              <div className="flex-1 pr-6 border-r border-gray-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Detalles del Socio
                </h3>
                <div className="mb-4">
                  <p className="text-lg text-gray-800 font-medium">Nombre:</p>
                  <p className="text-lg text-gray-600">{socio.nombreSocio} {socio.apellidoSocio}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-gray-800 font-medium">Número de Socio:</p>
                  <p className="text-lg text-gray-600">{socio.nroSocio}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-gray-800 font-medium">Capital:</p>
                  <p className="text-lg text-gray-600">${socio.capitalSocio}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-gray-800 font-medium">Fecha de Ingreso:</p>
                  <p className="text-lg text-gray-600">{socio.fechaIngreso}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg text-gray-800 font-medium">Teléfono:</p>
                  <p className="text-lg text-gray-600">{socio.telefono}</p>
                </div>
              </div>

              {/* Datos del Suplente */}
              <div className="flex-1 pl-6">
                {socio.suplenteEntity ? (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Datos del Suplente
                    </h3>
                    <div className="mb-4">
                      <p className="text-lg text-gray-800 font-medium">Nombre:</p>
                      <p className="text-lg text-gray-600">{socio.suplenteEntity.nombreSuplente} {socio.suplenteEntity.apellidoSuplente}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg text-gray-800 font-medium">Número de Cédula:</p>
                      <p className="text-lg text-gray-600">{socio.suplenteEntity.cedulaSuplente}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg text-gray-800 font-medium">Teléfono:</p>
                      <p className="text-lg text-gray-600">{socio.suplenteEntity.telefonoSuplente}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-lg text-gray-600 font-medium">No hay suplentes</p>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;


