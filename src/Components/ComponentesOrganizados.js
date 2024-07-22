import React , {useEffect , useState} from "react";
import ListadoSocio from "./Listados/ListadoSocios/ListadoSocio";
import ListadoViviendas from "./Listados/ListadoViviendas/ListadoViviendas";
import AltaSocio from "./Formularios/Socios/AltaSocio/AltaSocio";
import AltaVivienda from "./Formularios/Viviendas/AltaVivienda/AltaVivienda";
import ModificarSocio from "./Formularios/Socios/ModificarSocio/ModificarSocio";
const ComponentesOrganizados = ({identificador , setCedulaSocio, cedulaSocio , setIdentificadorComponente}) => {

    switch (identificador){
        case 0:{
            return <ListadoSocio setCedulaSocio={setCedulaSocio} setIdentificadorComponente={setIdentificadorComponente}/>
        }
        case 1:{
            return <ListadoViviendas/>
        }
        case 2:{
            return <AltaVivienda/>
        }
        case 3:{
            return <AltaSocio/> 
        }
        case 4:{
            return <ModificarSocio cedulaSocioParam={cedulaSocio}/>
        }
    }
  };
  
  export default ComponentesOrganizados;
  