export const postRequest = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
    return result
}

export const getRequest = async (url) => {  
    const res = await fetch(url)
    const result = await res.json()
    if (!res.ok) {
        throw new Error(result.message || 'Something went wrong')
    }
    return result
}