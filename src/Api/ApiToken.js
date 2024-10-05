const URL = "http://localhost:5000";

const renovarToken = async () => {
  try {
    const response = await fetch(`${URL}/auth/renovarToken`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`, // Incluye el token actual en el header
      },
    });

    if (response.ok) {
      const data = await response.json();
      const nuevoToken = data.token;
      document.cookie = `authToken=${nuevoToken}; path=/;`;
    } else {
      throw new Error("Error al renovar el token");
    }
  } catch (error) {
    console.error("Error renovando el token:", error);
  }
};
export { renovarToken };
