const URL = "https://server-innercalm.vercel.app/api"

export const getAllappointment = async (formdata) => {
  try {
    const resp = await fetch(`${URL}/submitReq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata.email)
    })
    return { status: true, data: resp.data }
  } catch (err) {
    console.log(err)
    return { error: err.message }
  }
}

export const AddAppointment = async (formdata) => {
  try {
    const resp = await fetch(`${URL}/submitReq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata.email)
    })
    return { status: true, data: resp.data }
  } catch (err) {
    console.log(err)
    return { error: err.message }
  }
}