import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { ChildrenProps } from '../utils/types'

const ProtectedRoutes = ({children}:ChildrenProps) => {
const {state} = useAuthContext()
  return (
    <div>{ state  ? children : <Navigate to="/login"/>}</div>
  )
}

export default ProtectedRoutes
