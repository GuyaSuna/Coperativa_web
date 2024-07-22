import React , {useEffect , useState} from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";

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
    {!identificador && 
     <div> Cargando </div>
     }
     </>
    );
  };
  
  export default ComponentesOrganizados;
  