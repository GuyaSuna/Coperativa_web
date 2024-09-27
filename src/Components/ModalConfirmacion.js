import React from "react";

export const ModalConfirmacion = ({ mensaje, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-black">{mensaje}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
