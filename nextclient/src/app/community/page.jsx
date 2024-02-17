'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Nav from '@/components/commonComp/Nav'
import "../styles/Community.css"
import defaultStories from "@/components/community/defaultStories"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHeart as faHeartSupported } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPaperPlane as faShareNodes } from '@fortawesome/free-regular-svg-icons';
import { FaWhatsapp, FaInstagram, FaTwitter, FaCopy } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";

const Community = () => {
    const [supportedPostIds, setSupportedPostIds] = useState([]);
    const [isSortPopupOpen, setisSortPopupOpen] = useState(false)
    const router = useRouter()

    const [theme , settheme] = useState('light')

    useEffect(()=>{
    // if (localStorage.getItem("theme") !== "light")
    //     localStorage.setItem("theme", "dark")

    let themeVal = localStorage.getItem("theme")
    settheme(themeVal)

    const parsedData = JSON.parse(localStorage.getItem("supportedPostIds"))
    setSupportedPostIds(parsedData)

    },[])

    useEffect(() => {
        // Update document title when component mounts
        document.title = 'SoulMindᴮᴱᵀᴬ - Community';
        // Clean up document title when component unmounts
        return () => {
            document.title = 'SoulMind';
        }
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [suberr, setSubErr] = useState(false);
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [sharesection, setSharesection] = useState({});
    const [cmtpg, setCPGbg] = useState('cmnitypage');
    const formButtonClick = () => {
        setShowForm(true);
    };

    const [sortType, setSortType] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        let x = JSON.stringify({ name, story });
        if (!story) {
            setSubErr(true)
            return;
        }

        fetch('https://server-innercalm.vercel.app/api/newPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: x,
        }).then((response) => {
            response.json()
            // console.log(response)
            if (response.status === 200) {
                setName("")
                setStory("")
                handleCloseForm();
                FetchPosts()

            } else {

                setSubErr(true)
            }
        }).then((data) => {
            console.log(data);
            // do something with the response data


        }).catch((error) => {
            console.error('Error:', error);
            setSubErr(true)

        });

    };


    const isPostSupported = (postId) => {
        return supportedPostIds?.includes(postId);
    };

    const supportPost = (postId) => {

        if (supportedPostIds.includes(postId)) {
            // If the post is already supported, call the endpoint to un-support it
            console.log("Un-supporting post", postId);

            fetch(`https://server-innercalm.vercel.app/api/notSupportPost?id=${postId}`, {
                method: 'PUT',
            })
                .then((response) => {
                    if (response.status === 200) {
                        // Update the supportedPostIds state and store it in localStorage
                        const updatedSupportedPostIds = supportedPostIds.filter((id) => id !== postId);
                        setSupportedPostIds(updatedSupportedPostIds);
                        localStorage.setItem(
                            "supportedPostIds",
                            JSON.stringify(updatedSupportedPostIds)
                        );

                        // Refresh the list of posts
                        FetchPosts();
                    } else {
                        // Handle the case where un-supporting failed (e.g., show an error message).
                        console.error('Error:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            // If the post is not supported, call the endpoint to support it
            console.log("Supporting post", postId);

            fetch(`https://server-innercalm.vercel.app/api/supportPost?id=${postId}`, {
                method: 'PUT',
            })
                .then((response) => {
                    if (response.status === 200) {
                        // Update the supportedPostIds state and store it in localStorage
                        const updatedSupportedPostIds = [...supportedPostIds, postId];
                        setSupportedPostIds(updatedSupportedPostIds);
                        localStorage.setItem(
                            "supportedPostIds",
                            JSON.stringify(updatedSupportedPostIds)
                        );

                        // Refresh the list of posts
                        FetchPosts();
                    } else {
                        // Handle the case where support addition failed (e.g., show an error message).
                        console.error('Error:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const handleCloseForm = () => {
        setName("")
        setStory("")
        setShowForm(false);
        setSubErr(false)
    };



    setInterval(() => {
        setCPGbg("cmnitypage linearbgcmitypg")
    }, 800);

    const [allposts, setAllPosts] = useState([])

    const FetchPosts = async (rev=false) => {
        try {
            const resFromBack = await fetch('https://server-innercalm.vercel.app/api/allPosts', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            const data = await resFromBack.json()
            setAllPosts(()=>{
                if(rev)
                    return data.reverse();
                return data;
            })


            if (resFromBack.status !== 200 || !data) {
                window.alert("Error")
            }

        }
        catch (err) {
            console.log(err)
            setAllPosts(defaultStories)
            setSharesection({ display: "none" })

        }
    }

    useEffect(() => {
        FetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [showSharePopup, setShowSharePopup] = useState(false);
    const [postToShare, setPostToShare] = useState(null);
    const handleShareClick = (postId) => {
        setPostToShare(postId);
        setShowSharePopup(true);
    };

    const handleCloseSharePopup = () => {
        setPostToShare(null);
        setShowSharePopup(false);
    };

    const shareOnWhatsApp = () => {
        const postLink = `https://innercalm.netlify.app/post/${postToShare}`;
        const whatsappMessage = `Check out this post on SoulMind: ${postLink}`;

        // Construct the WhatsApp share URL
        const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

        // Open the WhatsApp share link in a new tab/window
        window.open(whatsappShareLink, '_blank');
    };

    const shareOnInstagram = () => {
        const postLink = `https://innercalm.netlify.app/post/${postToShare}`;
        // Construct the Instagram share URL
        const instagramShareLink = `https://www.instagram.com/share?url=${encodeURIComponent(postLink)}`;

        // Open the Instagram share link in a new tab/window
        window.open(instagramShareLink, '_blank');
    };

    const shareOnTwitter = () => {
        const postLink = `https://innercalm.netlify.app/post/${postToShare}`;
        const tweetText = "Check out this post on SoulMind!";

        // Construct the Twitter share URL
        const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(postLink)}`;

        // Open the Twitter share link in a new tab/window
        window.open(twitterShareLink, '_blank');
    };

    const copyLink = () => {
        const postLink = `https://innercalm.netlify.app/post/${postToShare}`;

        // Create a temporary input element to copy the link
        const tempInput = document.createElement('input');
        tempInput.value = postLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // You can also provide user feedback that the link has been copied, e.g., a toast message.
        alert('Post link copied to clipboard!');
    };
    return (
        <>
            <Nav />
            <div className="CMT">
                <div className={theme + " " + cmtpg}>
                    <header>We believe that by sharing our experiences, we can help others feel less alone and inspire them to seek the help they need. Join us in creating a supportive and inclusive space where everyone's voice is heard.</header>
                    <h1 className={theme + " head_st"} style={{position : "relative"}}>
                        Stories of People
                        <div className={theme +" sortBydropDownBtn"}>
                            <div style={{display :"flex", justifyContent : "",fontSize : "22px"}}>
                                <button onClick={()=> setisSortPopupOpen(prev=>!prev)}><MdOutlineSort /></button> 
                            </div>
                        </div>
                        {
                                isSortPopupOpen && (
                                    <>
                                        <div className={theme + " sortbyDropDown"}>
                                            <p> Sort by : </p>
                                            <button
                                                onClick={()=>{
                                                    FetchPosts();
                                                    setSortType(1);
                                                }}
                                                 style={{display : sortType==1 && "none"}}>
                                                Newest 
                                            </button>
                                            <button
                                                onClick={()=>{
                                                    FetchPosts(true);
                                                    setAllPosts((x)=>{
                                                        x.reverse();
                                                        return x;
                                                    })
                                                    setSortType(2);
                                                }}
                                                style={{display : sortType==2 && "none"}}>
                                                Oldest 
                                            </button>
                                            <button
                                                onClick={()=>{
                                                    setSortType(1);
                                                }}
                                                style={{display : sortType==3 && "none"}}>
                                                Supports
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                    </h1>

                    

                    <div className="allposts">
                        {allposts.map((val) => {
                            return (
                                <div key={val._id} className={theme + " post"} >
                                    <div className={theme + " posthead"} onClick={() => { router.push(`/post/${val._id}`) }}>
                                        <img src='/images/defpp.jpg' alt="" />
                                        <p style={{ margin: "0px" }} className="name">{"User" + Math.floor(Math.random() * 1000000)}</p>
                                    </div>

                                    <div className="post_content" onClick={() => { router.push(`/post/${val._id}`) }}>
                                        <p className={theme + " post_text"}>
                                            {val.story}
                                        </p>
                                    </div>
                                    <div className="post_actions" style={{ width: "100%", height: " 44px", background: "" }}>
                                        <div className="supports">
                                            {isPostSupported(val._id) ? (
                                                <FontAwesomeIcon className={theme + " supportIcon"} icon={faHeartSupported} style={{ fontSize: "25px", color: "#f55656" }} onClick={() => supportPost(val._id)} />
                                            ) : (
                                                <FontAwesomeIcon className={theme + " supportIcon"} icon={faHeart} style={{ fontSize: "25px" }} onClick={() => supportPost(val._id)} />
                                            )}
                                            <div className={theme + " noOfSupports"} style={{ fontSize: "10px" }}>
                                                {val.supports}
                                            </div>
                                        </div>
                                        <div className="sendStory">
                                            <FontAwesomeIcon
                                                className={theme + " sendIcon"}
                                                icon={faShareNodes}
                                                style={{ fontSize: "22px" }}
                                                onClick={() => handleShareClick(val._id)} // Pass the postId here
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {showSharePopup && (
                        <div className="share-popup">
                            <div className={theme+" share-popup-content"}>
                                <span className="close" onClick={handleCloseSharePopup}>
                                    <FontAwesomeIcon icon={faClose} />
                                </span>
                                <h3>Share Post</h3>
                                {/* Display the post content or a link to the post */}
                                <p>Share this post with others:</p>
                                {/* <p>{`https://server-innercalm.vercel.app/api/post/${postToShare}`}</p> */}
                                {/* Add social media sharing buttons or other sharing options here */}
                                <button onClick={shareOnWhatsApp}>
                                    <FaWhatsapp /> Share on WhatsApp
                                </button>
                                <button onClick={shareOnInstagram}>
                                    <FaInstagram /> Share on Instagram
                                </button>
                                <button onClick={shareOnTwitter}>
                                    <FaTwitter /> Share on Twitter
                                </button>
                                <button onClick={copyLink}> <FaCopy /> Copy Post Link</button>
                            </div>
                        </div>
                    )}


                    <div style={sharesection} className="sharesection">
                        <button className="share_btn" onClick={formButtonClick}>
                            Share your story
                        </button>
                    </div>


                    {showForm && (
                        <div className="form-popup">
                            <form onSubmit={handleSubmit}>

                                <h3>Share Your Story</h3>
                                <label htmlFor="name">Name: <span>(Your name will be hidden)</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="story">Your Story:</label>
                                <textarea
                                    rows={10}
                                    name="story"
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                />
                                {suberr ? <span className="errormessage"> *Error Posting, Please try again.</span> : <></>}
                                <div className="form-buttons">
                                    <button type="submit" className="submitbtn" >Submit</button>
                                    <button className="closebtn" type="button" onClick={handleCloseForm}>
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Community
