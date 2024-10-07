"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/Provider/loginProvider";
import { useRouter } from "next/navigation";
import { renovarToken } from "./../../Api/ApiToken";

const SessionManager = () => {
  const { isAuthenticated, logout, authToken, setAuthToken } = useSession();
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [preguntado, setPreguntado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !authToken) return;

    console.log("AuthToken en useEffect inicial:", authToken);

    const tokenExpiracion = parseJwt(authToken)?.exp * 100; // Expiración en milisegundos
    const tiempoActual = Date.now();
    const tiempoInicial = (tokenExpiracion - tiempoActual) / 1000;

    setTiempoRestante(tiempoInicial);

    const actualizarContador = () => {
      const tiempoActualizado = (tokenExpiracion - Date.now()) / 1000;
      setTiempoRestante(tiempoActualizado);

      if (tiempoActualizado <= 0) {
        clearInterval(intervalo);
        alert("Tu sesión ha expirado.");
        logout();
        router.push("/");
      }

      // Preguntar por la renovación del token si falta 1 minuto
      if (tiempoActualizado <= 60 && !preguntado) {
        setPreguntado(true);
        const confirmarRenovacion = window.confirm(
          "Tu sesión está por expirar. ¿Quieres continuar?"
        );
        if (confirmarRenovacion) {
          renovarToken(authToken).then((nuevoToken) => {
            if (nuevoToken) {
              console.log(
                "Nuevo token recibido en SessionManager:",
                nuevoToken
              );
              setAuthToken(nuevoToken); // Actualizamos el contexto con el nuevo token
              setCookie("authToken", nuevoToken, 1); // Actualizamos la cookie
              console.log("Token actualizado y cookie seteada");
              setPreguntado(false); // Reseteamos para futuras expiraciones
            } else {
              logout();
              router.push("/"); // Redirigir si la renovación falla
            }
          });
        } else {
          clearInterval(intervalo);
          logout();
          router.push("/");
        }
      }
    };

    // Actualiza el tiempo restante cada segundo
    const intervalo = setInterval(actualizarContador, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [isAuthenticated, authToken, preguntado, router, logout, setAuthToken]);

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

  const setCookie = (nombre, valor, dias) => {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    const expira = "expires=" + fecha.toUTCString();
    document.cookie = `${nombre}=${valor};${expira};path=/`;
    console.log("Cookie actualizada:", nombre, valor);
  };

  return null;
};

export default SessionManager;
