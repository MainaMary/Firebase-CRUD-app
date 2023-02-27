import React from 'react'
import CustomButton from './CustomButton'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <nav className='h-24 flex justify-between items-center'>
      <h3 onClick={() =>navigate('/')}>Gallery Logo</h3>
      <div className='flex'>
        <CustomButton onClick={() =>navigate('/login')}>Sign in</CustomButton>
        <CustomButton onClick={() => navigate('/register')}>Sign up</CustomButton>
      </div>
     
    </nav>
  )
}

export default Navbar