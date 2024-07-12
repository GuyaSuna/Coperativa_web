const URL = "http://localhost:5000";

const getSocio = async (UserNumber) => {
  try {
    const response = await fetch(`${URL}/socio/${UserNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getSocio:", error);
    throw new Error("Error al obtener los datos del socio");
  }
};

const PostSocio = async (socioEntity, suplente, vivienda) => {
  try {
    console.log(socioEntity);
    const response = await fetch(`${URL}/socio/${suplente}/${vivienda}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(socioEntity),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postSocio:", error);
    throw new Error("Error al enviar los datos del socio");
  }
};

const loginAdministrador = async (nombreDeUsuario, contraseña) => {
  try {
    const body = {
      nombreDeUsuario: nombreDeUsuario,
      contraseña: contraseña,
    };
    const response = await fetch(`${URL}/administrador/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Respuesta no es ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getSocio:", error);
    throw new Error("Error al obtener los datos del socio");
  }
};


const loginUsuario = async (nombreDeUsuario, contraseña) => {
  try {
    const body = {
      nombreDeUsuario: nombreDeUsuario,
      contraseña: contraseña,
    };
    const response = await fetch(`${URL}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Respuesta no es ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getSocio:", error);
    throw new Error("Error al obtener los datos del socio");
  }
};

const postSuplente = async (suplenteEntity) => {
  try {
    console.log(suplenteEntity);
    const response = await fetch(`${URL}/suplente}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subtituteEntity),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postSuplente:", error);
    throw new Error("Error al enviar los datos del socio");
  }
};

const postVivienda = async (viviendaEntity) => {
  try {
    console.log(viviendaEntity);
    const response = await fetch(`${URL}/vivienda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viviendaEntity),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postVivienda:", error);
    throw new Error("Error al enviar los datos de la vivienda");
  }
};


export { getSocio, loginAdministrador, loginUsuario, PostSocio, postSuplente, postVivienda };
