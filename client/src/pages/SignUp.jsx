import { ClipLoader } from 'react-spinners'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
     
      if (data.success === false) {
        setError(data.message)
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
    
 
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Name'
          className='border-[0.1px] border-gray-200 rounded-lg p-3 bg-white'
          id='name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Email'
          className='border-[0.1px] border-gray-200 rounded-lg p-3 bg-white'
          id='email'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Password'
          className='border-[0.1px] border-gray-200 rounded-lg p-3 bg-white'
          id='password'
          onChange={handleChange}
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed'
        >
          {isLoading ? <ClipLoader size={25} color='white' /> : 'Sign Up'}
        </button>
      </form>
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
