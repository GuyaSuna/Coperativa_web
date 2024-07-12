"use client";

import React, { useState } from "react";
import "./LoginStyle.css";
import { login } from "../Api/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [nombreMiembro, setNombreMiembro] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Usuario", nombreMiembro);
    console.log("Contraseña", contraseña);
    const data = await login(nombreMiembro, contraseña);

    if (data == null) {
      console.log("Nope");
    } else {
      console.log("apa si");
      router.push("/");
    }
  };

  const handleChange = () => {
    console.log("Anda");
  };

  return (
    <div className="container">
      <h2> Iniciar Sesión </h2>
      <form>
        <label>
          Usuario:
          <input
            type="text"
            value={nombreMiembro}
            onChange={handleChange}
            id="nombreMiembro"
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={contraseña}
            onChange={handleChange}
            id="contraseña"
          />
        </label>
        <br />

        <button className="buttonLogin" onClick={handleSubmit}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
