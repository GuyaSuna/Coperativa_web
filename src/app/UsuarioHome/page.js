'use client'
import Link from "next/link";
import React, {useContext} from "react";
import logo from "../../../public/LogoApp.jpg";
import Image from "next/image";
import { MiembroContext } from "@/Provider/provider";

export default function AdminHome() {
  const { miembro } = useContext(MiembroContext);
  console.log(miembro)
  return (
    <div>
        hola
    </div>
   )

}