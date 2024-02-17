'use client';
import React, { useState, useEffect } from "react";
import Nav from '@/components/commonComp/Nav'
import Footer from '@/components/commonComp/Footer';
import '../styles/Contact.css';

const Contact = () => {

    const [theme , settheme] = useState('light')

    useEffect(()=>{
    // if (localStorage.getItem("theme") !== "light")
    //     localStorage.setItem("theme", "dark")

    let themeVal = localStorage.getItem("theme")
    settheme(themeVal)
    
    },[])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Add state for success popup

    useEffect(() => {
        // Update document title when component mounts
        document.title = 'SoulMindᴮᴱᵀᴬ - Contact Us';
        // Clean up document title when component unmounts
        return () => {
            document.title = 'SoulMind';
        }
    }, []);

    const handleFormSubmit = () => {
        // Create an object with the form data
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        };

        // Send the form data to the backend endpoint
        fetch('https://server-innercalm.vercel.app/api/newContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                // Reset form inputs after successful submission
                setName("");
                setEmail("");
                setPhone("");
                setSubject("");
                setMessage("");
                setShowSuccessPopup(true); // Set showSuccessPopup to true
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <Nav />
            <div className={theme+" contactpage"}>
                {showSuccessPopup && (
                    <div className="overlay">
                        <div className="success_popup">
                            <p>Your form has been successfully submitted! ✅</p>
                            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
                <section className="contt">
                    <div className="wrapper">
                        <div className="title">
                            <h1>CONTACT US</h1>
                        </div>
                        <div className="contact-form">
                            <div className="input-fields">
                                <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="text" className="input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" className="input" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <input type="text" className="input" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div className="msg">
                                <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                <div className="btnsend" onClick={handleFormSubmit}>send</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            {/* Conditionally render success popup */}

        </>
    )
}

export default Contact;
