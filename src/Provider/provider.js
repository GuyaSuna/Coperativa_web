'use client'
import React , {createContext , useState} from "react";

const MiembroContext = createContext();

const MiembroProvider =  ({children}) => {

    const[miembro , setMiembro] = useState(null);

    const loginMiembro = (DatosMiembro) => {
        setMiembro(DatosMiembro)
    }

    const logoutMiembro = () =>{
        setMiembro(null)
    }

    return (
        <MiembroContext.Provider	value={{miembro, loginMiembro, logoutMiembro}}>
            {children}
        </MiembroContext.Provider>
    );
};

export {MiembroContext,MiembroProvider}