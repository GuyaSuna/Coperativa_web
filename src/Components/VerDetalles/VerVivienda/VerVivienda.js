"use client";

import React, { useEffect, useContext } from "react";
import { MiembroContext } from "@/Provider/provider.js";

const VerVivienda = ({ vivienda }) => {
  const { cooperativa } = useContext(MiembroContext);

  return (
    <div className="sm:p-7 p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Nro. de Vivienda
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Dormitorios
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
              Socio Titular
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          <tr>
            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center ml-4">
                {vivienda.nroVivienda}
              </div>
            </td>
            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
              {vivienda.cantidadDormitorios}
            </td>
            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                {vivienda?.socioTitular?.nombreSocio &&
                vivienda?.socioTitular?.apellidoSocio
                  ? `${vivienda.socioTitular.nombreSocio} ${vivienda.socioTitular.apellidoSocio}`
                  : "Sin socio"}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerVivienda;
