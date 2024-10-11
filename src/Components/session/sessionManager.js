"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/Provider/loginProvider";
import { useRouter } from "next/navigation";
import { renovarToken } from "./../../Api/ApiToken";

const SessionManager = () => {
  const { isAuthenticated, logout, authToken, setAuthToken } = useSession();
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [preguntado, setPreguntado] = useState(false);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [contadorDialogo, setContadorDialogo] = useState(120); // Contador de 2 minutos
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !authToken) return;

    const tokenExpiracion = parseJwt(authToken)?.exp * 1000;
    const tiempoActual = Date.now();
    const tiempoInicial = (tokenExpiracion - tiempoActual) / 1000;

    setTiempoRestante(tiempoInicial);

    const actualizarContador = () => {
      const tiempoActualizado = (tokenExpiracion - Date.now()) / 1000;
      setTiempoRestante(tiempoActualizado);

      if (tiempoActualizado <= 0) {
        clearInterval(intervalo);
        handleCancelar();
      }

      if (tiempoActualizado <= 120 && !preguntado) {
        setPreguntado(true);
        setMostrarDialogo(true);
      }
    };

    const intervalo = setInterval(actualizarContador, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [isAuthenticated, authToken, preguntado, router, logout, setAuthToken]);

  useEffect(() => {
    if (mostrarDialogo && contadorDialogo > 0) {
      const contador = setInterval(() => {
        setContadorDialogo((prev) => prev - 1);
      }, 1000);

      if (contadorDialogo === 0) {
        clearInterval(contador);
        logout();
        router.push("/");
      }

      return () => clearInterval(contador);
    }
  }, [mostrarDialogo, contadorDialogo, logout, router]);

  const handleConfirmar = () => {
    renovarToken(authToken).then((nuevoToken) => {
      if (nuevoToken) {
        setAuthToken(nuevoToken);
        setCookie("token", nuevoToken, 1);
        setPreguntado(false);
        setMostrarDialogo(false);
      } else {
        logout();
        router.push("/");
      }
    });
  };

  const handleCancelar = () => {
    logout();
    router.push("/");
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
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
  };

  return (
    <>
      {mostrarDialogo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Tu sesión está por expirar
            </h2>
            <p>¿Quieres continuar? (Tiempo restante: {contadorDialogo}s)</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancelar}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                No
              </button>
              <button
                onClick={handleConfirmar}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionManager;
