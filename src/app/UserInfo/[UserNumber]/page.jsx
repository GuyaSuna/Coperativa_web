"use client";
import React, { useEffect, useState } from "react";

import {getSocio} from '../../Api/api.js'
const UsuarioInfo = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSocio(2);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <div>{userData.nombre}</div>
      <div>{userData.apellido}</div>
      <div>{userData.cedula}</div>
      <div>{userData.nroSocio}</div>
    </div>
  );
};

export default UsuarioInfo;
