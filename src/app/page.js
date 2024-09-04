"use client";
import "./globals.css";
import React, { useState, useContext } from "react";
import {
  Login,
  getCooperativaPorAdmin,
  getCooperativaPorSocio,
  getUser,
} from "../Api/api.js";
import { useRouter } from "next/navigation";
import { MiembroContext } from "@/Provider/provider";
import Image from "next/image";

const Home = () => {
  const router = useRouter();
  const { loginMiembro } = useContext(MiembroContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  const handleSubmitAdministrador = async (e) => {
    e.preventDefault();
    try {
      const RequestLogin = await Login(username, password);
      if (typeof RequestLogin === "string") {
        alert(
          "No se ha podido iniciar sesión: Usuario o contraseña incorrectos."
        );
        return;
      }
      if (!RequestLogin) {
        alert(
          "No se ha podido iniciar sesión: Usuario o contraseña incorrectos."
        );
        return;
      }
      console.log("Respuesta", RequestLogin.responseBody);
      const cooperativaLoginRequest = await getCooperativaPorAdmin(
        RequestLogin.responseBody.id
      );
      console.log(`Cooperativa admin: ${cooperativaLoginRequest}`);
      ProviderLoginRequest(RequestLogin, cooperativaLoginRequest);
      router.push("./AdministradorHome");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    const loginRequest = await Login(username, password);
    console.log("Abr", loginRequest);
    const cooperativaMiembro = await getCooperativaPorSocio(
      loginRequest.responseBody.socio.cedulaSocio
    );
    if (loginRequest == null) {
      alert("No se ha podido inicia sesion");
    } else {
      ProviderLoginRequest(loginRequest, cooperativaMiembro);
      router.push("./UsuarioHome");
    }
  };

  const ProviderLoginRequest = (RequestLogin, cooperativaLoginRequest) => {
    loginMiembro(RequestLogin, cooperativaLoginRequest);
  };
  //checkbox

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
            <div className="cursor-pointer flex items-center">
              <div>
                <img className="h-16 w-16" src="./techito.png" />
              </div>
              <div className="text-4xl text-[#71675D] tracking-wide ml-2 font-semibold">
                visoft
              </div>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-[#71675D] font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
            >
              Iniciar Sesion
            </h2>
            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Nombre de usuario
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                    id="text"
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Contraseña
                    </div>
                    <div>
                      <a
                        className="text-xs font-display font-semibold text-[#71675D] hover:text-black
                                  cursor-pointer"
                      >
                        Olvidaste la contraseña?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Ingresar contraseña"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    id="password"
                    required
                  />
                </div>
                <div className="grid gap-3 mt-10">
                  <button
                    className="bg-[#71675D] text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-400
                          shadow-lg"
                    type="submit"
                    onClick={handleSubmitAdministrador}
                  >
                    Inicias sesion como Administrador
                  </button>
                  <button
                    className="bg-[#71675D] text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-400
                          shadow-lg"
                    type="submit"
                    onClick={handleSubmitUsuario}
                  >
                    Inicias sesion como Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img
            src="./visoft.png"
            className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen hover:scale-90 transform duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
