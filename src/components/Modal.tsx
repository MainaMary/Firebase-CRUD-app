import React, { Children, ReactNode } from 'react'
import FormModal from './FormModal';
import FormEdit from './FormEdit';
import { useAuthContext } from '../context/authContext';
import { FormProps } from '../utils/types';
interface Props {
    openModal?: boolean;
    handleModal : () => void;
    children?: ReactNode; 
   
}
const Modal = (props:Props) => {
    const {openModal, handleModal} = props
    const {edit} = useAuthContext()
     
    if(!openModal) return null
  return (
    <div className='fixed  flex justify-center w-ful h-full items-center bg-[#171616] opacity-80 top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
    { <FormModal handleModal={handleModal}/>}
    </div>
  )
}

export default Modal