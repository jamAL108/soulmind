"use client";
import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/commonComp/Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSupported, faClose } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faPaperPlane as faShareNodesRegular } from "@fortawesome/free-regular-svg-icons";
import { FaWhatsapp, FaInstagram, FaTwitter, FaCopy } from "react-icons/fa";

function Post() {
    // if (localStorage.getItem("theme") !== "light")
    //     localStorage.setItem("theme", "dark")

    // let theme = localStorage.getItem("theme")

    const router = useRouter();
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [supported, setSupported] = useState(false);
    const [supportsCount, setSupportsCount] = useState(0);
    const [showSharePopup, setShowSharePopup] = useState(false); 
    const [supportedpostIds ,setSupportedPostIds] = useState([])
    // Add this state
    // const navigate = useNavigate();
    const [theme,settheme] = useState();
    useEffect(()=>{
        let themeVal = localStorage.getItem("theme")
        settheme(themeVal)
    
        const parsedData = JSON.parse(localStorage.getItem("supportedPostIds"))
        setSupportedPostIds(parsedData)
    
        },[])

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`https://server-innercalm.vercel.app/api/post?id=${postId}`, {
                    method: 'GET',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setPost(data);

                    const supportedPostIds = JSON.parse(localStorage.getItem("supportedPostIds")) || [];
                    setSupported(supportedPostIds.includes(data._id));

                    setSupportsCount(data.supports);
                } else {
                    throw new Error(`Failed to fetch post data (Status: ${response.status})`);
                }
            } catch (error) {
                console.error(error);
                // Handle the error
            }
        };

        fetchPostData();
    }, [postId]);

    const handleSupportPost = () => {
        if (supported) {
            fetch(`https://server-innercalm.vercel.app/api/notSupportPost?id=${postId}`, {
                method: "PUT",
            })
                .then((response) => {
                    if (response.status === 200) {
                        setSupported(false);
                        setSupportsCount(supportsCount - 1);
                    } else {
                        console.error("Error:", response);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            fetch(`https://server-innercalm.vercel.app/api/supportPost?id=${postId}`, {
                method: "PUT",
            })
                .then((response) => {
                    if (response.status === 200) {
                        setSupported(true);
                        setSupportsCount(supportsCount + 1);
                    } else {
                        console.error("Error:", response);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const shareOnWhatsApp = () => {
        const postLink = `https://innercalm.netlify.app/post/${postId}`;
        const whatsappMessage = `Check out this post on InnerCalm: ${postLink}`;

        const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappShareLink, '_blank');
    };

    const shareOnInstagram = () => {
        const postLink = `https://innercalm.netlify.app/post/${postId}`;
        const instagramShareLink = `https://www.instagram.com/share?url=${encodeURIComponent(postLink)}`;

        window.open(instagramShareLink, '_blank');
    };

    const shareOnTwitter = () => {
        const postLink = `https://innercalm.netlify.app/post/${postId}`;
        const tweetText = "Check out this post on InnerCalm!";

        const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(postLink)}`;

        window.open(twitterShareLink, '_blank');
    };

    const copyLink = () => {
        const postLink = `https://innercalm.netlify.app/post/${postId}`;

        const tempInput = document.createElement('input');
        tempInput.value = postLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Post link copied to clipboard!');
    };

    return (
        <>
            <Nav />

            <div className={theme + " postPage"}>
                <div className={theme + " post"}>
                    <button className="BackBTNPost" onClick={() => { router.push("/community") }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={theme + " posthead"}>
                        <img src="/images/defpp.jpg" alt="" />
                        <p style={{ margin: "0px" }} className="name">
                            {"User" + Math.floor(Math.random() * 1000000)}
                        </p>
                    </div>

                    <div className="post_content">
                        <p className={theme + " post_text"}>{post.story}</p>
                    </div>
                    <div
                        className="post_actions"
                        style={{ width: "100%", height: " 44px", background: "" }}
                    >
                        <div className="supports">
                            {supported ? (
                                <FontAwesomeIcon
                                    className={theme + " supportIcon"}
                                    icon={faHeartSupported}
                                    style={{ fontSize: "25px", color: "#f55656" }}
                                    onClick={handleSupportPost}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={theme + " supportIcon"}
                                    icon={faHeart}
                                    style={{ fontSize: "25px" }}
                                    onClick={handleSupportPost}
                                />
                            )}
                            <div className={theme + " noOfSupports"} style={{ fontSize: "10px" }}>
                                {supportsCount}
                            </div>
                        </div>
                        <div className="sendStory">
                            <FontAwesomeIcon
                                className={theme + " sendIcon"}
                                icon={faShareNodesRegular}
                                style={{ fontSize: "22px" }}
                                onClick={() => setShowSharePopup(true)}
                            />
                        </div>
                    </div>
                </div>


                {showSharePopup && (
                    <div className="share-popup">
                        <div className={theme + " share-popup-content"}>
                            <span className="close" onClick={() => setShowSharePopup(false)}>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            <h3>Share Post</h3>
                            <p>Share this post with others:</p>
                            <button onClick={shareOnWhatsApp}>
                                <FaWhatsapp /> Share on WhatsApp
                            </button>
                            <button onClick={shareOnInstagram}>
                                <FaInstagram /> Share on Instagram
                            </button>
                            <button onClick={shareOnTwitter}>
                                <FaTwitter /> Share on Twitter
                            </button>
                            <button onClick={copyLink}>
                                <FaCopy /> Copy Post Link
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Share Post Popup */}

        </>
    );
}

export default Post;