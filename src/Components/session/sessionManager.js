'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from '@/Provider/loginProvider';
import { useRouter } from 'next/navigation';

const SessionManager = () => {
  const { isAuthenticated, logout, authToken } = useSession();
  const [tiempoRestante, setTiempoRestante] = useState(0); // Tiempo restante del token en segundos
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !authToken) return;

    // Decodificar el token JWT y obtener el tiempo de expiración (exp)
    const tokenExpiracion = parseJwt(authToken)?.exp * 1000; // Convertir a milisegundos
    const tiempoActual = Date.now();
    const tiempoInicial = (tokenExpiracion - tiempoActual) / 1000; // Tiempo restante en segundos

    setTiempoRestante(tiempoInicial);

    const actualizarContador = () => {
      setTiempoRestante((prevTiempo) => {
        if (prevTiempo <= 0) {
          clearInterval(intervalo);
          alert('Tu sesión ha expirado.');
          logout();
          router.push('/login'); // Redirigir al login
          return 0;
        }
        if (prevTiempo <= 30) {
          alert('¿Aún estás ahí?');

          const tiempoRespuesta = setTimeout(() => {
            logout();
            router.push('/login'); // Redirigir al login si no responde en 30 segundos
          }, 30000); // 30 segundos para esperar la respuesta

          return prevTiempo - 1;
        }
        return prevTiempo - 1;
      });
    };

    const intervalo = setInterval(actualizarContador, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [isAuthenticated, authToken]);

  // Función para parsear el token JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al parsear el token:', error);
      return null;
    }
  };

  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;

  return (
    <div>
      Tiempo restante: {minutos}:{segundos < 10 ? `0${segundos}` : segundos}
    </div>
  );
};

export default SessionManager;
