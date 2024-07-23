import React, { useEffect, useState } from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
import AltaSocio from "./Formularios/Socios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/Viviendas/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/Socios/ModificarSocio/ModificarSocio";
import ModificarVivienda from "./Formularios/Viviendas/ModificarVivienda/ModificarVivienda";

const ComponentesOrganizados = ({
  identificador,
  setIdentificadorComponente,
}) => {
  const [cedulaSocio, setCedulaSocio] = useState(0);
  const [nroVivienda, setNroVivienda] = useState(0);

  switch (identificador) {
    case 0: {
      return (
        <ListadoSocio
          setCedulaSocio={setCedulaSocio}
          setIdentificadorComponente={setIdentificadorComponente}
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
      return <AltaSocio />;
    }
    case 4: {
      return <ModificarSocio cedulaSocioParam={cedulaSocio} />;
    }
    case 5: {
      return <ModificarVivienda nroViviendaParam={nroVivienda} />;
    }
  }
};

export default ComponentesOrganizados;
