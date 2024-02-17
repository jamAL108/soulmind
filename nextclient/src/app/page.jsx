'use client';
import React, { useEffect , useState } from "react";
import '@/app/styles/Home.css';
import Nav from '@/components/commonComp/Nav'
import imglink from '@/components/home/linksofimgs'
import Footer from '@/components/commonComp/Footer'
import  Link  from "next/link";
import 'animate.css';

const Home = () => {
    const [theme , settheme] = useState('light')

    useEffect(()=>{

    let themeVal = localStorage.getItem("theme")
    settheme(themeVal)
    },[])

    useEffect(() => {
        // Update document title when component mounts
        document.title = 'InnerCalmᴮᴱᵀᴬ - Home';
        // Clean up document title when component unmounts
        return () => {
            document.title = 'InnerCalm';
        }
    }, []);

    const FetchPosts = async () => {
        try {
            const resFromBack = await fetch('https://server-innercalm.vercel.app/api/allPosts', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            const data = await resFromBack.json()
            console.log(data.length)

            if (resFromBack.status !== 200 || !data) {
                window.alert("Error")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        FetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let img1, img2, img3;

    // Generate img1
    img1 = Math.floor(Math.random() * 30);

    // Generate img2, making sure it's not equal to img1
    do {
        img2 = Math.floor(Math.random() * 30);
    } while (img2 === img1);

    // Generate img3, making sure it's not equal to img1 or img2
    do {
        img3 = Math.floor(Math.random() * 30);
    } while (img3 === img1 || img3 === img2);

    return (
        <>
            <Nav />

            <section className="banner animate__animated animate__fadeIn">
                <div className={theme+" backdrop"}>
                    <div className={theme+" banner_tag"}>
                        <h1>WE'RE HERE FOR YOU</h1>
                        <h2 className="clrpink">WE ARE INNERCALM</h2>
                    </div>
                    
                </div>
            </section>

            <section className="share_story">
                <div className="share_story_content">
                    <h2>Share Your Story</h2>
                    <p>
                        If you're feeling sorrow or sadness, don't hesitate to share your story with our community. Your words have the power to heal, inspire, and uplift others who may be going through similar experiences. You are not alone, and together, we can support each other on this journey towards healing and well-being.
                    </p>
                    <button className="share_story_button">
                        <span className="link">
                            <Link href="/community">Share Your Story Now</Link>
                        </span>
                    </button>
                </div>
            </section>

            <section className="listen_music">
                <div className="listen_music_content">
                    <h2>MUSIC HEALS</h2>
                    <p>
                        Music has the power to heal and soothe our souls. Listening to our peaceful music and sounds can bring relaxation, tranquility, and a sense of inner peace. It can help reduce stress, anxiety, and promote overall well-being. Our carefully curated collection of music is designed to elevate your mood, calm your mind, and rejuvenate your spirit.
                    </p>
                    <div className="listen_music_right">
                        <Link href="/music">
                            <button className="listen_button">
                                <span className="link">🎧 Listen Now</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mtimgs">
                <div className="mt_content">
                    <h2>We are with you.</h2>
                </div>
                <div className="imgs">
                    <img src={imglink[img1]} alt="dsfv" />
                    <img src={imglink[img2]} alt="dsfv" />
                    <img src={imglink[img3]} alt="sdfvdb" />
                </div>
            </section>

            <section className="about">
                <div className="about_content">
                    <h2>About</h2>
                    <p>
                        InnerCalm is a project focused on providing tools and resources for individuals to achieve mental and emotional well-being. Our mission is to empower individuals with simple and accessible strategies for managing stress and cultivating inner peace. Through stories, music, and other resources, our team of students is committed to helping individuals find tranquility in their daily lives.
                    </p>
                </div>
            </section>

            {/* New Section
            <section className="new_section">
                <div className="new_section_content">
                    <h2>New Section</h2>
                    <p>This is a new section added to the Home page.</p>
                </div>
            </section> */}

            <Footer />
        </>
    );
}

export default Home;
