"use client";
import React from "react";
import { useState } from "react";
import "./LoginStyle.css";
import { login } from "../Api/api";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Usuario", adminName);
    console.log("Contraseña", password);

    const data = await login(adminName , password)

    if(data == null){
      console.log("Nope")
    }else{
      console.log("apa si")
      router.push("/");
    }


  };

  return (
    <div>
      <h2> Iniciar Sesión </h2>
      <form >
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

        <button  className="buttonLogin" onClick={handleSubmit}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
