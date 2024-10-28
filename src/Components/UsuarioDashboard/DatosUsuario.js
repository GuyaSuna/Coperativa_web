import React, { useContext, useState, useEffect } from "react";
import { MiembroContext } from "@/Provider/provider";
import { getSocio } from "@/Api/api";

const DatosUsuario = () => {
  const { miembro } = useContext(MiembroContext);
  const [datosUsuario, setDatosUsuario] = useState({});
  const [cedulaSocio, setCedulaSocio] = useState("");

  useEffect(() => {
    setCedulaSocio(miembro.responseBody.socio.cedulaSocio);
  }, [miembro]);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const data = await getSocio(cedulaSocio);
        setDatosUsuario(data);
      } catch (error) {
        console.error(`An error has occurred in fetchSocio: ${error.message}`);
      }
    };

    if (cedulaSocio) {
      fetchSocio();
    }
  }, [cedulaSocio]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Datos de {datosUsuario.nombreSocio}{" "}{datosUsuario.apellidoSocio} </h2>
      {datosUsuario && (
        <div className="space-y-4">
          <p>
            <strong>NroSocio:</strong> {datosUsuario.nroSocio}
          </p>
          <hr className="border-gray-300 dark:border-gray-600" />
          <p>
            <strong>C.I:</strong> {datosUsuario.cedulaSocio}
          </p>
          <hr className="border-gray-300 dark:border-gray-600" />
          <p>
            <strong>Fecha Ingreso:</strong> {datosUsuario.fechaIngreso}
          </p>
          <hr className="border-gray-300 dark:border-gray-600" />
          <p>
            <strong>Teléfono:</strong> {datosUsuario.telefono}
          </p>
          <hr className="border-gray-300 dark:border-gray-600" />
          {datosUsuario.suplenteEntity && (
            <>
              <h3 className="text-xl font-semibold mt-4">
                Datos del Suplente:
              </h3>
              <p>
                <strong>Nombre Suplente:</strong>{" "}
                {datosUsuario.suplenteEntity.nombreSuplente}{" "}
                {datosUsuario.suplenteEntity.apellidoSuplente}
              </p>
              <p>
                <strong>C.I:</strong>{" "}
                {datosUsuario.suplenteEntity.cedulaSuplente}
              </p>
              <p>
                <strong>Teléfono:</strong>{" "}
                {datosUsuario.suplenteEntity.telefonoSuplente}
              </p>
            </>
          )}
         
        </div>
      )}
    </div>
  );
};

export default DatosUsuario;
