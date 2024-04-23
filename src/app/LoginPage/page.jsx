"use client";
import React from "react";
import { useState } from "react";
import "./LoginStyle.css";
import Link from "next/link";

const LoginPage = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Usuario", adminName);
    console.log("Contraseña", password);
  };

  return (
    <div>
      <h2> Iniciar Sesión </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <Link href="/" className="buttonLogin">
          Iniciar Sesión
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
