'use client'
import React, { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react';
import { GetAllNOtes, AddNote } from '@/apis/Notes'
import { auth } from '@/apis/firebaseConfig';
const Notes: React.FC<any> = (props) => {
  const { open, setopen } = props;

  const [notes, setnotes] = useState([])

  const [buttonStage, setButtonStage] = useState<boolean>(false)
  const [Note, setNote] = useState<string>('')
  const [profileEMail, setProfileMail] = useState(auth?.currentUser?.email)

  useEffect(() => {
    setProfileMail(auth?.currentUser?.email)
  }, [auth?.currentUser?.email])


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await GetAllNOtes()
    console.log(data)
    setnotes(data)
  }

  const addNoteFunction = async () => {
    const obj = {
      email: profileEMail,
      data: Note
    }
    const resp:any = await AddNote(obj)
    console.log(resp)
    // if (resp.newNote!==null) {
    //   let arr = [...notes]
    //   const  newNote:any = resp.newNote
    //   arr.push(newNote)
    //   setnotes(arr)
    // }
  }



  return (
    <div className='z-[1000] w-[100vw] h-[100vh] flex justify-center items-center absolute bg-[rgba(0,0,0,0.5)]'>
      <div className='w-[500px] rounded-[20px] h-[80vh] bg-white flex items-center flex-col'>
        <div className='w-full py-[15px] px-[15px] flex justify-between items-center'>
          <h1 className='text-[1.3rem] font-[550] '>Notes</h1>
          <X color='black' className='!cursor-pointer' size={35} onClick={(e) => {
            setopen(false)
          }} />
        </div>
        <div className='w-[100%]  py-[10px] px-[5px] flex flex-col justify-center items-center'>
          {notes !== null && notes.length!==0 && notes.map((item: any, idx) => (
            <div>
              <h2>{item.data}</h2>
            </div>
          ))}
          {notes !== null && notes.length === 0 && (
            <div className='w-full flex flex-col justify-center items-center gap-1 mb-[40px] '>
              <img src='/images/noNoteFound.png' className='w-[160px] h-[150px] py-[10px]' alt='refw' />
              <p className='text-[1rem] font-[550]'>No Note Found</p>
            </div>
          )}
          {buttonStage === false ? (
            <button className='bg-[#029BE6] rounded-[14px] w-[400px] py-[15px] flex justify-center items-center text-white' onClick={(e) => setButtonStage(true)}>
              Add Note
            </button>
          ) : (
            <div className='w-[430px] py-[15px] flex justify-center items-center gap-2'>
              <input placeholder='Notes ....' className='border-[#029BE6] focus:border-[3px] w-[80%] py-[8px] pl-[5px] text-[0.95rem] outline-none rounded-[5px] border-[1px]' type="text" value={Note} onChange={(e) => {
                setNote(e.target.value)
              }} />
              <div onClick={(e) => {
                e.preventDefault()
                setButtonStage(false)
                setNote('')
              }} className='w-[10%] py-[5px] cursor-pointer  rounded-[6px] flex justify-center items-center bg-[#d40028]'>
                <X color='white' />
              </div>
              <div onClick={(e) => {
                e.preventDefault()
                if (Note.length === 0) {
                  alert("Enter Any Note")
                } else {
                  addNoteFunction()
                }
              }} className='w-[10%] py-[5px] cursor-pointer flex justify-center items-center bg-[#13cc4e] rounded-[6px] '>
                <Check color='white' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes