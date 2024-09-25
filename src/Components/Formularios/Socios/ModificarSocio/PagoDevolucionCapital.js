"use client";

import React, { useState, useEffect } from "react";
import { postPagoDevolucionCapital } from "@/Api/api";

const PagoDevolucionCapitalForm = ({ socio }) => {
  const [montoPago, setMontoPago] = useState("");
  const [tipoMoneda, setTipoMoneda] = useState("UR");
  const [fechaPago, setFechaPago] = useState("");
  const [errores, setErrores] = useState({});



  // Validación del formulario
  const validarFormulario = () => {
    const newErrores = {};

    if (!montoPago) newErrores.montoPago = "El monto del pago es obligatorio";
    if (!tipoMoneda) newErrores.tipoMoneda = "El tipo de moneda es obligatorio";
    if (!fechaPago) newErrores.fechaPago = "La fecha de pago es obligatoria";

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const pagoDevolucionData = {
      montoPago,
      tipoMoneda,
      fechaPago,
      socio,
    };

    try {
      const result = await postPagoDevolucionCapital(pagoDevolucionData);
      console.log("Pago de devolución creado:", result);
    } catch (error) {
      console.error("Error al crear pago de devolución:", error);
    }
  };

  return (
    <div className="general-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Monto de Pago:
          <input
            type="number"
            name="montoPago"
            value={montoPago}
            onChange={(e) => setMontoPago(e.target.value)}
            className="input"
          />
          {errores.montoPago && <span className="error">{errores.montoPago}</span>}
        </label>
        <br />

        <label className="label">
          Moneda de devolucion:
          <input
            type="text"
            name="tipoMoneda"
            value={tipoMoneda}
            onChange={(e) => setFechaPago(e.target.value)}
            className="input"
            readOnly
          />
          {errores.tipoMoneda && <span className="error">{errores.tipoMoneda}</span>}
        </label>
        <br />

        <label className="label">
          Fecha de Pago:
          <input
            type="date"
            name="fechaPago"
            value={fechaPago}
            onChange={(e) => setFechaPago(e.target.value)}
            className="input"
          />
          {errores.fechaPago && <span className="error">{errores.fechaPago}</span>}
        </label>
        <br />

        <label className="label">
          Socio:
          <input
            type="text"
            name="socio"
            value={socio.nombreSocio + " "+ socio.apellidoSocio}
            onChange={(e) => setSocio(e.target.value)}
            className="input"
            readOnly 
          />
          {errores.socio && <span className="error">{errores.socio}</span>}
        </label>
        <br />

        <br />

        <button type="submit" className="button">
          Crear Pago de Devolución
        </button>
      </form>
    </div>
  );
};

export default PagoDevolucionCapitalForm;
