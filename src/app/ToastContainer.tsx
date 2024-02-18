"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer style={{ fontFamily: 'Poppins, sans-serif' , zIndex : 9999999}}  autoClose={1800} pauseOnHover={false} closeButton={false}/>
    </>
  );
}