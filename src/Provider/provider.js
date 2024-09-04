"use client";
import React, { createContext, useState } from "react";
const MiembroContext = createContext();

const MiembroProvider = ({ children }) => {
  const [miembro, setMiembro] = useState(null);
  const [cooperativa, setCooperativa] = useState(null);

  const loginMiembro = (DatosMiembro, DatosCooperativa, token) => {
    console.log("Datos administrador", DatosMiembro);
    setMiembro(DatosMiembro);
    setCooperativa(DatosCooperativa);
  };

  const logoutMiembro = () => {
    setMiembro(null);
    setCooperativa(null);
  };

  return (
    <MiembroContext.Provider
      value={{ miembro, cooperativa, loginMiembro, logoutMiembro }}
    >
      {children}
    </MiembroContext.Provider>
  );
};

export { MiembroContext, MiembroProvider };
