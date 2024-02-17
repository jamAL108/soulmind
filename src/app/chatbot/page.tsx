"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useRef, useEffect } from "react";
import "../styles/ChatBot.css";
import Nav from '../../components/commonComp/Nav'
import { auth } from "@/apis/firebaseConfig";


const genAI = new GoogleGenerativeAI("AIzaSyBX16wrIG9mPvTXSc9iDA35v70phX7qgqg");

async function runPrompt(valueOfPrompt : string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  let prompt = `(Pretend you are Soul-Friend - A mental health chatbot as a friend, don't mention your name until asked, give short chat response), and give response to the text : '${valueOfPrompt}'` 

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

function ChatBot() {
  useEffect(() => {
    if(auth){
      console.log(auth,":::auth")
      if(auth?.currentUser?.displayName)
        setChats([{ content: `Hello ${auth?.currentUser?.displayName.split(" ")[0]} 👋,\n I am Soul-Friend, how may I help you ?`, role: "assistant" }])
      else{
        setChats([{ content: `Hello 👋,\n I am Soul-Friend how may I help you ?`, role: "assistant" }])
      }
    }
    // eslint-disable-next-line
  }, [auth?.currentUser?.displayName])
  
  const [theme , settheme] = useState('light')
  
  useEffect(()=>{
    let themeVal : any = localStorage.getItem("theme")
    settheme(themeVal)
    },[])

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<any>(null);

  const chat = async (e : any, message : any) => {
    e.preventDefault();

    if (!message) return;

    setIsTyping(true);

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    try {
      const response = await runPrompt(message);
      msgs.push({ role: "assistant", content: response });
      setChats(msgs);
    } catch (error) {
      console.error("Error generating response:", error);
    }

    setIsTyping(false);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <> <Nav />
      <div className={theme+" chatpage"}>
        <main>
          <h1>&nbsp;</h1>

          <section ref={chatContainerRef} className={theme + " allChatsContainer"}>
            {chats && chats.length
              ? chats.map((chat : any, index : number) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                  <span style={{textAlign : "left"}}>{chat.content}</span>
                </p>
              ))
              : ""}
          </section>

          <div className={isTyping ? "" : "hide"}>
            <p>
              <i>{isTyping ? "Typing" : ""}</i>
            </p>
          </div>

          <div className={theme + " inputChat"} >
            <form action="" onSubmit={(e) => chat(e, message)}>
              <input
                type="text"
                name="message"
                value={message}
                placeholder="Type your message here"
                autoComplete="off"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit"> Send</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default ChatBot;