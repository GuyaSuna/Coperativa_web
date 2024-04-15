"use client";

import React from "react";
import { useState } from "react";
import "../../../public/Styles.css";

const Form = () => {
  const [userData, setUserData] = useState({
    userNumber: "",
    userName: "",
    userLastName: "",
    hasSpouse: false,
    numberOfFamilyMembers: 0,
    familyMembers: [],
    entryDate: "",
    ciNumber: "",
    houseNumber: "",
    numberOfBedrooms: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si es un checkbox, maneja la selección exclusiva
    if (type === "checkbox") {
      if (name === "hasSpouse" && checked) {
        // Si se selecciona el checkbox "Cónyuge", deselecciona "Concubino"
        setUserData((prevData) => ({
          ...prevData,
          hasSpouse: true,
          hasConcubine: false,
        }));
      } else if (name === "hasConcubine" && checked) {
        // Si se selecciona el checkbox "Concubino", deselecciona "Cónyuge"
        setUserData((prevData) => ({
          ...prevData,
          hasSpouse: false,
          hasConcubine: true,
        }));
      } else {
        // Si se deselecciona un checkbox, actualiza su valor directamente
        setUserData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
    } else {
      // Si no es un checkbox, actualiza el estado normalmente
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFamilyMemberChange = (e, index) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      const familyMembers = [...prevData.familyMembers];
      familyMembers[index][name] = value;
      return { ...prevData, familyMembers };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
  };
  const {
    userNumber,
    userName,
    userLastName,
    hasSpouse,
    numberOfFamilyMembers,
    familyMembers,
    entryDate,
    ciNumber,
    houseNumber,
    numberOfBedrooms,
  } = userData;
  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label">
        Nro. Usuario:
        <input
          type="text"
          name="userNumber"
          value={userNumber}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Nombres:
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Apellidos:
        <input
          type="text"
          name="userLastName"
          value={userLastName}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Cónyuge:
        <input
          type="checkbox"
          name="hasSpouse"
          checked={hasSpouse}
          onChange={handleChange}
          className="checkbox"
        />
      </label>
      <label className="label">
        Concubino:
        <input
          type="checkbox"
          name="hasSpouse"
          checked={hasSpouse}
          onChange={handleChange}
          className="checkbox"
        />
      </label>
      <br />
      {hasSpouse && (
        <label className="label">
          Cantidad de Integrantes:
          <input
            type="number"
            name="numberOfFamilyMembers"
            value={numberOfFamilyMembers}
            onChange={handleChange}
            className="input"
          />
        </label>
      )}
      <br />
      {[...Array(numberOfFamilyMembers)].map((_, index) => (
        <div key={index}>
          <label className="label">
            Nombre y Apellidos de los Integrantes {index + 1}:
            <input
              type="text"
              name="name"
              value={familyMembers[index]?.name || ""}
              onChange={(e) => handleFamilyMemberChange(e, index)}
              className="input"
            />
          </label>
          <br />
        </div>
      ))}
      <label className="label">
        Fecha de Ingreso:
        <input
          type="date"
          name="entryDate"
          value={entryDate}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Numero de CI.:
        <input
          type="text"
          name="ciNumber"
          value={ciNumber}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Número de vivienda:
        <input
          type="text"
          name="houseNumber"
          value={houseNumber}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Cantidad de dormitorios:
        <input
          type="number"
          name="numberOfBedrooms"
          value={numberOfBedrooms}
          onChange={handleChange}
          className="input"
        />
      </label>
      <br />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default Form;
