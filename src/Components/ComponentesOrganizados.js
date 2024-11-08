import React, { useEffect, useState } from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
import AltaSocio from "./Formularios/Socios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/Viviendas/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/Socios/ModificarSocio/ModificarSocio";
import ModificarVivienda from "./Formularios/Viviendas/ModificarVivienda/ModificarVivienda";
import AltaRecibo from "./Formularios/Recibos/AltaRecibo/AltaRecibo";
import AltaAviso from "./Formularios/Avisos/AltaAviso";
import AltaSuplente from "./Formularios/Suplentes/AltaSuplente/AltaSuplente";
import ListadoSuplentes from "./Listados/ListadoSuplentes/ListadoSuplentes";
import ModificarSuplente from "./Formularios/Suplentes/ModificarSuplente/ModificarSuplente";
import ListadoRecibos from "./Listados/ListadoRecibos/listadoRecibos";
import ListadoUsuario from "./Listados/ListadoUsuarios/listadoUsuario";
import AltaUsuario from "./Formularios/Usuarios/AltaUsuarios/altaUsuarios";
import ListadoInformes from "./Listados/ListadoInformes/ListadoInformes";
import MuestraCalculos from "./Formularios/FormularioInteresCapital/MuestraCalculo";
import AltaSubsidio from "./Formularios/Subsidio/AltaSubsidio/AltaSubsidio";
import ListadoSubsidios from "./Listados/ListadoSubsidios/ListadoSubsidios";
import AltaConvenio from "./Formularios/Convenios/AltaConvenio";
import ModificarSubsidio from "./Formularios/Subsidio/ModificarSubsidio/ModificarSubsidio";
import AltaIngreso from "./Formularios/Ingresos/AltaIngresos/AltaIngresos";
import ModificarIngreso from "./Formularios/Ingresos/ModificarIngresos/ModificarIngresos";
import AltaEgreso from "./Formularios/Egresos/AltaEgresos/AltaEgresos";
import ModificarEgreso from "./Formularios/Egresos/ModificarEgresos/modificarEgresos";
import ListadoIngresos from "./Listados/ListadoIngresos/listadoIngresos";
import ListadoEgresos from "./Listados/ListadoEgresos/listadoEgresos";
import ListadoConvenio from "./Listados/ListadoConvenio/ListadoConvenio";
import ListadoCooperativa from "./Listados/ListadoCooperativa/listaCooperativa";
import AltaCooperativa from "./Formularios/Cooperativas/AltaCooperativa/AltaCooperativa";
import ModificarCooperativa from "./Formularios/Cooperativas/ModificarCooperativa/ModificarCooperativa";
import AltaAdministrador from "./Formularios/Administradores/AltaAdministrador/altaAdministrador";
import AltaReajuste from "./Formularios/Reajustes/AltaReajustes/AltaReajustes";
import BalanceAnual from "./Formularios/BalanceAnual/balanceAnual";
import AltaEstadoContable from "./Formularios/EstadosContables/AltaEstadoContable";
import InteresAnual from "./Informes/InteresAnual";
import ListadoEstadoContables from "./Listados/ListadoEstadosContables/ListadoEstadosContables";
import DevolucionCapital from "./Formularios/DevolucionCapital/DevolucionCapital";
import PagoDevolucionCapitalForm from "./Formularios/PagoDevolucionCapital/PagoDevolucionCapital";
import InformesUsuario from "./UsuarioDashboard/InformesUsuario";
import UsuarioDashboard from "./UsuarioDashboard/UsuarioDashboard";
import ListadoInteresAnual from "./Listados/ListadoInteresAnual/listadoInteresAnual";
import ListadoBalanceAnual from "./Listados/ListadoBalanceAnual/listadoBalanceAnual";
import DetallesCooperativa from "./DetallesCooperativa";
import ListadoReajustes from "./Listados/ListadoReajuste/listadoReajuste";
import ModificarUsuario from "./Formularios/Usuarios/ModificarUsuario/modificarUsuario";
import AltaDevolucion from "./Formularios/Devolucion/AltaDevolucion/AltaDevolucion";
import ListadoDevoluciones from "./Listados/ListaDevoluciones/listadoDevoluciones";
import ModificarDevolucion from "./Formularios/Devolucion/ModificarDevolucion/ModificarDevolucion";
import AltaRecargo from "./Formularios/Recargos/AltaRecargos.js/AltaRecargo";
import ListadoRecargos from "./Listados/ListadoRecargos/listadoRecargos";
import ModificarRecargo from "./Formularios/Recargos/ModificarRecargos/ModificarRecargos";
import UpdateConvenio from "./Formularios/Convenios/ModificarConvenio/ModificarConvenio";

const ComponentesOrganizados = ({
  identificador,
  setIdentificadorComponente,
  ur,
}) => {
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [nroVivienda, setNroVivienda] = useState(0);
  const [socioRecibo, setSocioRecibo] = useState({});
  const [suplente, setSuplente] = useState({});
  const [usuario, setUsuario] = useState({});
  const [vivienda, setVivienda] = useState({});
  const [socio, setSocio] = useState({});
  const [interes, setInteres] = useState();
  const [capital, setCapital] = useState();
  const [subsidio, setSubsidio] = useState({});
  const [ingreso, setIngreso] = useState({});
  const [egreso, setEgreso] = useState({});
  const [convenio, setConvenio] = useState({});
  const [cooperativa, setCooperativa] = useState({});
  const [IdDevolucion, setIdDevolucion] = useState(0);
  const [idRecargo, setIdRecargo] = useState(0);

  //Cambiar a futuro esto jaja
  //utilizar diferentes rutas

  switch (identificador) {
    case 0: {
      return (
        <ListadoSocio
          setSocio={setSocio}
          setIdentificadorComponente={setIdentificadorComponente}
          setSocioRecibo={setSocioRecibo}
        />
      );
    }
    case 1: {
      return (
        <ListadoViviendas
          setVivienda={setVivienda}
          setNroVivienda={setNroVivienda}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 2: {
      return (
        <AltaVivienda setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 3: {
      return (
        <AltaSocio setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 4: {
      return (
        <ModificarSocio
          socio={socio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 5: {
      return <ModificarVivienda nroViviendaParam={nroVivienda} />;
    }
    case 6: {
      return (
        <AltaRecibo
          Socio={socioRecibo}
          ur={ur}
          interesParm={interes}
          capitalParm={capital}
        />
      );
    }
    case 7: {
      return (
        <AltaSuplente setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 8: {
      return <AltaAviso />;
    }
    case 9: {
      return (
        <ListadoSuplentes
          setIdentificadorComponente={setIdentificadorComponente}
          setSuplente={setSuplente}
          setSocio={setSocio}
        />
      );
    }
    case 10: {
      return (
        <ModificarSuplente
          setIdentificadorComponente={setIdentificadorComponente}
          suplenteParam={suplente}
        />
      );
    }
    case 11: {
      return (
        <ListadoRecibos
          setIdentificadorComponente={setIdentificadorComponente}
          ur={ur}
        />
      );
    }
    case 12: {
      return (
        <ListadoUsuario
          setIdentificadorComponente={setIdentificadorComponente}
          setUsuario={setUsuario}
        />
      );
    }
    case 13: {
      return (
        <AltaUsuario setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 14: {
      return (
        <MuestraCalculos
          setInteres={setInteres}
          setCapital={setCapital}
          cooperativa={cooperativa}
        />
      );
    }
    case 15: {
      return <ListadoInformes />;
    }
    case 16: {
      return (
        <AltaSubsidio setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 17: {
      return (
        <ListadoSubsidios
          setSubsidio={setSubsidio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 18: {
      return (
        <AltaConvenio
          ur={ur}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 19: {
      return (
        <ModificarSubsidio
          subsidioParam={subsidio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 20: {
      return (
        <ListadoIngresos
          setIdentificadorComponente={setIdentificadorComponente}
          setIngreso={setIngreso}
        />
      );
    }
    case 21: {
      return (
        <ListadoEgresos
          setIdentificadorComponente={setIdentificadorComponente}
          setEgreso={setEgreso}
        />
      );
    }
    case 22: {
      return (
        <AltaIngreso setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 23: {
      return <ModificarIngreso ingresoData={ingreso} />;
    }
    case 24: {
      return (
        <AltaEgreso setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 25: {
      <ModificarEgreso egresoData={egreso} />;
    }
    case 26: {
      return (
        <ListadoConvenio
          setConvenio={setConvenio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 27: {
      return (
        <ListadoCooperativa
          setCooperativa={setCooperativa}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 28: {
      return (
        <AltaCooperativa
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 29: {
      return (
        <ModificarCooperativa
          cooperativa={cooperativa}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 30: {
      return (
        <AltaAdministrador
          cooperativa={cooperativa}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 31: {
      return (
        <AltaReajuste
          ur={ur}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 32: {
      return (
        <BalanceAnual setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 33: {
      return (
        <AltaEstadoContable
          cooperativa={cooperativa}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 34: {
      return (
        <InteresAnual setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 35: {
      return (
        <ListadoEstadoContables
          cooperativa={cooperativa}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 37: {
      return (
        <UsuarioDashboard
          ur={ur}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 38: {
      return (
        <InformesUsuario
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 39: {
      return (
        <DevolucionCapital
          socio={socio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 40: {
      return (
        <PagoDevolucionCapitalForm
          socio={socio}
          ur={ur}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 41: {
      return (
        <ListadoInteresAnual
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 42: {
      return (
        <ListadoBalanceAnual
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 43: {
      return (
        <DetallesCooperativa
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 44: {
      return (
        <ListadoReajustes
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 45: {
      return <ModificarUsuario usuario={usuario} />;
    }
    case 46: {
      return (
        <AltaDevolucion
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 47: {
      return (
        <ListadoDevoluciones
          setIdentificadorComponente={setIdentificadorComponente}
          setIdDevolucion={setIdDevolucion}
        />
      );
    }
    case 48: {
      return (
        <ModificarDevolucion
          idDevolucionParam={IdDevolucion}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 49: {
      return (
        <AltaRecargo setIdentificadorComponente={setIdentificadorComponente} />
      );
    }
    case 50: {
      return (
        <ListadoRecargos
          setIdRecargo={setIdRecargo}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 51: {
      return (
        <ModificarRecargo
          setIdentificadorComponente={setIdentificadorComponente}
          idRecargoParam={idRecargo}
        />
      );
    }
    case 52: {
      return (
        <UpdateConvenio
          convenio={convenio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
  }
};

export default ComponentesOrganizados;
