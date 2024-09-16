import { getToken } from "./getToken";
const URL = "http://localhost:5000";

//logins
const Login = async (username, password) => {
  try {
    const body = {
      username: username,
      password: password,
    };
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return "Usuario o contraseña incorrectos.";
      } else {
        throw new Error("Error en la solicitud de inicio de sesión.");
      }
    }

    const data = await response.json();

    console.log("Data", data);
    if (data.token) {
      document.cookie = `token=${data.token}; path=/; max-age=1440`;
    } else {
      throw new Error("No se recibió el token en la respuesta.");
    }

    return data;
  } catch (error) {
    console.error("Error en LogIn:", error);
    throw new Error("Error al intentar iniciar sesión.");
  }
};

const register = async (RegisterRequest) => {
  try {
    const response = await fetch(`${URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(RegisterRequest),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postAdministrador:", error);
    throw new Error("Error al enviar los datos del administrador");
  }
};

const updateAdministrador = async (administradorEntity) => {
  try {
    const response = await fetch(`${URL}/administrador`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(administradorEntity),
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
    console.error(`El error ocurrio en updateAdministrador: ${error.message}`);
    throw error;
  }
};

// api.js (frontend)
const getAllCooperativas = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/cooperativa/allCooperativas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Error en getAllCooperativas:", error);
    throw new Error("Error al obtener los datos de las Cooperativas.");
  }
};

const postCooperativa = async (cooperativaEntity) => {
  try {
    console.log(cooperativaEntity);
    console.log("ESTE ES LA API", cooperativaEntity);
    const token = getToken();
    const response = await fetch(`${URL}/cooperativa`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cooperativaEntity),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postCooperativa:", error);
    throw new Error("Error al enviar los datos de la cooperativa");
  }
};

const updateCooperativa = async (cooperativaEntity) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/cooperativa`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cooperativaEntity),
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
    console.error(`El error ocurrio en updateCooperativa: ${error.message}`);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`${URL}/auth/getUser${id}`, {
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
    console.error("Error en getAdministrador:", error);
    throw new Error("Error al obtener los datos del administrador");
  }
};

//socio
const getSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

const getRecibosImpagosSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    console.log("Token", token);
    const response = await fetch(`${URL}/socio/reciboImpago/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getRecibosImpagosSocio:", error);
    throw new Error("Error al obtener los datos del socio");
  }
};

const getAllSocios = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/socio/allSocios/${idCooperativa}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    // Formatear la fecha de cada socio
    const sociosConFechaFormateada = data.map((socio) => {
      if (socio.FechaIngreso) {
        const fechaISO = parseISO(socio.FechaIngreso);
        const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
        return {
          ...socio,
          FechaIngreso: fechaFormateada,
        };
      } else {
        return socio;
      }
    });

    return sociosConFechaFormateada;
  } catch (error) {
    console.error("Error en getAllSocios:", error);
    throw new Error("Error al obtener los datos de los Socios.");
  }
};

const postSocio = async (socioEntity, nroVivienda, idCooperativa) => {
  try {
    console.log(socioEntity);
    console.log("ESTE ES LA API", idCooperativa);
    const token = getToken();
    const response = await fetch(
      `${URL}/socio/${nroVivienda}/${idCooperativa}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socioEntity),
      }
    );

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

const updateSocio = async (socioEntity) => {
  let cedulaSocio = socioEntity.cedulaSocio;
  console.log("La cedula del socio es: " + cedulaSocio);

  try {
    // const fechaFormateada = formatDateToSQL(FechaIngreso);
    const token = getToken();
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(socioEntity),
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

const deleteSocio = async (cedulaSocio, idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/socio/${cedulaSocio}/${idCooperativa}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

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
    console.log("Cedula del socio:", CedulaSocio);
    const token = getToken();
    const response = await fetch(`${URL}/suplente/${CedulaSocio}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

const getAllSuplentes = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/suplente/allSuplentes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Error en getAllSuplentes:", error);
    throw new Error("Error al obtener los datos de los suplentes.");
  }
};

const getSuplente = async (cedulaSuplente) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/suplente/${cedulaSuplente}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getSuplente:", error);
    throw new Error("Error al obtener los datos del suplente");
  }
};

const deleteSuplente = async (cedulaSuplente) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/suplente/${cedulaSuplente}`, {
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
    console.error("Error en deleteSuplente:", error);
    throw new Error("Error al eliminar la vivienda.");
  }
};

const updateSuplente = async (
  cedulaSuplente,
  nombreSuplente,
  apellidoSuplente,
  telefonoSuplente
) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/suplente`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaSuplente,
        nombreSuplente,
        apellidoSuplente,
        telefonoSuplente,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Error al actualizar el suplente.");
    }

    return data;
  } catch (error) {
    console.error("Error en updateSuplente:", error);
    throw error;
  }
};

//vivienda
const postVivienda = async (viviendaEntity, idCooperativa) => {
  try {
    console.log(viviendaEntity);
    const token = getToken();
    const response = await fetch(`${URL}/vivienda/${idCooperativa}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.log(nroVivienda, "nro vivienda getAPI");
    const token = getToken();
    const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

const getAllViviendas = async (idCooperativa) => {
  console.log("COOPERATIVA", idCooperativa);
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/vivienda/allViviendas/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getAllViviendas:", error);
    throw new Error("Error al obtener los datos de las viviendas.");
  }
};

const updateVivienda = async (
  idVivienda,
  nroVivienda,
  listaAntiguosTitulares,
  cantidadDormitorios,
  cooperativaEntity,
  valorVivienda,
  socio
) => {
  try {
    console.log(
      "ACAAAAAA",
      idVivienda,
      nroVivienda,
      listaAntiguosTitulares,
      cantidadDormitorios,
      valorVivienda
    );
    console.log(cooperativaEntity);
    const token = getToken();
    const response = await fetch(`${URL}/vivienda`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idVivienda,
        nroVivienda,
        socio,
        listaAntiguosTitulares,
        cantidadDormitorios,
        cooperativaEntity,
        valorVivienda,
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
    const token = getToken();
    const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
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

const getViviendaPorSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/vivienda/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la vivienda del socio");
    }

    const vivienda = await response.json();
    return vivienda;
  } catch (error) {
    console.error("Error en getViviendaPorSocio:", error);
    throw new Error(
      "Error al obtener los datos de la la vivienda por el socio."
    );
  }
};

// cooperativas
const getCooperativaPorAdmin = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/cooperativa/Admin/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

const getCooperativaPorSocio = async (cedulaSocio) => {
  try {
    const response = await fetch(`${URL}/cooperativa/Socio/${cedulaSocio}`, {
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
    console.error("Error en getCooperativasPorSocio:", error);
    throw new Error("Error al obtener los datos de la Cooperativa");
  }
};

//Recibos
const getUr = async () => {
  try {
    const response = await fetch(
      "https://api.cambio-uruguay.com/exchange/BCU/UR",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getUr:", error);
    throw new Error("Error al obtener los datos de las UR");
  }
};

const getAllRecibos = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/recibo/getAllRecibosPorCooperativa/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getAllRecibos:", error);
    throw new Error("Error al obtener los datos de los Recibos.");
  }
};

const getRecibo = async (nroRecibo) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recibo/${nroRecibo}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getRecibo:", error);
    throw new Error("Error al obtener los datos del recibo");
  }
};

const postRecibo = async (
  fechaRecibo,
  fechaPago,
  recargo,
  interes,
  capital,
  cuotaSocial,
  convenio,
  subsidio,
  cuotaMensual,
  sumaEnPesos,
  socio,
  tesorero
) => {
  console.log(
    "datos del recibo en api: " + fechaRecibo,
    fechaPago,
    recargo,
    interes,
    capital,
    cuotaSocial,
    convenio,
    subsidio,
    cuotaMensual,
    sumaEnPesos,
    socio,
    tesorero
  );

  try {
    if (subsidio == 0) {
      subsidio = null;
    }
    if (convenio == 0) {
      convenio = null;
    }
    const reciboData = {
      fechaRecibo,
      fechaPago,
      recargo,
      interes,
      capital,
      cuotaSocial,
      convenio,
      subsidio,
      cuotaMensual,
      sumaEnPesos,
      socio,
      tesorero,
    };
    const token = getToken();
    const response = await fetch(`${URL}/recibo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reciboData),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en postRecibo:", error);
    throw new Error("Error al enviar los datos de el recibo");
  }
};

const getAllRecibosPorSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/recibos/getAllRecibosPorSocios/${cedulaSocio}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error en getAllRecibosPorSocio:", error);
    throw new Error("Error al obtener los datos de los recibos.");
  }
};

const postAviso = async (aviso, idAdmin, idUsuario) => {
  try {
    console.log(aviso);
    const token = getToken();
    const response = await fetch(`${URL}/aviso/${idAdmin}/${idUsuario}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aviso),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postSocio:", error);
    throw new Error("Error al enviar los datos del aviso");
  }
};

// usuario
const postUsuario = async (usuarioEntity) => {
  try {
    console.log("UsuarioEntityAPI", usuarioEntity);
    const token = getToken();
    const response = await fetch(`${URL}/usuario`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioEntity),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    return response;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};

const getAllUsuarios = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/auth/getAllUsers/${idCooperativa}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getAllUsuarios:", error);
    throw new Error("Error al obtener los datos de los Usuarios.");
  }
};

const deleteUsuario = async (idMiembro) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/usuario/${idMiembro}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteUsuario:", error);
    throw new Error("Error al eliminar el usuario.");
  }
};

//Subsidio
const postSubsidio = async (subsidioEntity) => {
  try {
    console.log(subsidioEntity);
    const token = getToken();
    const response = await fetch(`${URL}/subsidio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subsidioEntity),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error interno del servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear el subsidio:", error);
    throw error;
  }
};

const getAllSubsidios = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/subsidio/allSubsidios`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Error en getAllSubsidios:", error);
    throw new Error("Error al obtener los datos de los subsidios.");
  }
};

const updateSubsidio = async (
  idSubsidio,
  cuotaTotalUr,
  cuotaApagarUr,
  subsidioUr,
  porcentaje,
  vigenciaEnMeses,
  fechaOtorgado,
  fechaExpira,
  socio
) => {
  try {
    console.log(
      idSubsidio,
      cuotaTotalUr,
      cuotaApagarUr,
      subsidioUr,
      porcentaje,
      vigenciaEnMeses,
      fechaOtorgado,
      fechaExpira,
      socio
    );
    const token = getToken();
    const response = await fetch(`${URL}/subsidio`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSubsidio,
        cuotaTotalUr,
        cuotaApagarUr,
        subsidioUr,
        porcentaje,
        vigenciaEnMeses,
        fechaOtorgado,
        fechaExpira,
        socio,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error al actualizar el subsidio");
    }

    return data;
  } catch (error) {
    console.error("Error en updateSubsidio:", error);
    throw error;
  }
};

const deleteSubsidio = async (idSubsidio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/subsidio/${idSubsidio}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Error en la solicitud de borrado del subsidio: ${errorDetails}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error en deleteSubsidio:", error);
    throw new Error(`Error al eliminar el subsidio: ${error.message}`);
  }
};

const getUltimoSubsidioSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/subsidio/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The request failed, response isn't ok");
    }

    // Verifica si la respuesta tiene contenido
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      return null; // No hay contenido o no es JSON
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en get Ultimo subsidio por socio:", error);
    return null;
  }
};

//Reajuste
const getReajuste = async (idReajuste) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/reajuste/${idReajuste}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getReajuste:", error);
    throw new Error("Error al obtener los datos de los reajustes");
  }
};

const postReajuste = async (reajuste, idCooperativa) => {
  try {
    console.log("Pruebaaaa reajuste", reajuste);
    const token = getToken();
    const response = await fetch(`${URL}/reajuste/${idCooperativa}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reajuste),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postReajuste:", error);
    throw new Error("Error al enviar los datos del reajuste");
  }
};

const getUltimoReajuste = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/reajuste`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getUltimoReajuste:", error);
    throw new Error("Error al obtener los datos de el ultimo reajuste");
  }
};

const postConvenio = async (convenio, cedulaSocio, idCooperativa) => {
  console.log("Cedula que mandamos", cedulaSocio);
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/convenios/${cedulaSocio}/${idCooperativa}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convenio),
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postConvenio:", error);
    throw new Error("Error al enviar los datos de el convenio");
  }
};

const getUltimoConvenioSocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/convenios/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en get Ultimo convenio por socio:", error);
    return null;
  }
};

const postIngreso = async (ingreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/ingresos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingreso),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postIngreso:", error);
    throw new Error("Error al enviar los datos del ingreso");
  }
};

const deleteIngreso = async (idIngreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/ingresos/${idIngreso}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado del Igreso");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteSubsidio:", error);
    throw new Error("Error al eliminar el ingreso.");
  }
};

const updateIngreso = async (subRubro, denominacion, ingreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/ingresos`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subRubro,
        denominacion,
        ingreso,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al actualizar el ingreso");
    }

    return data;
  } catch (error) {
    console.error("Error en updateIngreso:", error);
    throw error;
  }
};

const getAllIngresos = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/ingresos/allIngresos/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error en getAllIngresos:", error);
    throw new Error("Error al obtener los datos de los Ingresos.");
  }
};

const deleteConvenio = async (idConvenio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/convenios/${idConvenio}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado del Convenio");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteConvenio:", error);
    throw new Error("Error al eliminar el convenio.");
  }
};

const updateConvenio = async (subRubro, denominacion, ingreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/convenios`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subRubro,
        denominacion,
        ingreso,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al actualizar el ingreso");
    }

    return data;
  } catch (error) {
    console.error("Error en updateIngreso:", error);
    throw error;
  }
};

const getAllConvenios = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/convenios/allConvenios/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error en getAllConvenios:", error);
    throw new Error("Error al obtener los datos de los Convenios.");
  }
};

const postEgreso = async (egreso) => {
  try {
    const token = getToken();
    console.log(egreso);
    const response = await fetch(`${URL}/egresos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(egreso),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postIngreso:", error);
    throw new Error("Error al enviar los datos del aviso");
  }
};

const deleteEgreso = async (idEgreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/egresos/${idEgreso}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud de borrado del Egreso");
    }

    return true;
  } catch (error) {
    console.error("Error en deleteSubsidio:", error);
    throw new Error("Error al eliminar el Egreso.");
  }
};

const updateEgreso = async (subRubro, denominacion, egreso) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/egresos`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subRubro,
        denominacion,
        egreso,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al actualizar el egreso");
    }

    return data;
  } catch (error) {
    console.error("Error en updateEgreso:", error);
    throw error;
  }
};

const getAllEgresos = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/egresos/allEgresos/${idCooperativa}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Error en getAllEgresos:", error);
    throw new Error("Error al obtener los datos de los Egresos.");
  }
};

const postCapitalInteres = async (CapitalInteresList, idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/CapitalInteres/${idCooperativa}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CapitalInteresList),
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postCapitalInteres:", error);
    throw new Error("Error al enviar los datos del CapitalInteres");
  }
};

// Estados Contables

const postEstadoContable = async (estadoContableEntity, idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/estadoContable/${idCooperativa}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estadoContableEntity),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postEstadoContable:", error);
    throw new Error("Error al enviar los datos del estadoContable");
  }
};

const getInteresAnual = async (fecha, idCooperativa) => {
  try {
    console.log("Llega aca");
    const token = getToken();
    console.log(token);
    const response = await fetch(
      `${URL}/interesAnual/${fecha}/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en getInteresAnual:", error);
    throw new Error("Error al enviar los datos del InteresAnual");
  }
};

//Utilizar Libreria B)

const loginMaster = async (MasterData) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/auth/loginMaster`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MasterData),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }
    const data = await response.json();

    if (data.token) {
      document.cookie = `token=${data.token}; path=/; max-age=1440`;
    } else {
      throw new Error("No se recibió el token en la respuesta.");
    }

    return data;
  } catch (error) {
    console.error("Error en Login Master:", error);
    throw new Error("Error al enviar los datos Master");
  }
};

export {
  Login,
  getSocio,
  getRecibosImpagosSocio,
  postSocio,
  getAllSocios,
  updateSocio,
  deleteSocio,
  postSuplente,
  getAllSuplentes,
  getSuplente,
  updateSuplente,
  deleteSuplente,
  postVivienda,
  getVivienda,
  getAllViviendas,
  updateVivienda,
  deleteVivienda,
  getViviendaPorSocio,
  getCooperativaPorAdmin,
  getCooperativaPorSocio,
  getUr,
  getAllRecibos,
  getRecibo,
  postRecibo,
  postAviso,
  postUsuario,
  getAllUsuarios,
  deleteUsuario,
  getReajuste,
  postReajuste,
  getUltimoReajuste,
  postIngreso,
  postEgreso,
  updateIngreso,
  updateEgreso,
  postSubsidio,
  getAllSubsidios,
  updateSubsidio,
  deleteSubsidio,
  getUltimoSubsidioSocio,
  deleteEgreso,
  deleteIngreso,
  getAllIngresos,
  getAllEgresos,
  postConvenio,
  getUltimoConvenioSocio,
  getAllConvenios,
  deleteConvenio,
  updateConvenio,
  getAllRecibosPorSocio,
  getAllCooperativas,
  postCooperativa,
  updateCooperativa,
  updateAdministrador,
  postCapitalInteres,
  register,
  getUser,
  postEstadoContable,
  getInteresAnual,
  loginMaster,
};
