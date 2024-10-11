"use client";

import React, { useState, useEffect , useContext} from "react";
import { updateUser } from "../../../../Api/api.js"; // Asegúrate de tener la función updateUser
import { MiembroContext } from "@/Provider/provider.js";

const ModificarUsuario = ({ usuario }) => {
  const [username, setUsername] = useState(usuario?.username);
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState(usuario?.firstname);
  const [lastname, setLastname] = useState(usuario?.lastname);
  const [email, setEmail] = useState(usuario?.email);
  const [errores, setErrores] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const {cooperativa, miembro } = useContext(MiembroContext);
  const validarFormulario = () => {
    const errores = {};
    if (!username) errores.username = "El nombre de usuario es obligatorio";
    if (!email) errores.email = "El correo es obligatorio";
    if (!firstname) errores.firstname = "El nombre es obligatorio";
    if (!lastname) errores.lastname = "El apellido es obligatorio";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const UpdateUserRequest = {
      username,
      password: password || undefined, 
      firstname,
      lastname,
      email,
      role : "USER",
    };
console.log("Miembro" , miembro)
    try {
      const result = await updateUser(UpdateUserRequest, miembro.responseBody.socio.cedulaSocio,  cooperativa.idCooperativa);
      if(result != null){
        alert("Usuario modificado");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setErrorMessage("Error al actualizar usuario");
    }
  };

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm w-full px-4">
      <div className="mt-10 px-4 sm:px-8 md:px-16 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center lg:text-left text-3xl md:text-4xl xl:text-5xl dark:text-white text-[#71675D] font-display font-semibold">
          Modificar Usuario
        </h2>
        <div className="mt-12">
          {/* Error message display */}
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
  
          {/* Form structure */}
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
            <div className="mt-8">
              <label className="text-sm font-bold dark:text-white text-gray-700 tracking-wide">
                Nombre de usuario
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
  
            <div className="mt-8">
              <label className="text-sm font-bold dark:text-white tracking-wide">
                Correo electrónico
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="mt-8">
              <label className="text-sm font-bold dark:text-white tracking-wide">
                Contraseña (opcional)
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                type="password"
                placeholder="Nueva contraseña (opcional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <div className="mt-8">
              <label className="text-sm font-bold dark:text-white tracking-wide">
                Nombre
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                type="text"
                placeholder="Nombre"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
  
            <div className="mt-8">
              <label className="text-sm font-bold dark:text-white tracking-wide">
                Apellido
              </label>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                type="text"
                placeholder="Apellido"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
  
            <div className="mt-10">
              <button
                className="bg-[#71675D] text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-400 shadow-lg"
                type="submit"
              >
                Actualizar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default ModificarUsuario;
