'use client'
import React from 'react';
import Image from 'next/image'
type ModalProps = {
    title: string;
    handleLogin: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({ title, handleLogin }: ModalProps) => {
    return (
        <>
            <div className='Login-Page-Class'>
                <h1>Welcome to Collabed</h1>
                <button onClick={handleLogin}>
                    <Image src="/images/Google.png" alt="dvftfvc" width={30} height={30} />
                    Sign In with Google
                </button>
            </div>
        </>
    );
};

export default ModalComponent;