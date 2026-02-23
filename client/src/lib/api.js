/* eslint-disable no-unused-vars */
export const postRequest = async (url, data) => {
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

export const getRequest = async (url,credentials="include") => {  
    const res = await fetch(url,{credentials})
    const result = await res.json()
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
    return result
}