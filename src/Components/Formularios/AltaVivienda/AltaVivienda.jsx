"use client";

import { useState } from "react";
import "./livingPlaceStyle.css";
import { useRouter } from "next/navigation";
import { postVivienda } from "../../../Api/api.js";

const AltaVivienda = () => {
  const router = useRouter();

  const [NroVivienda, setNroVivienda] = useState();
  const [CantidadDormitorios, setCantidadDormitorios] = useState();

  const handleChangeCantidadDormitorios = (e) => {
    setCantidadDormitorios(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeNroVivienda = (e) => {
    setNroVivienda(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nroVivienda: NroVivienda,
      cantidadDormitorios: CantidadDormitorios,
    };
    console.log(data);

    const response = await postVivienda(data);

    console.log(response);
  };

  return (
    <div className="general-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Número de vivienda:
          <input
            type="text"
            name="houseNumber"
            value={NroVivienda}
            onChange={handleChangeNroVivienda}
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Cantidad de Dormitorios:
          <input
            type="text"
            name="numberOfBedrooms"
            value={CantidadDormitorios}
            onChange={handleChangeCantidadDormitorios}
            className="input"
          />
        </label>
        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AltaVivienda;
