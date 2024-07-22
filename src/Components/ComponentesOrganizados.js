import React, { useEffect, useState } from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
import AltaSocio from "./Formularios/Socios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/Viviendas/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/Socios/ModificarSocio/ModificarSocio";
import ModificarVivienda from "./Formularios/Viviendas/ModificarVivienda/ModificarVivienda";
const ComponentesOrganizados = ({ identificador }) => {
  switch (identificador) {
    case 0: {
      return <ListadoSocio />;
    }
    case 1: {
      return <ListadoViviendas />;
    }
    case 2: {
      return <AltaVivienda />;
    }
    case 3: {
      return <AltaSocio />;
    }
    case 4: {
      return <ModificarSocio />;
    }
    case 5: {
      return <ModificarVivienda />;
    }
  }
};

export default ComponentesOrganizados;
