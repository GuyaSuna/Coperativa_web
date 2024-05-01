'use client'
import React,{ useEffect, useState } from "react";

import getSocio from '../../Api/api'
const UserInfo = () => {

    const [ userData , setUserData] = useState ({
      UserNumber : 0,
      Username : "pepe",
      UserLastName :"Pica piedra" ,
      EntryDate : "01/01/2024",
      CiNumber : 12345678,
      HouseNumber : 127,
      NumberOfBedrooms : 2
    })  

useEffect(() => {
    const data =  getSocio(1)
    setUserData(data)
},[])

    return(
    <div>
        {userData.CiNumber}
    </div>
    )

}

export default UserInfo