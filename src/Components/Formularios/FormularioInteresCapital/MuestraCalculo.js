"use-client";
// pages/index.js
import React from "react";
import FormularioInteresCapital from "./FormularioInteresCapital";

const MuestraCalculos = ({ setInteres, setCapital, cooperativa }) => {
  return (
    <div>
      <h1>Leer archivo Excel en Next.js</h1>
      <FormularioInteresCapital
        setInteresParm={setInteres}
        setCapitalParm={setCapital}
        cooperativa={cooperativa}
      />
    </div>
  );
};

export default MuestraCalculos;
