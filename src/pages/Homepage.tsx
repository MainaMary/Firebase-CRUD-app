import React,{useState} from 'react'
import Modal from '../components/Modal'
import CustomButton from '../components/CustomButton'
import { useAuthContext } from '../context/authContext'
const Homepage = () => {
  const {openModal, handleModal} = useAuthContext()
  // const [openModal, setOpenModal] = useState<boolean>(false)
  // const handleModal = () =>{
  //   setOpenModal(prev => !prev)
  // }
  return (
    <div>
      <div className='flex justify-between w-full'>
        <p>Homepage</p>
      
      </div>
      
     
    </div>
  )
}

export default Homepage