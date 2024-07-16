const URL = "http://localhost:5000";

//logins
const loginAdministrador = async (email, contraseña) => {
  try {
    const body = {
      email: email,
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

const loginUsuario = async (email, contraseña) => {
  try {
    const body = {
      email: email,
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

//socio
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

const postSocio = async (socioEntity, suplente) => {
  try {
    console.log(socioEntity);
    const response = await fetch(`${URL}/socio/${suplente}`, {
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

// suplente
const postSuplente = async (suplenteEntity, CedulaSocio) => {
  try {
    console.log(suplenteEntity);
    const response = await fetch(`${URL}/suplente/${CedulaSocio}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suplenteEntity),
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

//vivienda
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

const getVivienda = async (nroVivienda) => {
  try {
    const response = await fetch(`${URL}/viviendas/${nroVivienda}`, {
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

const getAllViviendas = async () => {
  try {
    const response = await fetch(`${URL}/vivienda/allViviendas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    console.log(data, "No llegan las viviendas");

    return data;
  } catch (error) {
    console.error("Error en getAllViviendas:", error);
    throw new Error("Error al obtener los datos de las viviendas.");
  }
};

// usuario

// const postUsuario = async (socioEntity, suplente, vivienda) => {
//   try {
//     console.log(socioEntity);
//     const response = await fetch(`${URL}/socio/${suplente}/${vivienda}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(socioEntity),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postSocio:", error);
//     throw new Error("Error al enviar los datos del socio");
//   }
// };

export {
  getSocio,
  loginAdministrador,
  loginUsuario,
  postSocio,
  postSuplente,
  postVivienda,
  getVivienda,
  getAllViviendas,
};
