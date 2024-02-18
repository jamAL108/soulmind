const URL = "https://server-innercalm.vercel.app/api"

export const adduser = async (email) =>{
    const resp = await fetch(`${URL}/addUser` , {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(email)
    })
    console.log(resp)
}