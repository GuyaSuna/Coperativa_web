import api from "./apiConfiguration";

export const registerMaster = async (bodymaster) => (await api.post(`/auth/registerMaster`, bodymaster,{ needsAuth: false })).data;

export const Login = async (username, password) => {
  const body = { username, password };
  const data = (await api.post(`/auth/login`, body, { needsAuth: false })).data;

  if (data.token) {
    document.cookie = `token=${data.token}; path=/; max-age=1440`;
  } else {
    throw new Error("No se recibió el token en la respuesta.");
  }

  return data;
};

export const LoginMaster = async (username, password) => {
  const body = { username, password };
  const data = (await api.post(`/auth/loginMaster`, body, { needsAuth: false })).data;

  if (data.token) {
    document.cookie = `token=${data.token}; path=/; max-age=1440`;
  } else {
    throw new Error("No se recibió el token en la respuesta.");
  }

  return data;
};

export const register = async (RegisterRequest, cedulaSocio, idCooperativa) => (await api.post(`/auth/register/${cedulaSocio}/${idCooperativa}`, RegisterRequest,{ needsAuth: false })).data;

export const updateAdministrador = async (administradorEntity) => (await api.put(`/administrador`, administradorEntity,{ needsAuth: false })).data;

export const getAllCooperativas = async () => (await api.get(`/cooperativa/allCooperativas`, { needsAuth: true })).data;

export const postCooperativa = async (cooperativaEntity) => (await api.post(`/cooperativa`,cooperativaEntity ,{ needsAuth: true })).data;

export const updateCooperativa = async (cooperativaEntity) => (await api.put(`/cooperativa`, cooperativaEntity, { needsAuth: true})).data;

export const getUser = async (id) => (await api.get(`/auth/getUser${id}`, { needsAuth: false })).data;

export const getSocio = async (cedulaSocio) => (await api.get(`/socio/${cedulaSocio}`, { needsAuth: true })).data;

export const getRecibosImpagosSocio = async (cedulaSocio, idCooperativa) => (await api.get(`/recibo/getRecibosImpagos/${cedulaSocio}/${idCooperativa}`, { needsAuth: true })).data;

export const getAllSocios = async (idCooperativa) => (await api.get(`/socio/allSocios/${idCooperativa}`, { needsAuth: true })).data;

export const getAllSociosImpagos = async (idCooperativa) => (await api.get(`/socio/SociosImpagos/${idCooperativa}`, { needsAuth: true })).data;

export const postSocio = async (socioEntity, nroVivienda , idCooperativa) => (await api.post(`/socio/${nroVivienda}/${idCooperativa}`,socioEntity, { needsAuth: true })).data;

export const updateSocio = async (socioEntity, idVivienda) => (await api.put(`/socio/${socioEntity.cedulaSocio}/${idVivienda}`, socioEntity ,{ needsAuth: true })).data;

export const deleteSocio = async (cedulaSocio, idCooperativa) => (await api.delete(`/socio/${cedulaSocio}/${idCooperativa}`, { needsAuth: true })).data;

export const postSuplente = async (suplenteEntity, cedulaSocio) => (await api.post(`/suplente/${cedulaSocio}`, suplenteEntity, { needsAuth: true })).data;

export const getAllSuplentes = async () => (await api.get(`/suplente/allSuplentes`, { needsAuth: true })).data;

export const getSuplente = async (cedulaSuplente) => (await api.get(`/suplente/${cedulaSuplente}`, { needsAuth: true })).data;

export const deleteSuplente = async (cedulaSuplente) => (await api.delete(`/suplente/${cedulaSuplente}`, { needsAuth: true })).data;

export const updateSuplente = async (suplenteEntity) => (await api.put(`/suplente`, suplenteEntity,{ needsAuth: true })).data;

export const postVivienda = async (viviendaEntity, idCooperativa) => (await api.post(`/vivienda/${idCooperativa}`, viviendaEntity,{ needsAuth: true })).data;

export const getVivienda = async (nroVivienda) => (await api.get(`/vivienda/${nroVivienda}`,{ needsAuth: true })).data;

export const getAllViviendas = async (idCooperativa) => (await api.get(`/vivienda/allViviendas/${idCooperativa}`,{ needsAuth: true })).data;

export const updateVivienda = async (vivienda) => (await api.put(`/vivienda`,vivienda,{ needsAuth: true })).data;

export const deleteVivienda = async (nroVivienda) => (await api.delete(`/vivienda/${nroVivienda}`,{ needsAuth: true })).data;

export const getViviendaPorSocio = async (cedulaSocio) => (await api.get(`/vivienda/socio/${cedulaSocio}`,{ needsAuth: true })).data;

export const getCooperativaPorAdmin = async (id) => (await api.get(`/cooperativa/Admin/${id}`,{ needsAuth: false })).data;

export const getCooperativaPorSocio = async (cedulaSocio) => (await api.get(`/cooperativa/Socio/${cedulaSocio}`,{ needsAuth: false })).data;

export const getUr = async () => (await api.get(`/scraping`,{ needsAuth: true })).data;

export const getAllRecibos = async (id) => (await api.get(`/recibo/getAllRecibosPorCooperativa/${id}`,{ needsAuth: true })).data;

export const getRecibo = async (nroRecibo) => (await api.get(`/recibo/${nroRecibo}`,{ needsAuth: true })).data;

export const postRecibo = async (recibo) => (await api.post(`/recibo`,recibo,{ needsAuth: true })).data;

export const getAllRecibosPorSocio = async (cedulaSocio) => (await api.get(`/recibo/getAllRecibosPorSocios/${cedulaSocio}`,{ needsAuth: true })).data;

export const getAllAvisosPorUsuario = async (idUsuario) => (await api.post(`/aviso/getAllAvisosPorUsuario/${idUsuario}`,{ needsAuth: true })).data;

export const postAviso = async (aviso, idAdmin, idUsuario) => (await api.post(`/aviso/${idAdmin}/${idUsuario}`,aviso,{ needsAuth: true })).data;

export const postAvisoToAll = async (aviso, idAdmin, idCooperativa) => (await api.post(`/aviso/All/${idAdmin}/${idCooperativa}`,aviso,{ needsAuth: true })).data;

export const postUsuario = async (usuarioEntity) => (await api.post(`/usuario`,usuarioEntity,{ needsAuth: true })).data;

export const getAllUsuarios = async (idCooperativa) => (await api.get(`/auth/getAllUsers/${idCooperativa}`,{ needsAuth: true })).data;

export const deleteUsuario = async (idMiembro) => (await api.delete(`/usuario/${idMiembro}`,{ needsAuth: true })).data;

export const postSubsidio = async (subsidioEntity) => (await api.post(`/subsidio`,subsidioEntity,{ needsAuth: true })).data;

export const getAllSubsidios = async () => (await api.get(`/subsidio/allSubsidios`,{ needsAuth: true })).data;

export const updateSubsidio = async () => (await api.put(`/subsidio`,subsidio,{ needsAuth: true })).data;

export const deleteSubsidio = async (idSubsidio) => (await api.delete(`/subsidio/${idSubsidio}`,{ needsAuth: true })).data;

export const getSubsidioVigenteSocio = async (cedulaSocio) => (await api.get(`/subsidio/socio/${cedulaSocio}`,{ needsAuth: true })).data;

export const getReajuste = async (idReajuste) => (await api.get(`/reajuste/${idReajuste}`,{ needsAuth: true })).data;

export const getAllReajustes = async (idCooperativa) => (await api.get(`/reajuste/GetAll/${idCooperativa}`,{ needsAuth: true })).data;

export const postReajuste = async (reajuste, idCooperativa) => (await api.post(`/reajuste/${idCooperativa}`,reajuste,{ needsAuth: true })).data;

export const getUltimoReajuste = async () => (await api.get(`/reajuste`,{ needsAuth: true })).data;

export const postConvenio = async (convenio, cedulaSocio, idCooperativa) => (await api.get(`/convenios/${cedulaSocio}/${idCooperativa}`,convenio,{ needsAuth: true })).data;

export const getConvenioById = async (idConvenio) => (await api.get(`/convenios/${idConvenio}`,{ needsAuth: true })).data;

export const getConveniosVigenteSocio = async (cedulaSocio) => (await api.get(`/convenios/socio/${cedulaSocio}`,{ needsAuth: true })).data;

export const postIngreso = async (ingreso) => (await api.post(`/ingresos`,ingreso,{ needsAuth: true })).data;

export const deleteIngreso = async (idIngreso) => (await api.delete(`/ingresos/${idIngreso}`,{ needsAuth: true })).data;

export const updateIngreso = async (ingreso) => (await api.put(`/ingresos`,ingreso,{ needsAuth: true })).data;

export const getAllIngresos = async (idCooperativa) => (await api.delete(`/ingresos/allIngresos/${idCooperativa}`,{ needsAuth: true })).data;

export const getAllIngresosByMes = async (fecha, idCooperativa) => (await api.put(`/ingresos/allIngresosByMes/${fecha}/${idCooperativa}`,{ needsAuth: true })).data;

export const deleteConvenio = async (idConvenio) => (await api.put(`/convenios/${idConvenio}`,{ needsAuth: true })).data;

export const updateConvenio = async (convenioEntity) => (await api.put(`/convenios`,convenioEntity,{ needsAuth: true })).data;

export const getAllConvenios = async (idCooperativa) => (await api.get(`/convenios/allConvenios/${idCooperativa}`, { needsAuth: true })).data;
  
export const postEgreso = async (egreso) => (await api.post(`/egresos`, egreso, { needsAuth: true })).data;
  
export const deleteEgreso = async (idEgreso) => (await api.delete(`/egresos/${idEgreso}`, { needsAuth: true })).data;
  
export const updateEgreso = async (subRubro, denominacion, egreso) => (await api.put(`/egresos`, { subRubro, denominacion, egreso }, { needsAuth: true })).data;
  
export const getAllEgresos = async (idCooperativa) => (await api.get(`/egresos/allEgresos/${idCooperativa}`, { needsAuth: true })).data;

export const getAllEgresosByMes = async (fecha, idCooperativa) => (await api.get(`/egresos/allEgresosByMes/${fecha}/${idCooperativa}`, { needsAuth: true })).data;
  
export const postCapitalInteres = async (CapitalInteresList, idCooperativa) => (await api.post(`/CapitalInteres/${idCooperativa}`, CapitalInteresList, { needsAuth: true })).data;
  
export const postEstadoContable = async (estadoContableEntity, idCooperativa) => (await api.post(`/estadoContable/${idCooperativa}`, estadoContableEntity, { needsAuth: true })).data;
  
export const getAllEstadosContables = async () => (await api.get(`/estadoContable/allEstadosContables`, { needsAuth: true })).data;
  
export const getInteresAnual = async (fecha, idCooperativa) => (await api.get(`/interesAnual/${fecha}/${idCooperativa}`, { needsAuth: true })).data;
  
export const loginMaster = async (MasterData) => (await api.post(`/auth/loginMaster`, MasterData, { needsAuth: false })).data;
  
export const postDevolucionCapital = async (devolucionCapital) => (await api.post(`/devolucionCapital`, devolucionCapital, { needsAuth: true })).data;

export const postBalanceAnual = async (fecha, idCooperativa) => {
  const fechaISO = fecha.toISOString().split("T")[0];
  return (await api.post(`/balanceAnual/${fechaISO}/${idCooperativa}`, {}, { needsAuth: true })).data;
};

export const getBalanceAnual = async (idBalance) => (await api.get(`/balanceAnual/${idBalance}`, { needsAuth: true })).data;
  
export const getAllBalanceAnual = async (idCooperativa) => (await api.get(`/balanceAnual/allBalanceAnual/${idCooperativa}`, { needsAuth: true })).data;
  
export const getDevolucionCapital = async (cedulaSocio) =>(await api.get(`/devolucionCapital/${cedulaSocio}`, { needsAuth: true })).data;
  
export const postPagoDevolucionCapital = async (pagoDevolucionCapital) => (await api.post(`/pagoCapital`, pagoDevolucionCapital, { needsAuth: true })).data;

export const getUltimoEstadoContable = async () =>(await api.get(`/estadoContable/getUltimoEstadoContable`, { needsAuth: true })).data;
  
export const getAllInteresAnual = async (idCooperativa) =>(await api.get(`/interesAnual/getAll/${idCooperativa}`, { needsAuth: true })).data;

export const deleteRecibo = async (nroRecibo) =>(await api.delete(`/recibo/${nroRecibo}`, { needsAuth: true })).data;
  
export const getUltimoBalanceAnual = async (idCooperativa) =>(await api.get(`/balanceAnual/ultimo/${idCooperativa}`, { needsAuth: true })).data;
  
export const updateUser = async (UpdateUserRequest, cedulaSocio, idCooperativa) =>(await api.put(`/auth/update/${cedulaSocio}/${idCooperativa}`, UpdateUserRequest)).data;
  
export const postDevolucion = async (devolucion) =>  (await api.post(`/devolucion`, devolucion, { needsAuth: true })).data;

export const getAlldevoluciones = async (idCooperativa) => (await api.get(`/devolucion/getAllDevoluciones/${idCooperativa}`, { needsAuth: true })).data;
 
export const getDevolucion = async (idDevolucion) =>(await api.get(`/devolucion/${idDevolucion}`, { needsAuth: true })).data;
  
export const getDevolucionBySocio = async (cedulaSocio) =>(await api.get(`/devolucion/socio/${cedulaSocio}`, { needsAuth: true })).data;
  
export const updateDevolucion = async (devolucion) =>  (await api.put(`/devolucion`, devolucion, { needsAuth: true })).data;

export const deleteDevolucion = async (idDevolucion) =>  (await api.delete(`/devolucion/${idDevolucion}`, { needsAuth: true })).data;

export const postRecargo = async (recargo) =>  (await api.post(`/recargo`, recargo, { needsAuth: true })).data;

export const deleteRecargo = async (idRecargo) =>  (await api.delete(`/recargo/${idRecargo}`, { needsAuth: true })).data;

export const getAllRecargos = async (idCooperativa) => (await api.get(`/recargo/getAllRecargos/${idCooperativa}`, { needsAuth: true })).data;
 
export const updateRecargo = async (recargo) =>  (await api.put(`/recargo`, recargo, { needsAuth: true })).data;

export const getRecargo = async (idRecargo) => (await api.get(`/recargo/${idRecargo}`, { needsAuth: true })).data;
 
export const getRecargoBySocio = async (cedulaSocio) => (await api.get(`/recargo/socio/${cedulaSocio}`, { needsAuth: true })).data;
 

