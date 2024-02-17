"use client";
import React, { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { GetAllNOtes, AddNote, deleteNote } from "@/apis/Notes";
import { auth } from "@/apis/firebaseConfig";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
const Notes: React.FC<any> = (props) => {
  const { open, setopen } = props;

  const [notes, setnotes] = useState([]);
  const [count, setCount] = useState(0);
  const [buttonStage, setButtonStage] = useState<boolean>(false);
  const [Note, setNote] = useState<string>("");
  const [profileEMail, setProfileMail] = useState(auth?.currentUser?.email);

  useEffect(() => {
    setProfileMail(auth?.currentUser?.email);
  }, [auth?.currentUser?.email]);

  console.log(Note, ":::::");

  useEffect(() => {
    getData();
  }, [count]);

  const getData = async () => {
    const data = await GetAllNOtes(profileEMail);
    console.log(data);
    setnotes(data);
  };

  const addNoteFunction = async () => {
    const obj = {
      email: profileEMail,
      data: Note,
    };
    const resp: any = await AddNote(obj);
    if (resp.ok) {
      setNote("");
      setButtonStage(false);
    }
    console.log(resp);
  };

  return (
    <div className="z-[1000] w-[100vw] h-[100vh] flex justify-center items-center absolute bg-[rgba(0,0,0,0.5)]">
      <div
        className="w-[500px] rounded-[20px] h-[80vh] flex items-center flex-col text-white border border-white"
        style={{ backdropFilter: " blur(10px) brightness(70%)" }}
      >
        <div className="w-full p-[15px] flex justify-between items-center text-white">
          <h1 className="text-[1.3rem] font-[550] ">Notes</h1>
          <X
            color="white"
            className="!cursor-pointer"
            size={35}
            onClick={(e) => {
              setopen(false);
            }}
          />
        </div>
        <div className="w-[100%]  py-[10px] px-[5px] flex flex-col justify-center items-center">
          {notes !== null &&
            notes.length !== 0 &&
            notes.map((item: any, idx) => {
              console.log(item)
              return (<div
                key={item?.data}
                className="w-[90%] bg-[#303030ab] p-2 pr-3 mb-2 rounded-md relative"
              >
                <h2 className="max-w-full">{item?.data}</h2>
                <button className="absolute top-2 p-1 rounded-full bg-white right-2 text-red-500"
                  onClick={()=>{
                    deleteNote(item._id);
                    setCount(cnt=>cnt+1)
                  }}
                >
                  <FaTrash />
                </button>
              </div>)
              })}
          {notes !== null && notes.length === 0 && (
            <div className="w-full flex flex-col justify-center items-center gap-1 mb-[40px] ">
              <img
                src="/images/noNoteFound.png"
                className="w-[160px] h-[150px] py-[10px]"
                alt="No Items Found"
              />
              <p className="text-[1rem] font-[550]">No Note Found</p>
            </div>
          )}
          {buttonStage === false ? (
            <button
              className="bg-[#029BE6] rounded-[5px] w-[90%] py-[10px] flex justify-center items-center text-white"
              onClick={(e) => setButtonStage(true)}
            >
              Add Note
            </button>
          ) : (
            <div className="w-[90%] py-[15px] flex justify-center items-center gap-2">
              <input
                placeholder="Type your note"
                className="border-[#ffffff] focus:border-[3px] w-[80%] py-[8px] pl-[5px] text-[0.95rem] outline-none rounded-[5px] border-[1px] bg-transparent"
                type="text"
                value={Note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setButtonStage(false);
                  setNote("");
                }}
                className="w-[10%] py-[5px] cursor-pointer  rounded-[6px] flex justify-center items-center bg-[#d40028]"
              >
                <X style={{ color: "white" }} />
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (Note.length === 0) {
                    alert("Enter Any Note");
                  } else {
                    addNoteFunction();
                  }
                }}
                className="w-[10%] py-[5px] cursor-pointer flex justify-center items-center bg-[#13cc4e] rounded-[6px] "
              >
                <Check color="white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
