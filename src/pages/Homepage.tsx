import React,{useState} from 'react'
import Modal from '../components/Modal'
import CustomButton from '../components/CustomButton'
const Homepage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleModal = () =>{
    setOpenModal(prev => !prev)
  }
  return (
    <div>
      <div className='flex justify-between w-full'>
        <p>Homepage</p>
        <CustomButton onClick={handleModal}>Add image</CustomButton>
      </div>
      {}
      {openModal && <Modal openModal={openModal} handleModal={handleModal}/>}
    </div>
  )
}

export default Homepage