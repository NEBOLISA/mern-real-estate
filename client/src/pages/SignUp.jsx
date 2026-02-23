
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputForm from '../components/Authentication/input-component'
import { useSignUp } from '../hooks/useSignUp'
import OAuth from '../components/Authentication/oauth'

function SignUp() {
  const [formData, setFormData] = useState({})
 
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const signUpMutation = useSignUp()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    // try {
    //   setIsLoading(true)
    //   const res = await fetch('/api/auth/sign-up', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   })

    //   const data = await res.json()
     
    //   if (data.success === false) {
    //     setError(data.message)
    //     setIsLoading(false)
    //     return
    //   }
    //   setIsLoading(false)
    //   setError(null)
    //   navigate('/sign-in')
    // } catch (error) {
    //   setIsLoading(false)
    //   console.log(error.message)
    // } finally {
    //   setIsLoading(false)
    // }
    
    signUpMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/sign-in')
      },
      onError: (error) => {
        setError(error.message)
        if (error.message.includes("User already exists")) {
          setTimeout(() => {
            navigate('/sign-in')
          }, 1000)
          
        }
      }
    })
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <InputForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mutation = {signUpMutation}
        btnText={'sign up'}
      />
      <OAuth/>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
