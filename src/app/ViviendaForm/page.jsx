"use client";

import { useState } from "react";
import "./livingPlaceStyle.css";
import { useRouter } from "next/navigation";
import { postVivienda } from "../../Api/api.js";

const ViviendaForm = () => {
  const router = useRouter();

  const [HouseNumber, setHouseNumber] = useState();
  const [NumberOfBedrooms, setNumbersOfBedrooms] = useState();

  const handleChangeNumberBedrooms = (e) => {
    setNumbersOfBedrooms(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeHouseNumber = (e) => {
    setHouseNumber(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nroVivienda: HouseNumber,
      cantDormitorios: NumberOfBedrooms,
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
            value={HouseNumber}
            onChange={handleChangeHouseNumber}
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Cantidad de Dormitorios:
          <input
            type="text"
            name="numberOfBedrooms"
            value={NumberOfBedrooms}
            onChange={handleChangeNumberBedrooms}
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

export default ViviendaForm;
