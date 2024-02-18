import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/Music.css";

export default function DeepBreathe({ setopen }: any) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState("inhale"); // Initial stage is inhale
  const [seconds, setSeconds] = useState(6); // Initial timer value for inhale (6 seconds)
  const [displaySeconds, setDisplaySeconds] = useState(0);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1); // Decrease seconds by 1 every second
      }, 1000);

      // Clear the interval when the component unmounts or when seconds reach 0
      return () => clearInterval(timer);
    }
  }, [started]);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (displaySeconds < 60) {
          setDisplaySeconds((prevSeconds) => prevSeconds + 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [started, displaySeconds]);

  useEffect(() => {
    if (started && seconds === 0) {
      // Switch stages when timer reaches 0
      switch (stage) {
        case "inhale":
          setStage("hold");
          setSeconds(3); // 3-second hold after inhale
          break;
        case "hold":
          setStage("exhale");
          setSeconds(5); // 5-second exhale after hold
          break;
        case "exhale":
          // End of the breathing cycle
        //   setopen(false);
            setSeconds(6)
            setStage("inhale")
          break;
        default:
          break;
      }
    }
  }, [started, seconds, stage, setopen]);

  // Function to format the remaining time into mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Function to display the current stage
  const displayStage = () => {
    switch (stage) {
      case "inhale":
        return "Inhale";
      case "hold":
        return "Hold";
      case "exhale":
        return "Exhale";
      default:
        return "";
    }
  };

  const handleStartClick = () => {
    setStarted(true);
  };

  return (
    <div className="z-[1000] w-[100vw] h-[100vh] flex justify-center items-center absolute bg-[rgba(0,0,0,0.5)]">
      <div className="w-[500px] max-w-[90vw] rounded-[20px] h-[70vh] flex items-center flex-col text-white border border-white" style={{ backdropFilter: "blur(10px) brightness(70%)" }}>
        <div className="w-full p-[15px] flex justify-between items-center text-white">
          <h1 className="text-[1.3rem] font-[550]">Deep Breathe</h1>
          <X color="white" className="!cursor-pointer" size={35} onClick={(e) => { setopen(false); }} />
        </div>
        <div className="text-white text-lg flex flex-col items-center">
          {!started && 
            <div className="flex items-center h-full">
                <button onClick={handleStartClick}>Start</button>
            </div>
          }
          {started && (
            <>
              <p>{formatTime(displaySeconds)}</p>
              <div className="breatheLoader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="font-bold text-lg">"{displayStage()}"</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
