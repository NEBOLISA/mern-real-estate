import React from 'react'
import { useState } from 'react'
import { useSignIn } from '../hooks/useSignIn'
import InputForm from '../components/Authentication/input-component'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/Authentication/oauth'


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
      <InputForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mutation={signInMutation}
        btnText={'sign in'}
      />
      <OAuth/>
      <div className='flex gap-2 mt-5'>
        <p>Don&apos;t have an account</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
