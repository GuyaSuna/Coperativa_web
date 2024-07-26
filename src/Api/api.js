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
    console.log(data.Socio);
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
const getSocio = async (cedulaSocio) => {
  try {
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
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

const getAllSocios = async (idCooperativa) => {
  try {
    console.log("API", idCooperativa);
    console.log("Cooperativa IDENTIFICADOR", idCooperativa);
    const response = await fetch(`${URL}/socio/allSocios/${idCooperativa}`, {
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
    console.error("Error en getAllSocios:", error);
    throw new Error("Error al obtener los datos de los Socios.");
  }
};

const postSocio = async (socioEntity, nroVivienda) => {
  try {
    console.log(socioEntity);
    const response = await fetch(`${URL}/socio/${nroVivienda}`, {
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
// const formatDateToSQL = (date) => {
//   const d = new Date(date);
//   const month = `${d.getMonth() + 1}`.padStart(2, "0");
//   const day = `${d.getDate()}`.padStart(2, "0");
//   const year = d.getFullYear();
//   return [year, month, day].join("-");
// };

const updateSocio = async (
  cedulaSocio,
  nroSocio,
  nombreSocio,
  apellidoSocio,
  capitalSocio,
  telefono,
  fechaIngreso
) => {
  console.log("La cedula del socio es: " + cedulaSocio);
  console.log("Telefono que se envía: " + telefono);
  try {
    // const fechaFormateada = formatDateToSQL(FechaIngreso);
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaSocio,
        nroSocio,
        nombreSocio,
        apellidoSocio,
        capitalSocio,
        telefono,
        fechaIngreso,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error en la solicitud: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`El error ocurrio en updateSocio: ${error.message}`);
    throw error;
  }
};

const deleteSocio = async (cedulaSocio) => {
  try {
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteSocio:", error);
    throw new Error("Error al eliminar el socio");
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
    const response = await fetch(`${URL}/vivienda/1`, {
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
    const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
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
    console.error("Error en getVivienda:", error);
    throw new Error("Error al obtener los datos de la vivienda");
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

const updateVivienda = async (
  nroVivienda,
  cantidadDormitorios,
  cooperativaEntity,
  socioTitular
) => {
  try {
    console.log(cooperativaEntity);
    console.log(socioTitular);

    const response = await fetch(`${URL}/vivienda`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nroVivienda,
        socioTitular,
        cantidadDormitorios,
        cooperativaEntity,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Error al actualizar la vivienda");
    }

    return data;
  } catch (error) {
    console.error("Error en updateVivienda:", error);
    throw error;
  }
};

const deleteVivienda = async (nroVivienda) => {
  try {
    const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteVivienda:", error);
    throw new Error("Error al eliminar la vivienda.");
  }
};

// cooperativas

const getCooperativaPorAdmin = async (idMiembro) => {
  try {
    const response = await fetch(`${URL}/cooperativa/Admin/${idMiembro}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en getCooperativasPorAdmin:", error);
    throw new Error("Error al obtener los datos de la Cooperativa");
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

const getUr = async () => {
  try {
    const response = await fetch("https://api.cambio-uruguay.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    // Buscar el objeto con el código 'UR' en el array de datos
    const urData = data.find((item) => item.code === "UR");

    if (!urData) {
      throw new Error(
        "No se encontró el valor de las UR en los datos obtenidos"
      );
    }

    const urValue = urData.buy; // Extraer el valor de 'buy' del objeto con código 'UR'

    return urValue;
  } catch (error) {
    console.error("Error en getUr:", error);
    throw new Error("Error al obtener los datos de las UR");
  }
};

export {
  loginAdministrador,
  loginUsuario,
  getSocio,
  postSocio,
  getAllSocios,
  updateSocio,
  deleteSocio,
  postSuplente,
  postVivienda,
  getVivienda,
  getAllViviendas,
  updateVivienda,
  deleteVivienda,
  getCooperativaPorAdmin,
  getUr,
};
