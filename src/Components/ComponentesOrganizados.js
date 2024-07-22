import React , {useEffect , useState} from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
import AltaSocio from "./Formularios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/ModificarSocio/ModificarSocio";
const ComponentesOrganizados = ({identificador}) => {

    console.log(identificador)

    return (
        <>
         { identificador == 0 &&
        <ListadoSocio/>
     }
         { identificador == 1 &&
        <ListadoViviendas/>
     }
         { identificador == 2 &&
        <AltaVivienda/>
     }
         { identificador == 3 &&
        <AltaSocio/>
     }
         { identificador == 4 &&
        <ModificarSocio/>
     }
     </>
    );
  };
  
  export default ComponentesOrganizados;
  