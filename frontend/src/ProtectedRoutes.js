import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from './useAuth'
// import { useAuth } from './useAuth'

export const ProtectedRoutes = () =>{
  // const { authenticated } = useAuth()
  const { userDetails } = useAuth()

  const user = userDetails()

  return (user ? <Outlet /> : <Navigate to ='/login' />)
}