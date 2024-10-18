"use client";

import {
  getSubsidioVigenteSocio,
  getRecibosImpagosSocio,
  getConveniosVigenteSocio,
} from "../../../Api/api";
import React, { useState, useEffect, useContext } from "react";
import { MiembroContext } from "@/Provider/provider";

const VerSocio = ({ isOpen, onClose, socio }) => {
  const [ultimoSubsidio, setUltimoSubsidio] = useState(null);
  const [conveniosPorSocio, setConveniosPorSocio] = useState(null);
  const [recibosImpagos, setRecibosImpagos] = useState([]);
  const [totalImpagos, setTotalImpagos] = useState(0); // Nuevo estado para total
  const [isSuplenteExpanded, setIsSuplenteExpanded] = useState(false);
  const [isSubsidioExpanded, setIsSubsidioExpanded] = useState(false);
  const [isConvenioExpanded, setIsConvenioExpanded] = useState(false);
  const [isRecibosImpagosExpanded, setIsRecibosImpagosExpanded] =
    useState(false);

  const [expandedConvenioId, setExpandedConvenioId] = useState(null);

  const toggleConvenio = (id) => {
    setExpandedConvenioId(expandedConvenioId === id ? null : id);
  };

  const { cooperativa } = useContext(MiembroContext);

  useEffect(() => {
    if (socio && socio.cedulaSocio) {
      const fetchUltimoSubsidio = async () => {
        try {
          const subsidio = await getSubsidioVigenteSocio(socio.cedulaSocio);
          setUltimoSubsidio(subsidio);
        } catch (error) {
          console.error("Error al obtener el último subsidio:", error);
          setUltimoSubsidio(null);
        }
      };

      const fetchConvenios = async () => {
        try {
          const convenios = await getConveniosVigenteSocio(socio.cedulaSocio);
          console.log("Convenios ver del socio", convenios);
          setConveniosPorSocio(convenios);
        } catch (error) {
          console.error(
            "Error al obtener los Convenios vigentes del Socio",
            error
          );
          setConveniosPorSocio(null);
        }
      };

      const fetchRecibosImpagos = async () => {
        try {
          const recibos = await getRecibosImpagosSocio(
            socio.cedulaSocio,
            cooperativa.idCooperativa
          );
          setRecibosImpagos(recibos);

          // Calcular el total de recibos impagos
          const total = recibos.reduce(
            (acc, recibo) => acc + Number(recibo.cuotaMensual),
            0
          );
          setTotalImpagos(total); // Establecer el total en el estado
        } catch (error) {
          console.error("Error al obtener los recibos impagos:", error);
          setRecibosImpagos([]);
          setTotalImpagos(0); // Reiniciar el total en caso de error
        }
      };
      fetchConvenios();
      fetchRecibosImpagos();
      fetchUltimoSubsidio();
    }
  }, [socio?.cedulaSocio]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-black-900 mb-4">
              Detalles del Socio
            </h3>
            <table className="w-full text-left">
              <tbody className="text-gray-600 dark:text-gray-100">
                {/* Información del Socio */}
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Nombre:
                  </td>
                  <td className="py-1 px-3">
                    {socio.nombreSocio} {socio.apellidoSocio}
                  </td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Cédula:
                  </td>
                  <td className="py-1 px-3">{socio.cedulaSocio}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Número de Socio:
                  </td>
                  <td className="py-1 px-3">{socio.nroSocio}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Capital Total:
                  </td>
                  <td className="py-1 px-3">UR {socio.capitalSocio}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Fecha de Ingreso:
                  </td>
                  <td className="py-1 px-3">{socio.fechaIngreso}</td>
                </tr>
                <tr>
                  <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                    Teléfono:
                  </td>
                  <td className="py-1 px-3">{socio.telefono}</td>
                </tr>

                {/* Sección del Suplente */}
                <tr>
                  <td
                    colSpan="2"
                    className="font-semibold text-black-900 py-4 cursor-pointer"
                    onClick={() => setIsSuplenteExpanded(!isSuplenteExpanded)}
                  >
                    {isSuplenteExpanded
                      ? "▼ Datos del Suplente"
                      : "► Datos del Suplente"}
                  </td>
                </tr>
                {isSuplenteExpanded && (
                  <>
                    {socio.suplenteEntity ? (
                      <>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Nombre:
                          </td>
                          <td className="py-1 px-3">
                            {socio.suplenteEntity.nombreSuplente}{" "}
                            {socio.suplenteEntity.apellidoSuplente}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Número de Cédula:
                          </td>
                          <td className="py-1 px-3">
                            {socio.suplenteEntity.cedulaSuplente}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Teléfono:
                          </td>
                          <td className="py-1 px-3">
                            {socio.suplenteEntity.telefonoSuplente}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-1 px-3 text-center">
                          No tiene suplente.
                        </td>
                      </tr>
                    )}
                  </>
                )}

                {/* Sección del Subsidio */}
                <tr>
                  <td
                    colSpan="2"
                    className="font-semibold text-black-900 py-4 cursor-pointer"
                    onClick={() => setIsSubsidioExpanded(!isSubsidioExpanded)}
                  >
                    {isSubsidioExpanded
                      ? "▼ Último Subsidio"
                      : "► Último Subsidio"}
                  </td>
                </tr>
                {isSubsidioExpanded && (
                  <>
                    {ultimoSubsidio ? (
                      <>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Fecha de Otorgado:
                          </td>
                          <td className="py-1 px-3">
                            {ultimoSubsidio.fechaOtorgado}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Monto de Subsidio:
                          </td>
                          <td className="py-1 px-3">
                            {ultimoSubsidio.subsidioUr}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                            Vigencia en Meses:
                          </td>
                          <td className="py-1 px-3">
                            {ultimoSubsidio.vigenciaEnMeses}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-1 px-3 text-center">
                          No tiene subsidio.
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {/* Sección Convenio */}
                <tr>
                  <td
                    colSpan="2"
                    className="font-semibold text-black-900 py-4 cursor-pointer"
                    onClick={() => setIsConvenioExpanded(!isConvenioExpanded)}
                  >
                    {isConvenioExpanded ? "▼ Convenios" : "► Convenios"}
                  </td>
                </tr>
                {isConvenioExpanded && (
                  <>
                    {conveniosPorSocio && conveniosPorSocio.length > 0 ? (
                      conveniosPorSocio.map((convenio) => (
                        <React.Fragment key={convenio.idConvenio}>
                          <tr
                            onClick={() => toggleConvenio(convenio.idConvenio)}
                          >
                            <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800 cursor-pointer">
                              {expandedConvenioId === convenio.idConvenio
                                ? "▼"
                                : "►"}{" "}
                              Nro. Convenio: {convenio.idConvenio}
                            </td>
                          </tr>
                          {expandedConvenioId === convenio.idConvenio && (
                            <>
                              <tr>
                                <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                                  Deuda en UR:
                                </td>
                                <td className="py-1 px-3">
                                  {convenio.deudaEnUrOriginal}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-normal px-3 pt-0 pb-1 border-b border-gray-200 dark:border-gray-800">
                                  Fecha Inicio:
                                </td>
                                <td className="py-1 px-3">
                                  {convenio.fechaInicioConvenio}
                                </td>
                              </tr>
                            </>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="py-1 px-3 text-center">
                          No tiene Convenios.
                        </td>
                      </tr>
                    )}
                  </>
                )}

                {/* Sección de Recibos Impagos */}
                <tr>
                  <td
                    colSpan="2"
                    className="font-semibold text-black-900 py-4 cursor-pointer"
                    onClick={() =>
                      setIsRecibosImpagosExpanded(!isRecibosImpagosExpanded)
                    }
                  >
                    {isRecibosImpagosExpanded
                      ? "▼ Recibos Impagos"
                      : "► Recibos Impagos"}
                  </td>
                </tr>
                {isRecibosImpagosExpanded && (
                  <tr>
                    <td colSpan="2" className="py-1 px-3">
                      <div className="max-h-60 overflow-y-auto">
                        {recibosImpagos.length > 0 ? (
                          <>
                            {recibosImpagos.map((recibo) => (
                              <div
                                key={recibo?.fecha}
                                className="border-b border-gray-200 dark:border-gray-800 py-2"
                              >
                                <div className="font-normal px-3">
                                  Falta recibo en fecha: {recibo?.fechaRecibo}{" "}
                                  el monto de: {recibo?.cuotaMensual}
                                </div>
                              </div>
                            ))}
                            <div className="font-bold px-3 pt-2">
                              Total Recibos Impagos: ${totalImpagos}{" "}
                              {/* Mostrar el total */}
                            </div>
                          </>
                        ) : (
                          <div className="py-1 px-3 text-center">
                            No tiene recibos impagos.
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerSocio;
