import React from 'react'
import { useState } from 'react'
import { useSignIn } from '../hooks/useSignIn'
import InputForm from '../components/Authentication/input-component'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({})
 const navigate = useNavigate()
  const signInMutation = useSignIn()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })  
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    signInMutation.mutate(formData, {
      onSuccess: () => {
       
       navigate("/")
      },
      
    })
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <InputForm handleChange={handleChange} handleSubmit={handleSubmit} mutation={signInMutation}  btnText={"sign in"} />
      </div>
  )
}

export default SignIn
