'use client'
//Docs is our only page....
import React from "react";
import ModalComponent from "@/components/home/ModelComponent"
import { loginWithGoogle } from "@/apis/auth";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useRouter } from 'next/navigation'

const Docs = () => {
    const router = useRouter()
  const handleLogin = () => {
    loginWithGoogle();
  };
  const { isAuthenticated, userData } = useCheckAuth();
  if(isAuthenticated===true){
    // console.log("MEOW")
    router.push('/community')
  }else {
    return (
        <ModalComponent
        title="SignIn"
        handleLogin={handleLogin}
      ></ModalComponent>
    )
  }
}

export default Docs
