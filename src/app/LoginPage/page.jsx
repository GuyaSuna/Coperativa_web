"use client";

import React, { useState } from "react";
import "./LoginStyle.css";
import { login } from "../Api/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Usuario", adminName);
    console.log("Contraseña", password);
    const data = await login(adminName, password);
    console.log(data)
    if (data == null) {
      console.log("Nope");
    } else {
      console.log("apa si");
      router.push("/");
    }
  };

  //checkbox

  const handleAdminNameChange = (e) => {
    setAdminName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={adminName}
            onChange={handleAdminNameChange}
            id="adminName"
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
        <button type="submit" className="buttonLogin">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
