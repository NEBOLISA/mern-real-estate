import React from 'react'
import { useUser } from '../hooks/useUser'

function Home() {
  const { data: user } = useUser()
 
  
  console.log(user)
  return (
    <div>
      
    </div>
  )
}

export default Home
