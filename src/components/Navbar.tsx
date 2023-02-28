import React from 'react'
import CustomButton from './CustomButton'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useAuthContext } from '../context/authContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {edit,openModal, handleModal} = useAuthContext()
  return (
    <nav className='h-24 flex   w-full justify-between items-center'>
      <h3 onClick={() =>navigate('/')}>Gallery Logo</h3>
      <div className='flex'>
        <CustomButton onClick={() =>navigate('/login')}>Sign in</CustomButton>
        <CustomButton onClick={() => navigate('/register')}>Sign up</CustomButton>
      </div>
      <div>
      <CustomButton onClick={handleModal}>Add image</CustomButton>
      </div>
        {openModal  && <Modal openModal={openModal} handleModal={handleModal}/>}
    </nav>
  )
}

export default Navbar