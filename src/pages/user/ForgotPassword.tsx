import React from 'react'

interface ModalProps {
  pswdModal: boolean;
  handleModal: () =>void;
}
const ForgotPassword = ({pswdModal, handleModal}:ModalProps) => {
  if(!pswdModal) return null
  return (
    <div className='fixed  flex justify-center w-ful h-full items-center bg-[#171616] opacity-95 top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
     <div className='rounded-md bg-white w-full md:w-[40%] px-8 py-3 flex h-auto items-center justify-between'>
      <p>Coming soon!!</p>
      <p onClick={handleModal} className=' cursor-pointer text-3xl font-semibold'>X</p>
     </div>
    </div>
  )
}

export default ForgotPassword