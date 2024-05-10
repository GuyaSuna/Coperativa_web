"use client";

import React, { useState } from "react";
import "./LoginStyle.css";
import { useRouter } from "next/navigation";
import { signInUser } from "../api/api";

const LoginPage = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("adminName", adminName);
    console.log("password", password);

    const response = await signInUser(adminName, password);

    console.log("response from service", response);
    if (response && response.status === 200) {
      router.push("../home");
    } else {
      window.confirm("No puedes loguearte, intenta nuevamente");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const element = e.target.id;

    if (element === "adminName") {
      setAdminName(value);
    } else if (element === "password") {
      setPassword(value);
    }
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
            onChange={handleChange}
            id="adminName"
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={handleChange}
            id="password"
          />
        </label>
        <br />

        <button type="submit" className="buttonLogin">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
