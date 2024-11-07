import { getToken } from "./getToken";
import api from "./apiConfiguration";
const URL = "http://localhost:5000";



// const registerMaster = async (bodymaster) => {
//   try {
//     const response = await fetch(`${URL}/auth/registerMaster`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bodymaster),
//     });

//     const contentType = response.headers.get("Content-Type");
//     if (!contentType || !contentType.includes("application/json")) {
//       return null;
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en register master:", error);
//     throw new Error("Error al generar master.");
//   }
// };
export const registerMaster = async (bodymaster) => (await api.post(`/auth/registerMaster`, bodymaster,{ needsAuth: false })).data;

// const Login = async (username, password) => {
//   try {
//     const body = {
//       username: username,
//       password: password,
//     };
//     const response = await fetch(`${URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       if (response.status === 400) {
//         return "Usuario o contraseña incorrectos.";
//       } else {
//         throw new Error("Error en la solicitud de inicio de sesión.");
//       }
//     }

//     const data = await response.json();

//     if (data.token) {
//       document.cookie = `token=${data.token}; path=/; max-age=1440`;
//     } else {
//       throw new Error("No se recibió el token en la respuesta.");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en LogIn:", error);
//     throw new Error("Error al intentar iniciar sesión.");
//   }
// };
export const Login = async (username, password) => (await api.post(`/auth/login`, body = {  username: username, password: password },{ needsAuth: false })).data;

// const LoginMaster = async (username, password) => {
//   try {
//     const body = {
//       username: username,
//       password: password,
//     };
//     const response = await fetch(`${URL}/auth/loginMaster`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       if (response.status === 400) {
//         return "Usuario o contraseña incorrectos.";
//       } else {
//         throw new Error("Error en la solicitud de inicio de sesión.");
//       }
//     }

//     const data = await response.json();

//     if (data.token) {
//       // Guardar el token en la cookie
//       document.cookie = `token=${data.token}; path=/; max-age=${
//         7 * 24 * 60 * 60
//       }`;
//     } else {
//       throw new Error("No se recibió el token en la respuesta.");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en LogIn:", error);
//     throw new Error("Error al intentar iniciar sesión.");
//   }
// };
export const LoginMaster = async () => (await api.post(`/auth/loginMaster`,body = { username: username, password: password} ,{ needsAuth: false })).data;

// const register = async (RegisterRequest, cedulaSocio, idCooperativa) => {
//   try {
//     const response = await fetch(
//       `${URL}/auth/register/${cedulaSocio}/${idCooperativa}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(RegisterRequest),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en register:", error);
//     throw new Error("Error al enviar los datos del administrador");
//   }
// };
export const register = async (RegisterRequest, cedulaSocio, idCooperativa) => (await api.post(`/auth/register/${cedulaSocio}/${idCooperativa}`, RegisterRequest,{ needsAuth: false })).data;

// const updateAdministrador = async (administradorEntity) => {
//   try {
//     const response = await fetch(`${URL}/administrador`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(administradorEntity),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Error en la solicitud: ${response.status} - ${errorText}`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`El error ocurrio en updateAdministrador: ${error.message}`);
//     throw error;
//   }
// };
export const updateAdministrador = async (administradorEntity) => (await api.put(`/administrador`, administradorEntity,{ needsAuth: false })).data;

// const getAllCooperativas = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/cooperativa/allCooperativas`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllCooperativas:", error);
//     throw new Error("Error al obtener los datos de las Cooperativas.");
//   }
// };
export const getAllCooperativas = async () => (await api.get(`/cooperativa/allCooperativas`, { needsAuth: true })).data;

// const postCooperativa = async (cooperativaEntity) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/cooperativa`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cooperativaEntity),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postCooperativa:", error);
//     throw new Error("Error al enviar los datos de la cooperativa");
//   }
// };
export const postCooperativa = async (cooperativaEntity) => (await api.post(`/cooperativa`,cooperativaEntity ,{ needsAuth: true })).data;

// const updateCooperativa = async (cooperativaEntity) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/cooperativa`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cooperativaEntity),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Error en la solicitud: ${response.status} - ${errorText}`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`El error ocurrio en updateCooperativa: ${error.message}`);
//     throw error;
//   }
// };
export const updateCooperativa = async (cooperativaEntity) => (await api.put(`/cooperativa`, cooperativaEntity, { needsAuth: true})).data;

// const getUser = async (id) => {
//   try {
//     const response = await fetch(`${URL}/auth/getUser${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAdministrador:", error);
//     throw new Error("Error al obtener los datos del administrador");
//   }
// };
export const getUser = async (id) => (await api.get(`/auth/getUser${id}`, { needsAuth: false })).data;

// const getSocio = async (cedulaSocio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/socio/${cedulaSocio}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getSocio:", error);
//     throw new Error("Error al obtener los datos del socio");
//   }
// };
export const getSocio = async (cedulaSocio) => (await api.get(`/socio/${cedulaSocio}`, { needsAuth: true })).data;

// const getRecibosImpagosSocio = async (cedulaSocio, idCooperativa) => {
//   try {
//     const token = getToken();

//     const response = await fetch(
//       `${URL}/recibo/getRecibosImpagos/${cedulaSocio}/${idCooperativa}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getRecibosImpagosSocio:", error);
//     throw new Error("Error al obtener los datos del socio");
//   }
// };
export const getRecibosImpagosSocio = async (cedulaSocio, idCooperativa) => (await api.get(`/recibo/getRecibosImpagos/${cedulaSocio}/${idCooperativa}`, { needsAuth: true })).data;

// const getAllSocios = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/socio/allSocios/${idCooperativa}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     const sociosConFechaFormateada = data.map((socio) => {
//       if (socio.FechaIngreso) {
//         const fechaISO = parseISO(socio.FechaIngreso);
//         const fechaFormateada = format(fechaISO, "yyyy-MM-dd");
//         return {
//           ...socio,
//           FechaIngreso: fechaFormateada,
//         };
//       } else {
//         return socio;
//       }
//     });

//     return sociosConFechaFormateada;
//   } catch (error) {
//     console.error("Error en getAllSocios:", error);
//     throw new Error("Error al obtener los datos de los Socios.");
//   }
// };
export const getAllSocios = async (idCooperativa) => (await api.get(`/socio/allSocios/${idCooperativa}`, { needsAuth: true })).data;
 
// const getAllSociosImpagos = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/socio/SociosImpagos/${idCooperativa}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllSociosImpagos:", error);
//     throw new Error("Error al obtener los datos de los Socios.");
//   }
// };
export const getAllSociosImpagos = async (idCooperativa) => (await api.get(`/socio/SociosImpagos/${idCooperativa}`, { needsAuth: true })).data;

// const postSocio = async (socioEntity, nroVivienda, idCooperativa) => {
  
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/socio/${nroVivienda}/${idCooperativa}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(socioEntity),
//       }
//     );

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
export const postSocio = async (socioEntity, nroVivienda , idCooperativa) => (await api.post(`/socio/${nroVivienda}/${idCooperativa}`,socioEntity, { needsAuth: true })).data;

// const updateSocio = async (socioEntity, idVivienda) => {
//   let cedulaSocio = socioEntity.cedulaSocio;
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/socio/${cedulaSocio}/${idVivienda}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(socioEntity),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Error en la solicitud: ${response.status} - ${errorText}`
//       );
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`El error ocurrio en updateSocio: ${error.message}`);
//     throw error;
//   }
// };
export const updateSocio = async (socioEntity, idVivienda) => (await api.put(`/socio/${socioEntity.cedulaSocio}/${idVivienda}`, socioEntity ,{ needsAuth: true })).data;

// const deleteSocio = async (cedulaSocio, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/socio/${cedulaSocio}/${idCooperativa}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteSocio:", error);
//     throw new Error("Error al eliminar el socio");
//   }
// };
export const deleteSocio = async (cedulaSocio, idCooperativa) => (await api.delete(`/socio/${cedulaSocio}/${idCooperativa}`, { needsAuth: true })).data;

// const postSuplente = async (suplenteEntity, CedulaSocio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/suplente/${CedulaSocio}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(suplenteEntity),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postSuplente:", error);
//     throw new Error("Error al enviar los datos del socio");
//   }
// };
export const postSuplente = async (suplenteEntity, cedulaSocio) => (await api.post(`/suplente/${cedulaSocio}`, suplenteEntity, { needsAuth: true })).data;

// const getAllSuplentes = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/suplente/allSuplentes`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllSuplentes:", error);
//     throw new Error("Error al obtener los datos de los suplentes.");
//   }
// };
export const getAllSuplentes = async () => (await api.get(`/suplente/allSuplentes`, { needsAuth: true })).data;

// const getSuplente = async (cedulaSuplente) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/suplente/${cedulaSuplente}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getSuplente:", error);
//     throw new Error("Error al obtener los datos del suplente");
//   }
// };
export const getSuplente = async (cedulaSuplente) => (await api.get(`/suplente/${cedulaSuplente}`, { needsAuth: true })).data;

// const deleteSuplente = async (cedulaSuplente) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/suplente/${cedulaSuplente}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteSuplente:", error);
//     throw new Error("Error al eliminar la vivienda.");
//   }
// };
export const deleteSuplente = async (cedulaSuplente) => (await api.delete(`/suplente/${cedulaSuplente}`, { needsAuth: true })).data;

// const updateSuplente = async (
// suplemteEntity
// ) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/suplente`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cedulaSuplente,
//         nombreSuplente,
//         apellidoSuplente,
//         telefonoSuplente,
//       }),
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Error al actualizar el suplente.");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en updateSuplente:", error);
//     throw error;
//   }
// };
export const updateSuplente = async (suplenteEntity) => (await api.put(`/suplente`, suplenteEntity,{ needsAuth: true })).data;

// const postVivienda = async (viviendaEntity, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/vivienda/${idCooperativa}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(viviendaEntity),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postVivienda:", error);
//     throw new Error("Error al enviar los datos de la vivienda");
//   }
// };
export const postVivienda = async (viviendaEntity, idCooperativa) => (await api.post(`/vivienda/${idCooperativa}`, viviendaEntity,{ needsAuth: true })).data;

// const getVivienda = async (nroVivienda) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getVivienda:", error);
//     throw new Error("Error al obtener los datos de la vivienda");
//   }
// };
export const getVivienda = async (nroVivienda) => (await api.get(`/vivienda/${nroVivienda}`,{ needsAuth: true })).data;

// const getAllViviendas = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/vivienda/allViviendas/${idCooperativa}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllViviendas:", error);
//     throw new Error("Error al obtener los datos de las viviendas.");
//   }
// };
export const getAllVivienda = async (idCooperativa) => (await api.get(`/vivienda/allViviendas/${idCooperativa}`,{ needsAuth: true })).data;

// const updateVivienda = async (vivienda) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/vivienda`, {
//       method: "API",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(vivienda),
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Error al actualizar la vivienda");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en updateVivienda:", error);
//     throw error;
//   }
// };
export const updateVivienda = async (vivienda) => (await api.put(`/vivienda`,vivienda,{ needsAuth: true })).data;

// const deleteVivienda = async (nroVivienda) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/vivienda/${nroVivienda}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteVivienda:", error);
//     throw new Error("Error al eliminar la vivienda.");
//   }
// };
export const deleteVivienda = async (nroVivienda) => (await api.delete(`/vivienda/${nroVivienda}`,{ needsAuth: true })).data;

// const getViviendaPorSocio = async (cedulaSocio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/vivienda/socio/${cedulaSocio}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error al obtener la vivienda del socio");
//     }

//     const vivienda = await response.json();
//     return vivienda;
//   } catch (error) {
//     console.error("Error en getViviendaPorSocio:", error);
//     throw new Error(
//       "Error al obtener los datos de la la vivienda por el socio."
//     );
//   }
// };
export const getViviendaPorSocio = async (cedulaSocio) => (await api.get(`/vivienda/socio/${cedulaSocio}`,{ needsAuth: true })).data;

// const getCooperativaPorAdmin = async (id) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/cooperativa/Admin/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error en getCooperativasPorAdmin:", error);
//     throw new Error("Error al obtener los datos de la Cooperativa");
//   }
// };
export const getCooperativaPorAdmin = async (id) => (await api.get(`/cooperativa/Admin/${id}`,{ needsAuth: false })).data;

// const getCooperativaPorSocio = async (cedulaSocio) => {
//   try {
//     const response = await fetch(`${URL}/cooperativa/Socio/${cedulaSocio}`, {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getCooperativasPorSocio:", error);
//     throw new Error("Error al obtener los datos de la Cooperativa");
//   }
// };
export const getCooperativaPorSocio = async (cedulaSocio) => (await api.get(`/cooperativa/Socio/${cedulaSocio}`,{ needsAuth: false })).data;

// const getUr = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/scraping`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // Verifica si la respuesta tiene contenido
//     const responseText = await response.text();

//     // Si la respuesta está vacía, maneja el caso
//     if (!responseText) {
//       throw new Error("La respuesta está vacía.");
//     }

//     // Si la respuesta no es un JSON válido, lanza un error
//     const data = JSON.parse(responseText);

//     if (!response.ok) {
//       throw new Error("La petición ha fallado, el response no es 'ok'");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en getUr:", error);
//     throw new Error("Error al obtener los datos de las UR");
//   }
// };
export const getUr = async () => (await api.get(`/scraping`,{ needsAuth: true })).data;

// const getAllRecibos = async (id) => {
//   try {
//     const token = getToken();

//     const response = await fetch(
//       `${URL}/recibo/getAllRecibosPorCooperativa/${id}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       console.error("Error response:", response);
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllRecibos:", error.message, error.response);
//     throw new Error("Error al obtener los datos de los Recibos.");
//   }
// };
export const getAllRecibos = async (id) => (await api.get(`/recibo/getAllRecibosPorCooperativa/${id}`,{ needsAuth: true })).data;

// const getRecibo = async (nroRecibo) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/recibo/${nroRecibo}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getRecibo:", error);
//     throw new Error("Error al obtener los datos del recibo");
//   }
// };
export const getRecibo = async (nroRecibo) => (await api.get(`/recibo/${nroRecibo}`,{ needsAuth: true })).data;

// const postRecibo = async (
//   recibo
// ) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/recibo`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(recibo),
//     });

//     if (!response.ok) {
//       const errorData = await response.json(); 
//       throw new Error(
//         errorData.message ||
//           "La solicitud ha fallado, la respuesta no es válida"
//       );
//     }

//     const contentType = response.headers.get("Content-Type");
//     if (
//       response.status === 204 ||
//       !contentType ||
//       !contentType.includes("application/json")
//     ) {
//       return null;
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error en postRecibo:", error);
//     return { error: error.message }; // Devolver el mensaje de error específico
//   }
// };
export const postRecibo = async (recibo) => (await api.post(`/recibo`,recibo,{ needsAuth: true })).data;

// const getAllRecibosPorSocio = async (cedulaSocio) => {
//   try {
//     const token = getToken();

//     const response = await fetch(
//       `${URL}/recibo/getAllRecibosPorSocios/${cedulaSocio}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllRecibosPorSocio:", error);
//     throw new Error("Error al obtener los datos de los recibos.");
//   }
// };
export const getAllRecibosPorSocio = async (cedulaSocio) => (await api.get(`/recibo/getAllRecibosPorSocios/${cedulaSocio}`,{ needsAuth: true })).data;

// const getAllAvisosPorUsuario = async (idUsuario) => {
//   try {
//     const token = getToken();

//     const response = await fetch(
//       `${URL}/aviso/getAllAvisosPorUsuario/${idUsuario}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllAvisosPorUsuario:", error);
//     throw new Error("Error al obtener los datos de los Avisos.");
//   }
// };
export const getAllAvisosPorUsuario = async (idUsuario) => (await api.post(`/aviso/getAllAvisosPorUsuario/${idUsuario}`,{ needsAuth: true })).data;

// const postAviso = async (aviso, idAdmin, idUsuario) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/aviso/${idAdmin}/${idUsuario}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(aviso),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postSocio:", error);
//     throw new Error("Error al enviar los datos del aviso");
//   }
// };
export const postAviso = async (aviso, idAdmin, idUsuario) => (await api.post(`/aviso/${idAdmin}/${idUsuario}`,aviso,{ needsAuth: true })).data;

// const postAvisoToAll = async (aviso, idAdmin, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/aviso/All/${idAdmin}/${idCooperativa}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(aviso),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postSocio:", error);
//     throw new Error("Error al enviar los datos del aviso");
//   }
// };
export const postAvisoToAll = async (aviso, idAdmin, idCooperativa) => (await api.post(`/aviso/All/${idAdmin}/${idCooperativa}`,aviso,{ needsAuth: true })).data;

// const postUsuario = async (usuarioEntity) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/usuario`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(usuarioEntity),
//     });

//     if (!response.ok) {
//       throw new Error("Error en la solicitud");
//     }

//     return response;
//   } catch (error) {
//     console.error("Error al enviar la solicitud:", error);
//     throw error;
//   }
// };
export const postUsuario = async (usuarioEntity) => (await api.post(`/usuario`,usuarioEntity,{ needsAuth: true })).data;

// const getAllUsuarios = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/auth/getAllUsers/${idCooperativa}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllUsuarios:", error);
//     throw new Error("Error al obtener los datos de los Usuarios.");
//   }
// };
export const getAllUsuarios = async (idCooperativa) => (await api.get(`/auth/getAllUsers/${idCooperativa}`,{ needsAuth: true })).data;

// const deleteUsuario = async (idMiembro) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/usuario/${idMiembro}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteUsuario:", error);
//     throw new Error("Error al eliminar el usuario.");
//   }
// };
export const deleteUsuario = async (idMiembro) => (await api.delete(`/usuario/${idMiembro}`,{ needsAuth: true })).data;

// const postSubsidio = async (subsidioEntity) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/subsidio`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(subsidioEntity),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Error interno del servidor");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error al crear el subsidio:", error);
//     throw error;
//   }
// };
export const postSubsidio = async (subsidioEntity) => (await api.post(`/subsidio`,subsidioEntity,{ needsAuth: true })).data;

// const getAllSubsidios = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/subsidio/allSubsidios`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllSubsidios:", error);
//     throw new Error("Error al obtener los datos de los subsidios.");
//   }
// };
export const getAllSubsidios = async () => (await api.get(`/subsidio/allSubsidios`,{ needsAuth: true })).data;

// const updateSubsidio = async (
// subsidio
// ) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/subsidio`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(subsidio),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Error al actualizar el subsidio");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en updateSubsidio:", error);
//     throw error;
//   }
// };
export const updateSubsidio = async () => (await api.put(`/subsidio`,subsidio,{ needsAuth: true })).data;

// const deleteSubsidio = async (idSubsidio) => {
//   try {
//     console.log(idSubsidio);
//     const token = getToken();
//     const response = await fetch(`${URL}/subsidio/${idSubsidio}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(
//         `Error en la solicitud de borrado del subsidio: ${errorDetails}`
//       );
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteSubsidio:", error);
//     throw new Error(`Error al eliminar el subsidio: ${error.message}`);
//   }
// };
export const deleteSubsidio = async (idSubsidio) => (await api.delete(`/subsidio/${idSubsidio}`,{ needsAuth: true })).data;

// const getSubsidioVigenteSocio = async (cedulaSocio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/subsidio/socio/${cedulaSocio}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The request failed, response isn't ok");
//     }

//     // Verifica si la respuesta tiene contenido
//     const contentType = response.headers.get("Content-Type");
//     if (!contentType || !contentType.includes("application/json")) {
//       return null; // No hay contenido o no es JSON
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error en get Ultimo subsidio por socio:", error);
//     return null;
//   }
// };
export const getSubsidioVigenteSocio = async (cedulaSocio) => (await api.get(`/subsidio/socio/${cedulaSocio}`,{ needsAuth: true })).data;


// const getReajuste = async (idReajuste) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/reajuste/${idReajuste}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getReajuste:", error);
//     throw new Error("Error al obtener los datos de los reajustes");
//   }
// };
export const getReajuste = async (idReajuste) => (await api.get(`/reajuste/${idReajuste}`,{ needsAuth: true })).data;

// const getAllReajustes = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/reajuste/GetAll/${idCooperativa}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllReajuste:", error);
//     throw new Error("Error al obtener los datos de los reajustes");
//   }
// };
export const getAllReajustes = async (idCooperativa) => (await api.get(`/reajuste/GetAll/${idCooperativa}`,{ needsAuth: true })).data;

// const postReajuste = async (reajuste, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/reajuste/${idCooperativa}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(reajuste),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postReajuste:", error);
//     throw new Error("Error al enviar los datos del reajuste");
//   }
// };
export const postReajuste = async (reajuste, idCooperativa) => (await api.post(`/reajuste/${idCooperativa}`,reajuste,{ needsAuth: true })).data;

// const getUltimoReajuste = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/reajuste`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       // Si la respuesta no es 200, verifica si es 404 (no encontrado)
//       if (response.status === 404) {
//         // Si no hay reajuste, retorna null en vez de lanzar error
//         return null;
//       }
//       // Si el error es otro, lanzar un error
//       throw new Error("La petición falló, respuesta no es correcta");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error en getUltimoReajuste:", error);
//     // Retornar null si hay algún error en la petición para no interrumpir el flujo
//     return null;
//   }
// };
export const getUltimoReajuste = async () => (await api.get(`/reajuste`,{ needsAuth: true })).data;

// const postConvenio = async (convenio, cedulaSocio, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/convenios/${cedulaSocio}/${idCooperativa}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(convenio),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postConvenio:", error);
//     throw new Error("Error al enviar los datos de el convenio");
//   }
// };
export const postConvenio = async (convenio, cedulaSocio, idCooperativa) => (await api.get(`/convenios/${cedulaSocio}/${idCooperativa}`,convenio,{ needsAuth: true })).data;


// const getConvenioById = async (idConvenio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/convenios/${idConvenio}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const contentType = response.headers.get("Content-Type");
//     if (!contentType || !contentType.includes("application/json")) {
//       return null;
//     }

//     if (!response.ok) {
//       throw new Error("La petición ha fallado, la respuesta no es correcta.");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error al obtener convenios vigentes para el socio:", error);
//     return null;
//   }
// };
export const getConvenioById = async (idConvenio) => (await api.get(`/convenios/${idConvenio}`,{ needsAuth: true })).data;

// const getConveniosVigenteSocio = async (cedulaSocio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/convenios/socio/${cedulaSocio}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const contentType = response.headers.get("Content-Type");
//     if (!contentType || !contentType.includes("application/json")) {
//       return null; // No hay contenido o no es JSON
//     }

//     if (!response.ok) {
//       throw new Error("La petición ha fallado, la respuesta no es correcta.");
//     }

//     // Verificar si el cuerpo de la respuesta es null o vacío
//     const data = await response.json();

//     if (!data || data.length === 0) {
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.error("Error al obtener convenios vigentes para el socio:", error);
//     return null;
//   }
// };
export const getConveniosVigenteSocio = async (cedulaSocio) => (await api.get(`/convenios/socio/${cedulaSocio}`,{ needsAuth: true })).data;

// const postIngreso = async (ingreso) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/ingresos`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(ingreso),
//     });

//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en postIngreso:", error);
//     throw new Error("Error al enviar los datos del ingreso");
//   }
// };
export const postIngreso = async (ingreso) => (await api.post(`/ingresos`,ingreso,{ needsAuth: true })).data;

// const deleteIngreso = async (idIngreso) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/ingresos/${idIngreso}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado del Igreso");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteSubsidio:", error);
//     throw new Error("Error al eliminar el ingreso.");
//   }
// };
export const deleteIngreso = async (idIngreso) => (await api.delete(`/ingresos/${idIngreso}`,{ needsAuth: true })).data;

// const updateIngreso = async (subRubro, denominacion, ingreso) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/ingresos`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         subRubro,
//         denominacion,
//         ingreso,
//       }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error("Error al actualizar el ingreso");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en updateIngreso:", error);
//     throw error;
//   }
// };
export const updateIngreso = async (ingreso) => (await api.put(`/ingresos`,ingreso,{ needsAuth: true })).data;

// const getAllIngresos = async (idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/ingresos/allIngresos/${idCooperativa}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllIngresos:", error);
//     throw new Error("Error al obtener los datos de los Ingresos.");
//   }
// };
export const getAllIngresos = async (idCooperativa) => (await api.delete(`/ingresos/allIngresos/${idCooperativa}`,{ needsAuth: true })).data;

// const getAllIngresosByMes = async (fecha, idCooperativa) => {
//   try {
//     const token = getToken();
//     const response = await fetch(
//       `${URL}/ingresos/allIngresosByMes/${fecha}/${idCooperativa}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error("The petition has failed, response isn't ok");
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Error en getAllIngresos:", error);
//     throw new Error("Error al obtener los datos de los Ingresos.");
//   }
// };
export const getAllIngresosByMes = async (fecha, idCooperativa) => (await api.put(`/ingresos/allIngresosByMes/${fecha}/${idCooperativa}`,{ needsAuth: true })).data;

// const deleteConvenio = async (idConvenio) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${URL}/convenios/${idConvenio}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error en la solicitud de borrado del Convenio");
//     }

//     return true;
//   } catch (error) {
//     console.error("Error en deleteConvenio:", error);
//     throw new Error("Error al eliminar el convenio.");
//   }
// };
export const deleteConvenio = async (idConvenio) => (await api.put(`/convenios/${idConvenio}`,{ needsAuth: true })).data;
const updateConvenio = async (convenioEntity) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/convenios`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convenioEntity),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error al actualizar el convenio");
    }

    return data;
  } catch (error) {
    console.error("Error en updateConvenio:", error);
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

    return data;
  } catch (error) {
    console.error("Error en getAllConvenios:", error);
    throw new Error("Error al obtener los datos de los Convenios.");
  }
};

const postEgreso = async (egreso) => {
  try {
    const token = getToken();

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

    return data;
  } catch (error) {
    console.error("Error en getAllEgresos:", error);
    throw new Error("Error al obtener los datos de los Egresos.");
  }
};

const getAllEgresosByMes = async (fecha, idCooperativa) => {
  const fullUrl = `${URL}/egresos/allEgresosByMes/${fecha}/${idCooperativa}`;

  try {
    const token = getToken();
    const response = await fetch(fullUrl, {
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

const getAllEstadosContables = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/estadoContable/allEstadosContables`, {
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
    console.error("Error en getEstadosContables:", error);
    throw new Error("Error al obtener los datos de los Estados contables.");
  }
};

//Interes

const getInteresAnual = async (fecha, idCooperativa) => {
  try {
    const token = getToken();

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
    const response = await fetch(`${URL}/auth/loginMaster`, {
      method: "POST",
      headers: {
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

const postDevolucionCapital = async (devolucionCapital) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucionCapital`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(devolucionCapital),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postDevolucion:", error);
    throw new Error("Error al enviar los datos de la devolucion");
  }
};

const postBalanceAnual = async (fecha, idCooperativa) => {
  try {
    const token = getToken();
    const fechaISO = fecha.toISOString().split("T")[0];

    const response = await fetch(
      `${URL}/balanceAnual/${fechaISO}/${idCooperativa}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Detalles del error: ", errorDetails);
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en postBalanceAnual:", error);
    throw new Error("Error al enviar los datos de postBalanceAnual");
  }
};

const getBalanceAnual = async (idBalance) => {
  try {
    const token = getToken();

    const response = await fetch(`${URL}/balanceAnual/${idBalance}`, {
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
    console.error("Error en GetBalanceAnual:", error);
    throw new Error("Error al enviar los datos de GetBalanceAnual");
  }
};

const getAllBalanceAnual = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/balanceAnual/allBalanceAnual/${idCooperativa}`,
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
    console.error("Error en GetBalanceAnual:", error);
    throw new Error("Error al enviar los datos de GetBalanceAnual");
  }
};

const getDevolucionCapital = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucionCapital/${cedulaSocio}`, {
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
    console.error("Error en getDevolucion:", error);
    throw new Error("Error al recibir los datos de la devolucion");
  }
};

const postPagoDevolucionCapital = async (pagoDevolucionCaptial) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/pagoCapital`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagoDevolucionCaptial),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en postPagoDevolucion:", error);
    throw new Error("Error al enviar los datos del pago devolucion");
  }
};

const getUltimoEstadoContable = async () => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/estadoContable/getUltimoEstadoContable`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = response.headers.get("Content-Type");
    if (
      response.status === 204 ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return null;
    }

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

const getAllInteresAnual = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/interesAnual/getAll/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Verifica el estado de la respuesta

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const data = await response.json();

    // Verifica los datos que se han recibido

    return data;
  } catch (error) {
    console.error("Error en getAllInteresAnual:", error);
    throw new Error("Error al obtener los intereses anuales");
  }
};

const deleteRecibo = async (nroRecibo) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recibo/${nroRecibo}`, {
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
    console.error("Error en deleteSocio:", error);
    throw new Error("Error al eliminar el socio");
  }
};
const getUltimoBalanceAnual = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/balanceAnual/ultimo/${idCooperativa}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response == null) {
      return response;
    }
    if (!response.ok) {
      if (response.status === 404) {
        console.warn("Balance anual no encontrado (404).");
        return null;
      }
      throw new Error(`Error de servidor: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getUltimoBalance:", error);
    return null;
  }
};

const updateUser = async (UpdateUserRequest, cedulaSocio, idCooperativa) => {
  try {
    const response = await fetch(
      `${URL}/auth/update/${cedulaSocio}/${idCooperativa}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateUserRequest),
      }
    );

    if (!response.ok) {
      throw new Error("The request has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw new Error("Error updating user");
  }
};

const postDevolucion = async (devolucion) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(devolucion),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en devolucion:", error);
    throw new Error("Error al enviar los datos de la devolucion");
  }
};

const getAlldevoluciones = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/devolucion/getAllDevoluciones/${idCooperativa}`,
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
    console.error("Error en getAllDevolucion:", error);
    throw new Error("Error al obtener las devoluciones");
  }
};

const getDevolucion = async (idDevolucion) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucion/${idDevolucion}`, {
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
    console.error("Error en get Devolucion:", error);
    throw new Error("Error al obtener la devolucion");
  }
};

const getDevolucionBySocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucion/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const contentType = response.headers.get("Content-Type");
    if (
      response.status === 204 ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en get Devolucion:", error);
    throw new Error("Error al obtener la devolucion");
  }
};

const updateDevolucion = async (devolucion) => {
  try {
    console.log("API", devolucion);
    const token = getToken();
    const response = await fetch(
      `${URL}/devolucion`,

      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(devolucion),
      }
    );

    if (!response.ok) {
      throw new Error("The request has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in updateDevoluciones:", error);
    throw new Error("Error updating devoluciones");
  }
};

const deleteDevolucion = async (idDevolucion) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/devolucion/${idDevolucion}`, {
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
    console.error("Error en deleteDevolucion:", error);
    throw new Error("Error al eliminar la devolucion");
  }
};

const postRecargo = async (recargo) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recargo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recargo),
    });
    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en recargo:", error);
    throw new Error("Error al enviar los datos de el recargo");
  }
};

const deleteRecargo = async (idRecargo) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recargo/${idRecargo}`, {
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
    console.error("Error en deleterecargo:", error);
    throw new Error("Error al eliminar el recargo");
  }
};

const getAllRecargos = async (idCooperativa) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/recargo/getAllRecargos/${idCooperativa}`,
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
    console.error("Error en getAllRecargos:", error);
    throw new Error("Error al obtener los Recargos");
  }
};

const updateRecargo = async (recargo) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${URL}/recargo`,

      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recargo),
      }
    );

    if (!response.ok) {
      throw new Error("The request has failed, response isn't ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in updateRecargos:", error);
    throw new Error("Error updating Recargos");
  }
};

const getRecargo = async (idRecargo) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recargo/${idRecargo}`, {
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
    console.error("Error en get recargo:", error);
    throw new Error("Error al obtener el recargo");
  }
};

const getRecargoBySocio = async (cedulaSocio) => {
  try {
    const token = getToken();
    const response = await fetch(`${URL}/recargo/socio/${cedulaSocio}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("The petition has failed, response isn't ok");
    }

    const contentType = response.headers.get("Content-Type");
    if (
      response.status === 204 ||
      !contentType ||
      !contentType.includes("application/json")
    ) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en get Recargo:", error);
    throw new Error("Error al obtener el Recargo");
  }
};

export {
  Login,
  getSocio,
  getRecibosImpagosSocio,
  // postSocio,
  // getAllSocios,
  // updateSocio,
  // deleteSocio,
  // postSuplente,
  // getAllSuplentes,
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
  getSubsidioVigenteSocio,
  deleteEgreso,
  deleteIngreso,
  getAllIngresos,
  getAllEgresos,
  postConvenio,
  getConveniosVigenteSocio,
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
  LoginMaster,
  postEstadoContable,
  getAllEstadosContables,
  getInteresAnual,
  loginMaster,
  // getAllSociosImpagos,
  postDevolucionCapital,
  postPagoDevolucionCapital,
  getDevolucionCapital,
  getUltimoEstadoContable,
  getAllInteresAnual,
  getAllIngresosByMes,
  getAllEgresosByMes,
  deleteRecibo,
  postAvisoToAll,
  getAllAvisosPorUsuario,
  postBalanceAnual,
  getBalanceAnual,
  getAllBalanceAnual,
  getAllReajustes,
  getUltimoBalanceAnual,
  updateUser,
  registerMaster,
  postDevolucion,
  getAlldevoluciones,
  updateDevolucion,
  getDevolucion,
  getDevolucionBySocio,
  deleteDevolucion,
  postRecargo,
  deleteRecargo,
  getAllRecargos,
  updateRecargo,
  getRecargo,
  getRecargoBySocio,
  getConvenioById,
};
