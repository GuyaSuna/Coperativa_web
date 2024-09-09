"use client";
import { LoginMaster } from "@/Api/api";
import { Login } from "@mui/icons-material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Master = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginRequest = await LoginMaster(username, password);
    console.log("Abr", loginRequest);
    if (loginRequest == null) {
      alert("No se ha podido iniciar sesion");
    } else {
      router.push("./MasterHome");
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
                ¿QUE HACES ACA?
              </h1>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  action="#"
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="username"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Nombre de usuario"
                      required
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      placeholder="Contraseña"
                      value={password}
                      onChange={handlePasswordChange}
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
