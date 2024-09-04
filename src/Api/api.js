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
      if (response.status === 400) {
        return "Usuario o contraseña incorrectos.";
      } else {
        throw new Error("Error en la solicitud de inicio de sesión.");
      }
    }
    const data = await response.json();
    console.log(data.Socio);
    return data;
  } catch (error) {
    console.error("Error en LogIn:", error);
    throw new Error("Error al obtener los datos del socio");
  }
};

const postAdministrador = async (administradorEntity, idCooperativa) => {
  try {
    const response = await fetch(
      `${URL}/administrador/register/${idCooperativa}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(administradorEntity),
      }
    );

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

const getAllCooperativas = async () => {
  try {
    const response = await fetch(`${URL}/cooperativa/allCooperativas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${URL}/cooperativa`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/cooperativa`, {
      method: "PUT",
      headers: {
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

const getAdministrador = async (idMiembro) => {
  try {
    const response = await fetch(`${URL}/administrador/${idMiembro}`, {
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
    const response = await fetch(
      `${URL}/socio/${nroVivienda}/${idCooperativa}`,
      {
        method: "POST",
        headers: {
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
    const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(
      `${URL}/socio/${cedulaSocio}/${idCooperativa}`,
      {
        method: "DELETE",
        headers: {
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

const getAllSuplentes = async () => {
  try {
    const response = await fetch(`${URL}/suplente/allSuplentes`, {
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
    console.error("Error en getAllSuplentes:", error);
    throw new Error("Error al obtener los datos de los suplentes.");
  }
};

const getSuplente = async (cedulaSuplente) => {
  try {
    const response = await fetch(`${URL}/suplente/${cedulaSuplente}`, {
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
    console.error("Error en getSuplente:", error);
    throw new Error("Error al obtener los datos del suplente");
  }
};

const deleteSuplente = async (cedulaSuplente) => {
  try {
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
    const response = await fetch(`${URL}/suplente`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(`${URL}/vivienda/${idCooperativa}`, {
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
    console.log(nroVivienda, "nro vivienda getAPI");
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

const getAllViviendas = async (idCooperativa) => {
  console.log("COOPERATIVA", idCooperativa);
  try {
    const response = await fetch(
      `${URL}/vivienda/allViviendas/${idCooperativa}`,
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

const getViviendaPorSocio = async (cedulaSocio) => {
  try {
    const response = await fetch(`${URL}/vivienda/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
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
    const response = await fetch(
      `${URL}/recibo/getAllRecibosPorCooperativa/${idCooperativa}`,
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
    console.error("Error en getAllSocios:", error);
    throw new Error("Error al obtener los datos de los Recibos.");
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

    const response = await fetch(`${URL}/recibo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Convertir el objeto a JSON
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
    const response = await fetch(
      `${URL}/recibos/getAllRecibosPorSocios/${cedulaSocio}`,
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
    const response = await fetch(`${URL}/aviso/${idAdmin}/${idUsuario}`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/usuario`, {
      method: "POST",
      headers: {
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
    const response = await fetch(
      `${URL}/usuario/allUsuarios/${idCooperativa}`,
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
    console.error("Error en getAllUsuarios:", error);
    throw new Error("Error al obtener los datos de los Usuarios.");
  }
};

const deleteUsuario = async (idMiembro) => {
  try {
    const response = await fetch(`${URL}/usuario/${idMiembro}`, {
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
    console.error("Error en deleteUsuario:", error);
    throw new Error("Error al eliminar el usuario.");
  }
};

//Subsidio
const postSubsidio = async (subsidioEntity) => {
  try {
    console.log(subsidioEntity);
    const response = await fetch(`${URL}/subsidio`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/subsidio/allSubsidios`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${URL}/subsidio`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(`${URL}/subsidio/${idSubsidio}`, {
      method: "DELETE",
      headers: {
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
    const response = await fetch(`${URL}/subsidio/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
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
    const response = await fetch(`${URL}/reajuste/${idReajuste}`, {
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
    console.error("Error en getReajuste:", error);
    throw new Error("Error al obtener los datos de los reajustes");
  }
};

const postReajuste = async (reajuste, idCooperativa) => {
  try {
    console.log("Pruebaaaa reajuste", reajuste);
    const response = await fetch(`${URL}/reajuste/${idCooperativa}`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/reajuste`, {
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
    console.error("Error en getUltimoReajuste:", error);
    throw new Error("Error al obtener los datos de el ultimo reajuste");
  }
};

const postConvenio = async (convenio, cedulaSocio, idCooperativa) => {
  console.log("Cedula que mandamos", cedulaSocio);
  try {
    const response = await fetch(
      `${URL}/convenios/${cedulaSocio}/${idCooperativa}`,
      {
        method: "POST",
        headers: {
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
    const response = await fetch(`${URL}/convenios/socio/${cedulaSocio}`, {
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
    console.error("Error en get Ultimo convenio por socio:", error);
    return null;
  }
};
const postIngreso = async (ingreso) => {
  try {
    console.log("Pruebaaaa", ingreso);
    const response = await fetch(`${URL}/ingresos`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/ingresos/${idIngreso}`, {
      method: "DELETE",
      headers: {
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
    const response = await fetch(`${URL}/ingresos`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(
      `${URL}/ingresos/allIngresos/${idCooperativa}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${URL}/convenios/${idConvenio}`, {
      method: "DELETE",
      headers: {
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
    const response = await fetch(`${URL}/convenios`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(
      `${URL}/convenios/allConvenios/${idCooperativa}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    console.log(egreso);
    const response = await fetch(`${URL}/egresos`, {
      method: "POST",
      headers: {
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
    const response = await fetch(`${URL}/egresos/${idEgreso}`, {
      method: "DELETE",
      headers: {
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
    const response = await fetch(`${URL}/egresos`, {
      method: "PUT",
      headers: {
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
    const response = await fetch(`${URL}/egresos/allEgresos/${idCooperativa}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${URL}/CapitalInteres/${idCooperativa}`, {
      method: "POST",
      headers: {
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


export {
  loginAdministrador,
  loginUsuario,
  getSocio,
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
  postRecibo,
  postAviso,
  postUsuario,
  getAllUsuarios,
  deleteUsuario,
  getAdministrador,
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
  postAdministrador,
  postCapitalInteres,
};
