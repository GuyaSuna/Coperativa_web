import React, { useEffect, useState } from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
// import ListadoSuplentes from "./Listados/ListadoSuplentes/ListadoSuplentes";
import AltaSocio from "./Formularios/Socios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/Viviendas/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/Socios/ModificarSocio/ModificarSocio";
import ModificarVivienda from "./Formularios/Viviendas/ModificarVivienda/ModificarVivienda";
import AltaRecibo from "./Formularios/Recibos/AltaRecibo/AltaRecibo";
import AltaSuplente from "./Formularios/Suplentes/AltaSuplente";
import AltaAviso from "./Formularios/Avisos/AltaAviso";
const ComponentesOrganizados = ({
  identificador,
  setIdentificadorComponente,
}) => {
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [nroVivienda, setNroVivienda] = useState(0);
  const [socioRecibo , setSocioRecibo] = useState({});

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
          setNroVivienda={setNroVivienda}
          setIdentificadorComponente={setIdentificadorComponente}
        />
      );
    }
    case 2: {
      return <AltaVivienda />;
    }
    case 3: {
      return <AltaSocio setIdentificadorComponente={setIdentificadorComponente}/>;
    }
    case 4: {
      return <ModificarSocio cedulaSocioParam={cedulaSocio} />;
    }
    case 5: {
      return <ModificarVivienda nroViviendaParam={nroVivienda} />;
    }
    case 6: {
      return <AltaRecibo Socio={socioRecibo} />;
    }
    case 7: {
      return <AltaSuplente />;
    }
    case 8 :{
      return <AltaAviso/>
    }
  }
};

export default ComponentesOrganizados;
