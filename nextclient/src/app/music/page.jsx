'use client';
import React, { useState, useRef, useEffect } from "react";


// import rainSound from '../components/music/sounds/rain.mp3';
// import trafficSound from '../components/music/sounds/traffic.mp3';
// import peopleSound from '../components/music/sounds/people.mp3';
// import campFire from '../components/music/sounds/campfire.mp3';

import musicList from '@/components/music/musicList';

import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Nav from '@/components/commonComp/Nav'
import '../styles/Music.css';
import axios from "axios";
import MusicPreloader from '../../components/music/MusicPreloader'
import {
    faPlay,
    faPause,
    faStepBackward,
    faStepForward,
    faVolumeMute,
    faVolumeUp,
    faExpand,
    faSpinner,
    faVolumeDown,
    faCloudRain,
    faCar,
    faUsers,
    faFire,
    faClose,
} from '@fortawesome/free-solid-svg-icons';

// import pic1 from "../components/Image-1.jpg";
// import pic2 from "../components/Image-2.jpg";
// import pic3 from "../components/Image-3.jpg";
// import pic4 from "../components/Image-4.jpg";
// import pic5 from "../components/Image-5.jpg";
// import pic6 from "../components/Image-6.gif";
// import pic7 from "../components/Image-7.gif";
// import pic8 from "../components/Image-8.gif";

const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    filter: " drop-shadow(#000 1px 1px 3px)"
};

const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    filter: " drop-shadow(#000 1px 1px 10px)"
};

const MusicScreen = ({ slides }) => {
    useEffect(() => {
        // Update document title when component mounts
        document.title = 'SoulMindᴮᴱᵀᴬ - Music';
        // Clean up document title when component unmounts
        return () => {
            document.title = 'SoulMind';
        };
    }, []);

    let randomNumber = Math.floor(Math.random() * musicList.length) + 1;
    let randomNumberSlide = Math.floor(Math.random() * 8);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(randomNumberSlide);

    const [currentMusicIndex, setCurrentMusicIndex] = useState(randomNumber);
    const [volume, setVolume] = useState(Number(100)); // Initial volume value
    const audioRef = useRef(null);

    const [isRainPlaying, setIsRainPlaying] = useState(false);
    const [isTrafficPlaying, setIsTrafficPlaying] = useState(false);
    const [isPeoplePlaying, setIsPeoplePlaying] = useState(false);
    const [isFireplaying, setIsFirePlaying] = useState(false);

    const rainAudioRef = useRef(null);
    const trafficAudioRef = useRef(null);
    const peopleAudioRef = useRef(null);
    const fireAudioRef = useRef(null);

    useEffect(() => {
        if (rainAudioRef.current) {
            rainAudioRef.current.volume = 0.31;
        }
        if (trafficAudioRef.current) {
            trafficAudioRef.current.volume = 1;
        }
        if (peopleAudioRef.current) {
            peopleAudioRef.current.volume = 0.28;
        }
        if (fireAudioRef.current) {
            fireAudioRef.current.volume = 0.5;
        }
    }, []);

    useEffect(() => {
        if (isFireplaying) {
            fireAudioRef.current.play();
        } else {
            fireAudioRef.current.pause();
            fireAudioRef.current.currentTime = 0;
        }
    }, [isFireplaying]);

    useEffect(() => {
        if (isRainPlaying) {
            rainAudioRef.current.play();
        } else {
            rainAudioRef.current.pause();
            rainAudioRef.current.currentTime = 0;
        }
    }, [isRainPlaying]);

    useEffect(() => {
        if (isTrafficPlaying) {
            trafficAudioRef.current.play();
        } else {
            trafficAudioRef.current.pause();
            trafficAudioRef.current.currentTime = 0;
        }
    }, [isTrafficPlaying]);

    useEffect(() => {
        if (isPeoplePlaying) {
            peopleAudioRef.current.play();
        } else {
            peopleAudioRef.current.pause();
            peopleAudioRef.current.currentTime = 0;
        }
    }, [isPeoplePlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume / 100; // Set the volume based on the value (0 to 1)
    }, [volume]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const msGoToNext = async () => {
        let audio = audioRef.current;
        await audio.pause();
        setIsPlaying(false);

        if (currentMusicIndex === musicList.length - 1)
            setCurrentMusicIndex(0)
        else
            setCurrentMusicIndex(currentMusicIndex + 1)

        audio = audioRef.current;
        await audio.play();
        setIsPlaying(true);
    };

    const msGoToPrevious = async () => {
        let audio = audioRef.current;
        await audio.pause();
        setIsPlaying(false);

        if (currentMusicIndex === 0)
            setCurrentMusicIndex(musicList.length - 1)
        else
            setCurrentMusicIndex(currentMusicIndex - 1)

        audio = audioRef.current;
        await audio.play();
        setIsPlaying(true);
    };

    const slideStylesWidthBackground = {
        ...slideStyles,
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    const handleFullScreenClick = () => {
        const elem = document.documentElement;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            elem.requestFullscreen();
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleAudioLoadStart = () => {
        setIsLoading(true);
    };

    const handleAudioLoadedData = () => {
        setIsLoading(false);
    };

    const handleAudioEnded = () => {
        // Call play() method on audio element to replay the music
        audioRef.current.play();
        console.log("ended")
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume / 100; // Set the volume based on the value (0 to 1)
    }, [volume]);

    const handleVolumeChange = (event) => {
        setVolume(Number(event.target.value));
    };

    const volumeIcon = (volume) => {
        if (volume === 0)
            return <FontAwesomeIcon icon={faVolumeMute} />;
        else if (volume > 0 && volume <= 40)
            return <FontAwesomeIcon icon={faVolumeDown} />;
        else
            return <FontAwesomeIcon icon={faVolumeUp} />;
    };

    const playRainSound = () => {
        setIsRainPlaying(true);
    };

    const stopRainSound = () => {
        setIsRainPlaying(false);
    };

    // Repeat the same steps for the traffic and people sounds
    const playTrafficSound = () => {
        setIsTrafficPlaying(true);
    };

    const stopTrafficSound = () => {
        setIsTrafficPlaying(false);
    };

    const playPeopleSound = () => {
        setIsPeoplePlaying(true);
    };

    const stopPeopleSound = () => {
        setIsPeoplePlaying(false);
    };

    const playFireSound = () => {
        setIsFirePlaying(true);
    };

    const stopFireSound = () => {
        setIsFirePlaying(false);
    };

    const handleVolClick = () => {
        if (volume !== 0)
            setVolume(Number(0));
        else
            setVolume(Number(65));
    };

    const [showYTembed, setShowYTembed] = useState(false)
    const [ytQuery, setYTQuery] = useState("");
    const [videoUrlID, setVideoUrlID] = useState("")
    let apiKey = "AIzaSyCvxZeTPbYM_SMkhEz2jQbrgs3kLeBpUoo"

    const YTFORM = (e) => {
        e.preventDefault();
        handleYTSearch();
    }

    const handleYTSearch = async () => {

        try {
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        key: apiKey,
                        q: ytQuery, // The search query // Include video details like title and description
                        type: "video", // Only retrieve videos
                        maxResults: 10, // Maximum number of results
                    },
                }
            );

            if (response.data.items) {
                // Update the state with the retrieved videos
                setVideoUrlID("");
                setVideoUrlID(response.data.items[0].id.videoId)
            }

        } catch (error) {
            console.error("Error searching for YouTube videos:", error);
        }
    };

    return (
        <>
            <MusicPreloader />
            <div style={{ background: "#101316", height: "100%", width: "100%" }} className="musspage">
                <div style={slideStylesWidthBackground} >
                    <div>
                        <audio
                            ref={audioRef}
                            src={musicList[currentMusicIndex]}
                            onLoadedData={handleAudioLoadedData}
                            onLoadStart={handleAudioLoadStart}
                            onEnded={handleAudioEnded}
                            loop
                        ></audio>

                        <div onClick={goToPrevious} style={leftArrowStyles} className="pageturnbtn">
                            ❰
                        </div>
                        <div onClick={goToNext} style={rightArrowStyles} className="pageturnbtn">
                            ❱
                        </div>

                        {
                            showYTembed &&
                            <div className="YTembed">
                                <div className="YtcloseBtn">
                                    <FontAwesomeIcon icon={faClose} onClick={()=>{
                                        setShowYTembed(false)
                                    }} />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <form onSubmit={YTFORM}>
                                        <input placeholder="Name of Song/Video" type="text"
                                            onChange={(e) => { setYTQuery(e.target.value) }} />
                                        <button onClick={handleYTSearch}>Play&nbsp; <FontAwesomeIcon color="#000" icon={faYoutube} /></button>
                                    </form>
                                </div>
                                   {
                                      videoUrlID && (
                                        <iframe
                                          src={`https://www.youtube.com/embed/${videoUrlID}?autoplay=1&playlist=${videoUrlID}&loop=1`}
                                          title="YouTube Video"
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        ></iframe>
                                      )
                                    }
                            </div>
                        }

                        <div className="allbuttonsmspg">
                            <div className="musicButtons">
                                <button
                                    className="next_prev"
                                    onClick={msGoToPrevious}
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '25px',
                                        border: "none",
                                        backgroundColor: "#00000000",
                                        color: "#fff",
                                        textShadow: "#000 2px 2px 20px"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStepBackward} />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsPlaying(!isPlaying);
                                        const audio = audioRef.current;
                                        if (audio.paused) {
                                            audio.play();
                                        } else {
                                            audio.pause();
                                        }
                                    }}
                                    className="play-button" style={{ cursor: "pointer", fontSize: "30px", border: "none", backgroundColor: "#00000000", color: "#fff", textShadow: "#000 2px 2px 20px" }} >
                                    {isLoading ? <FontAwesomeIcon icon={faSpinner} /> : isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                                </button>
                                <button
                                    className="next_prev"
                                    onClick={msGoToNext}
                                    style={{
                                        cursor: 'pointer',
                                        border: "none",
                                        fontSize: '25px',
                                        backgroundColor: "#00000000", color: "#fff", textShadow: "#000 2px 2px 20px"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStepForward} />
                                </button>

                                <button className="fullscreen-button" onClick={handleFullScreenClick} style={{ marginRight: "-10px", color: "white", cursor: "pointer", fontSize: '25px', backgroundColor: "#00000000", border: "none" }}>
                                    <FontAwesomeIcon icon={faExpand} />
                                </button>

                                <button className="youtubeIconBTN" onClick={() => {
                                    setShowYTembed(!showYTembed)
                                    if (!showYTembed) {
                                        setVideoUrlID("")
                                        setYTQuery("")
                                    }
                                }}>
                                    <FontAwesomeIcon className="youtubeIcon" icon={faYoutube} />
                                </button>

                            </div>
                            <div className="volDiv">
                                <div className="volPercent" onClick={handleVolClick}>
                                    {volumeIcon(volume)}
                                </div>
                                <div className="volume-slider">
                                    <input
                                        type="range"
                                        min="0"
                                        max="99"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volSlider"
                                    />
                                </div>
                            </div>

                            <div className="soundButtons">
                                <button
                                    onClick={isRainPlaying ? stopRainSound : playRainSound}
                                    className={isRainPlaying ? "active" : ""}
                                >
                                    <FontAwesomeIcon icon={faCloudRain} className={isRainPlaying ? "activeIcon" : ""} />
                                </button>

                                <button
                                    onClick={isTrafficPlaying ? stopTrafficSound : playTrafficSound}
                                    className={isTrafficPlaying ? "active" : ""}
                                >
                                    <FontAwesomeIcon icon={faCar} className={isTrafficPlaying ? "activeIcon" : ""} />
                                </button>

                                <button
                                    onClick={isPeoplePlaying ? stopPeopleSound : playPeopleSound}
                                    className={isPeoplePlaying ? "active" : ""}
                                >
                                    <FontAwesomeIcon icon={faUsers} className={isPeoplePlaying ? "activeIcon" : ""} />
                                </button>

                                <button
                                    onClick={isFireplaying ? stopFireSound : playFireSound}
                                    className={isFireplaying ? "active" : ""}
                                >
                                    <FontAwesomeIcon icon={faFire} className={isFireplaying ? "activeIcon" : ""} />
                                </button>
                            </div>

                            <audio ref={rainAudioRef} src='/music/sounds/rain.mp3' loop />
                            <audio ref={trafficAudioRef} src='/music/sounds/traffic.mp3' loop />
                            <audio ref={peopleAudioRef} src='/music/sounds/people.mp3' loop />
                            <audio ref={fireAudioRef} src='/music/sounds/campfire.mp3' loop />
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

const Music = () => {
    const slides = [
        { url: '/images/Image-1.jpg', title: "1" },
        { url: '/images/Image-2.jpg', title: "2" },
        { url: '/images/Image-3.jpg', title: "3" },
        { url: '/images/Image-4.jpg', title: "4" },
        { url: '/images/Image-5.jpg', title: "5" },
        { url: '/images/Image-6.gif', title: "6" },
        { url: '/images/Image-7.gif', title: "7" },
        { url: '/images/Image-8.gif', title: "8" },
    ];



    const containerStyles = {
        width: "100%",
        height: "calc(100vh - 0px)",
        margin: "0"
    };

    

    return (
        <>
            <Nav />
            <div style={containerStyles}>
                <MusicScreen slides={slides} />
            </div>
        </>
    );
}

export default Music;