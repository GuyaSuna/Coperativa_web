"use client";
import React, { useState } from "react";
import { loginMaster } from "@/Api/api"; // Tu función que hace el llamado a la API
import { useRouter } from "next/navigation";
import { useSession } from "@/Provider/loginProvider";

const Master = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useSession(); // Usar la función login del contexto

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      // Llamar a la función loginMaster con los datos de username y password
      const response = await loginMaster({ username, password });
      console.log("Login exitoso:", response);

      if (response && response.token) {
        console.log("Token recibido en el frontend:", response.token);
        login(response.token); // Continuar con el proceso de login
        router.push("/MasterHome");
      } else {
        console.error("Error: No se recibió un token válido.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      // Manejar el error, por ejemplo mostrando un mensaje en la UI
    }
  };

  return (
    <div className="bg-black h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: 500 }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-thin">
                ViSoft-Tricoma
              </h1>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  onSubmit={handleSubmit} // Enlazamos el evento de submit con nuestra función
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="username"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} // Actualizar el estado de username
                      placeholder="Username"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de password
                      required
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                      onClick={handleSubmit}
                    >
                      Iniciar Sesion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              background:
                'url("https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80")',
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Master;
