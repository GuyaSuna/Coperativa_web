"use server";
// pages/api/login.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return NextResponse.json(
          { message: "Usuario o contraseña incorrectos." },
          { status: 400 }
        );
      } else {
        throw new Error("Error en la solicitud de inicio de sesión.");
      }
    }

    const data = await response.json();

    if (data.token) {
      // Guardar el token en una cookie
      const cookieStore = cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // 7 días
        path: "/",
      });

      return NextResponse.json(data, { status: 200 });
    } else {
      throw new Error("No se recibió el token en la respuesta.");
    }
  } catch (error) {
    console.error("Error en LogIn:", error);
    return NextResponse.json(
      { message: "Error al intentar iniciar sesión." },
      { status: 500 }
    );
  }
}
