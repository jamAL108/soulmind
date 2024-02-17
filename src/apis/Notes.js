const URL = "https://server-innercalm.vercel.app/api"

export const AddNote = async (formdata) => {
    try {
        const Data = {
            email:formdata.email,
            data:formdata.data
        }
        console.log(formdata)
        const resp = await fetch(`${URL}/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(Data)
        })
        return resp;
    } catch (err) {
        return {error:err.message}
    }
}

export const GetAllNOtes = async (email) => {
    try {
        const resp = await fetch(`${URL}/allNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email})
        })
        const msg = await resp.json()
        return msg.data
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteNote = async (_id) =>{
    try {
        const resp = await fetch(`${URL}/deleteNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({_id})
        })
        const msg = await resp.json()
        return msg.data
    }
    catch (err) {
        console.log(err)
    }
}