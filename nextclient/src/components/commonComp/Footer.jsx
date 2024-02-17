import React from "react"


const Footer = () => {

    let footerStyle = {
        backgroundColor: "#1a1a1a",
        color: "white",
        textAlign: "center",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        height : "40px",
         fontFamily: '"Baloo Bhai 2","Poppins",sans-serif',
        borderTop : "1px solid white"
    }
    return (
        <>
            <section className="footer" style={footerStyle}>
            ∞ Made by Team InnerCalm. 2023 
            </section>

        </>
    )
}

export default Footer