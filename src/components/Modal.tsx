import React, { Children, ReactNode } from 'react'
import FormModal from './FormModal';
import FormEdit from './FormEdit';
import { useAuthContext } from '../context/authContext';
import { M } from '../utils/types';

const Modal = (props:M) => {
    const {openModal, handleModal} = props
     
    if(!openModal) return null
  return (
    <div className='fixed  flex justify-center w-ful h-full items-center bg-[#171616] opacity-95 top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
    { <FormModal handleModal={handleModal}/>}
    </div>
  )
}

export default Modal