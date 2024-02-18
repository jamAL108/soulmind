'use client'
import React from 'react';
import Image from 'next/image'
type ModalProps = {
    title: string;
    handleLogin: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({ title, handleLogin }: ModalProps) => {
    return (
        <div className='w-[100vw] h-[100vh] flex items-center flex-col gap-5 overflow-x-hidden bg-white' style={{background : "white"}}>
            <div className='w-[100%] py-[20px] flex justify-center items-center'>
                <Image src="/images/logo.png" alt="dsdvfeb" width={220} height={200}  />
            </div>
            <div className='w-full py-[10px] flex flex-col justify-center items-center mt-[100px] gap-5'>
                <h1 className='text-[1.7rem] font-[600]'>Welcome to SoulMind </h1>
                <button onClick={handleLogin} className='px-[13px] py-[6px] flex border-[#C2C8D0] border-[1px] rounded-[4px] hover:bg-[#E5E5E5]'>
                    <Image src="/images/Google.png" alt="dvftfvc" width={30} height={30} />
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default ModalComponent;