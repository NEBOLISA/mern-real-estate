/* eslint-disable no-unused-vars */
import axios from 'axios'
export const postRequest = async (url, data) => {

  try {
    const res = await axios.post(url, data, {
      withCredentials: true
    })

    const result = res.data

    if (result.success === false) {
      throw new Error(result.message ?? 'Something went wrong')
    }

    return result
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}
export const putRequest = async (url, data) => {
  try {
    const res = await axios.put(url, data, {
      withCredentials: true
    })

    return res.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}
export const getRequest = async (url) => {
  try {
    const res = await axios.get(url, {
      withCredentials: true
    })

    return res.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const deleteRequest = async (url) => {
  try {
    const res = await axios.delete(url, {
      withCredentials: true
    })

    return res.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}