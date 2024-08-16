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
  const [interes , setInteres] = useState();
  const [capital , setCapital] = useState();
  const [subsidio, setSubsidio] = useState({});

  switch (identificador) {
    case 0: {
      return (
        <ListadoSocio
          setCedulaSocio={setCedulaSocio}
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
      return <ModificarSocio cedulaSocioParam={cedulaSocio} />;
    }
    case 5: {
      return <ModificarVivienda nroViviendaParam={nroVivienda} />;
    }
    case 6: {
      return <AltaRecibo Socio={socioRecibo} ur={ur} interesParm={interes} capitalParm={capital} />;
    }
    case 7: {
      return <AltaSuplente />;
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
      return <ModificarSuplente suplenteParam={suplente} />;
    }
    case 11: {
      return (
        <ListadoRecibos
          setIdentificadorComponente={setIdentificadorComponente}
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
      return <AltaUsuario />;
    }
    case 14: {
      return <MuestraCalculos  setInteres={setInteres} setCapital={setCapital}/>;
    }
    case 15: {
      return <ListadoInformes />;
    }
    case 16: {
      return <AltaSubsidio />;
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
      return <AltaConvenio />;
    }
    case 19: {
      return (
        <ModificarSubsidio
          subsidioParam={subsidio}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
  }
};

export default ComponentesOrganizados;
