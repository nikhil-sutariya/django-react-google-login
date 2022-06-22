import React from 'react'
import useAuth from '../useAuth'
export const Home = () => {
  const { userDetails } = useAuth()

  const user = userDetails()

  return (
    <div className='container mt-4'>
      {user ?(
        <div>Home {user.firstName}{' '}{user.lastName}</div>
      ):(
        <div>Home</div>
      )}
    </div>
  )
}
