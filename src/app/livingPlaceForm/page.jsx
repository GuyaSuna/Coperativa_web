"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import "./livingPlaceStyle.css";
import { useRouter } from 'next/navigation';
import { PostSocio } from "../Api/api";

const Form = () => {
  const router = useRouter();
  const [Conyuge , setConyuge] = useState(false)
  const [Concubino , setConcubino] = useState(false)
  const [Substitutename, setSubstituteName] = useState("")
  const [Username , setUsername] = useState("")
  const [UserLastName , setUserLastName] = useState("")
  const [UserNumber , setUserNumber] = useState()
  const [EntryDate , setEntryDate] = useState("")
  const [CiNumber , setCiNumber] = useState()
  const [HouseNumber , setHouseNumber] = useState()
  const [ NumberOfBedrooms , setNumbersOfBedrooms] = useState()  



  const handleChangesubstitutename = (e) =>{
    setSubstituteName(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeNumberBedrooms = (e) =>{
    setNumbersOfBedrooms(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeHouseNumber = (e) =>{
    setHouseNumber(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeCiNumber = (e) =>{
    setCiNumber(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeEntryDate = (e) =>{
    setEntryDate(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeUserNumber = (e) =>{
    setUserNumber(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeLastName = (e) =>{
    setUserLastName(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeUserName = (e) =>{
    setUsername(e.target.value)
    console.log(e.target.value)
  }

  const handleChangeConyuge = (e) => {
    const { name, value, type, checked } = e.target;
    if(checked){
      setConyuge(true)
      setConcubino(false)
    }else{
      setConyuge(false)
    }
  } 

  const handleChangeConcubino = (e) => {
    const { name, value, type, checked } = e.target;
    if(checked == true){
      setConyuge(false)
      setConcubino(true)
    }else{
      setConcubino(false)
    }
  } 



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nroSocio: UserNumber,
      nombre: Username,
      apellido: UserLastName,
      cedula: CiNumber,

    };
    console.log(data);
    
    const response = await PostSocio( data ,null , null);

    console.log(response);
  //  router.push(`/UserInfo/${UserNumber}`);
  };
  


return (
    <div className="general-container">
    <form onSubmit={handleSubmit} className="form">
      <label className="label">
        Nro. Usuario:
        <input
          type="text"
          name="userNumber"
          value={UserNumber}
          onChange={handleChangeUserNumber}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Nombres:
        <input
          type="text"
          name="userName"
          value={Username}
          onChange={handleChangeUserName}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Apellidos:
        <input
          type="text"
          name="userLastName"
          value={UserLastName}
          onChange={handleChangeLastName}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Cónyuge:
        <input
          type="checkbox"
          name="hasSpouse"
          checked={Conyuge}
          onChange={handleChangeConyuge}
          className="checkbox"
        />
      </label>
      <label className="label">
        Concubino:
        <input
          type="checkbox"
          name="hasSpouse"
          checked={Concubino}
          onChange={handleChangeConcubino}
          className="checkbox"
        />
        <br/>
      </label>
        {Concubino && 
        <label className="label">
          Nombre Concubino:
          <input
            type="text"
            name="SuplenteName"
            value={Substitutename}
            onChange={handleChangesubstitutename}
            className="input"
          />
        </label>
        }
        {Conyuge && 
        <label className="label">
          Nombre Conyuge:
          <input
            type="text"
            name="SuplenteName"
            value={Substitutename}
            onChange={handleChangesubstitutename}
            className="input"
          />
        </label>
        }
     
      <br />
      <label className="label">
        Numero de CI.:
        <input
          type="text"
          name="ciNumber"
          value={CiNumber}
          onChange={handleChangeCiNumber}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Número de vivienda:
        <input
          type="text"
          name="houseNumber"
          value={HouseNumber}
          onChange={handleChangeHouseNumber}
          className="input"
        />
      </label>
      <br />
    
      <br />
      <button type="submit" className="button">
        Submit
      </button>
    </form></div>
  );
};

export default Form;