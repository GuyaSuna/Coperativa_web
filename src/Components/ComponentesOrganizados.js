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

const ComponentesOrganizados = ({
  identificador,
  setIdentificadorComponente,
}) => {
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [nroVivienda, setNroVivienda] = useState(0);
  const [socioRecibo, setSocioRecibo] = useState({});
  const [suplente, setSuplente] = useState({});

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
      return <AltaVivienda setIdentificadorComponente={setIdentificadorComponente} />;
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
      return <AltaRecibo Socio={socioRecibo} />;
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
  }
};

export default ComponentesOrganizados;
