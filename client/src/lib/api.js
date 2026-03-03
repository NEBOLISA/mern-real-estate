/* eslint-disable no-unused-vars */
import axios from "axios"
export const postRequest = async (url, data) => {
    console.log({data})
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    if(result.success === false) {
        throw new Error(result.message || 'Something went wrong')
    }
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
  
    return result
}
export const putRequest = async (url, data, type) => {
    const config = {
      withCredentials: true
    }

    if (type === "file") {
        const res = await axios.put(url, data, config)
       
        return res.data
    }
    const res = await axios.put(url, data, config)
    return res.data
}
export const getRequest = async (url,credentials="include") => {  
    const res = await fetch(url,{credentials})
    const result = await res.json()
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
    return result
}

export const deleteRequest = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })
    const result = await res.json()
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
    return result
}