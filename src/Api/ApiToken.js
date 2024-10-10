const URL = "http://localhost:5000";

const renovarToken = async (authToken) => {
  try {
    const response = await fetch(`${URL}/auth/renovarToken`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data.token;
    } else {
      throw new Error("Error al renovar el token");
    }
  } catch (error) {
    console.error("Error renovando el token:", error);
    return null;
  }
};

export { renovarToken };
