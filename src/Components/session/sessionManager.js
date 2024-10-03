"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/Provider/loginProvider";
import { useRouter } from "next/navigation";

const SessionManager = () => {
  const { isAuthenticated, logout, authToken, renovarToken } = useSession(); // 'renovarToken' se asume que es una función que renueva el token
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [preguntado, setPreguntado] = useState(false); // para controlar si ya se preguntó
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !authToken) return;

    const tokenExpiracion = parseJwt(authToken)?.exp * 1000; // Tiempo de expiración en milisegundos
    const tiempoActual = Date.now();
    const tiempoInicial = (tokenExpiracion - tiempoActual) / 1000;

    setTiempoRestante(tiempoInicial);

    const actualizarContador = () => {
      const tiempoActualizado = (tokenExpiracion - Date.now()) / 1000;
      setTiempoRestante(tiempoActualizado);

      // Si el token ha expirado
      if (tiempoActualizado <= 0) {
        clearInterval(intervalo);
        alert("Tu sesión ha expirado.");
        logout();
        router.push("/");
      }

      // Mostrar la pregunta 1 minuto antes de expirar, solo una vez
      if (tiempoActualizado <= 60 && !preguntado) {
        setPreguntado(true);
        const confirmarRenovacion = window.confirm(
          "Tu sesión está por expirar. ¿Quieres continuar?"
        );
        if (confirmarRenovacion) {
          renovarToken(); // Llamamos a la función para renovar el token
          setPreguntado(false); // Reseteamos para futuras expiraciones
        } else {
          clearInterval(intervalo);
          logout();
          router.push("/");
        }
      }
    };

    // Actualiza el tiempo restante cada segundo
    const intervalo = setInterval(actualizarContador, 1000);

    // Limpieza al desmontar el componente
    return () => {
      clearInterval(intervalo);
    };
  }, [isAuthenticated, authToken, preguntado, router, logout, renovarToken]);

  // Función para parsear el token JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error al parsear el token:", error);
      return null;
    }
  };

  return null;
};

export default SessionManager;
