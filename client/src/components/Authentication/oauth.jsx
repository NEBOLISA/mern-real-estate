import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import app from '../../firebase'
import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import { useNavigate } from 'react-router-dom'
function OAuth() {
    const navigate = useNavigate()
    const googleSignInMutation = useGoogleAuth()
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            signInWithPopup(auth, provider)
                .then((result) => {
              googleSignInMutation.mutate({
                name: result.user.displayName,
                email: result.user.email,
                  avatar: result.user.photoURL,
                providerId: result.providerId
              })
              navigate('/')
                    
            })
        } catch (error) {
           
          console.log("could not sign in with google", error)  
        }
    }
  return (
    <button type="button" onClick={handleGoogleAuth} className='bg-red-700 uppercase text-white p-3 rounded-lg hover:opacity-95 w-full mt-3 cursor-pointer'>
      continue with google
    </button>
  )
}

export default OAuth