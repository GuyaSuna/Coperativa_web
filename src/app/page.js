"use client";
import './globals.css';
import React, { useState } from "react";
import {loginAdministrador, loginUsuario} from "./Api/api.js"
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [Nombre, setAdminNombre] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitAdministrador = async (e) => {
    e.preventDefault();
    const data = await loginAdministrador(Nombre, password);
    console.log(data)
    if (data == null) {
      alert("No se ha podido inicia sesion");
    } else {
      console.log("apa si");
      router.push("./AdministradorHome");
    }
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    const data = await loginUsuario(Nombre, password);
    console.log(data)
    if (data == null) {
      alert("No se ha podido inicia sesion");
    } else {
      router.push("./UsuarioHome");
    }
  };

  //checkbox

  const handleAdminNombreChange = (e) => {
    setAdminNombre(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form>
        <label>
          Usuario:
          <input
            type="text"
            value={Nombre}
            onChange={handleAdminNombreChange}
            id="Nombre"
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
            required
          />
        </label>
        <button type="submit" onClick={handleSubmitAdministrador} className="buttonLogin">
          Iniciar Sesión Administrador
        </button>
        <button type="submit" onClick={handleSubmitUsuario} className="buttonLogin">
          Iniciar Sesión Usuario
        </button>
      </form>
    </div>
  );
};

export default Home;
