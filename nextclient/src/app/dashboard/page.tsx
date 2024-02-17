"use client";
import Nav from '@/components/commonComp/Nav'
import { useEffect, useState } from 'react'

export default function Dashboard(){

    const [theme , settheme] = useState('light')

    useEffect(()=>{
        let themeVal : any = localStorage.getItem("theme")
        settheme(themeVal)
    },[])

    return(
        <>
            <Nav/>
            <div className='pt-[120px] flex justify-center min-h-[100vh]' style={{background : theme ==="light" ? "linear-gradient(-150deg,#f8f8f8 15%,#ffa7a7 70%,#5f92d9 94%)" : "linear-gradient(-150deg,#222 15%,#373737 70%,#3c4859 94%)" }}>
                <div className='w-10/12'>
                    <div className=''>
                        
                    </div>

                </div>

            </div>
        </>
    )
}