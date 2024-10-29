"use client";
import "./globals.css";
import React, { useState, useEffect, useContext } from "react";
import {
  Login,
  getCooperativaPorAdmin,
  getCooperativaPorSocio,
  registerMaster,
} from "../Api/api.js";
import { useRouter } from "next/navigation";
import { MiembroContext } from "@/Provider/provider";
import { useSession } from "./../Provider/loginProvider";

const Home = () => {
  const router = useRouter();
  const { loginMiembro } = useContext(MiembroContext);
  const { login } = useSession();

  useEffect(() => {
    const bodyMaster = {
      username: "Admin",
      lastname: "Pages",
      firstname: "Admin",
      password: 1234,
      role: "MASTER",
    };

    const responseMaster = registerMaster(bodyMaster);
  }, []);

  if (!login) {
    console.error("El contexto de sesión no está disponible.");
    return null;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitAdministrador = async (e) => {
    e.preventDefault();
    try {
      const RequestLogin = await Login(username, password);

      if (typeof RequestLogin === "string" || !RequestLogin) {
        setErrorMessage("Usuario o contraseña incorrectos.");
        return;
      }

      if (RequestLogin.responseBody.role !== "ADMIN") {
        setErrorMessage("Las credenciales no corresponden a un administrador.");
        return;
      }

      const cooperativaLoginRequest = await getCooperativaPorAdmin(
        RequestLogin.responseBody.id
      );

      if (!cooperativaLoginRequest) {
        setErrorMessage(
          "No se ha encontrado la cooperativa para este administrador."
        );
        return;
      }

      ProviderLoginRequest(
        RequestLogin,
        cooperativaLoginRequest,
        RequestLogin.token
      );
      router.push("./AdministradorHome");
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    try {
      const loginRequest = await Login(username, password);

      if (!loginRequest) {
        setErrorMessage("Usuario o contraseña incorrectos.");
        return;
      }

      // Verifica si el rol es de usuario
      if (loginRequest.responseBody.role !== "USER") {
        setErrorMessage("Las credenciales no corresponden a un usuario.");
        return;
      }

      const cooperativaMiembro = await getCooperativaPorSocio(
        loginRequest.responseBody.socio.cedulaSocio
      );

      if (!cooperativaMiembro) {
        setErrorMessage(
          "No se ha encontrado la cooperativa para este usuario."
        );
        return;
      }

      ProviderLoginRequest(
        loginRequest,
        cooperativaMiembro,
        loginRequest.token
      );
      router.push("./UsuarioHome");
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  const ProviderLoginRequest = (
    RequestLogin,
    cooperativaLoginRequest,
    token
  ) => {
    loginMiembro(RequestLogin, cooperativaLoginRequest);
    login(token);
  };

  // Funciones de manejo de entrada
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
                <img className="h-16 w-16 " src="./techito.png" alt="logo" />
              </div>
              <div className="text-4xl text-[#71675D] tracking-wide ml-2 font-semibold">
                visoft
              </div>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-[#71675D] font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
              Iniciar Sesión
            </h2>
            <div className="mt-12">
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span>{errorMessage}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setErrorMessage("")}
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 101.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
                    </svg>
                  </button>
                </div>
              )}
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Nombre de usuario
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
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
                      <a className="text-xs font-display font-semibold text-[#71675D] hover:text-black cursor-pointer">
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
                    className="bg-[#71675D] text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-400 shadow-lg"
                    type="submit"
                    onClick={handleSubmitAdministrador}
                  >
                    Inicia sesión como Administrador
                  </button>
                  <button
                    className="bg-[#71675D] text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-400 shadow-lg"
                    type="submit"
                    onClick={handleSubmitUsuario}
                  >
                    Inicia sesión como Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img
            src="./visoft.png"
            alt="visoft"
            className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen hover:scale-90 transform duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
