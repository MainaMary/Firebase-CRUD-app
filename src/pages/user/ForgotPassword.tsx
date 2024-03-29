import React,{useState} from 'react'
import CustomButton from '../../components/CustomButton';
import CustomLabel from '../../components/CustomLabel';
import CustomInput from '../../components/CustomInput';

interface ModalProps {
  pswdModal: boolean;
  handleModal: () =>void;
}
const ForgotPassword = ({pswdModal, handleModal}:ModalProps) => {
  const [email, setEmail] = useState('')
  const handleChange = (e:any) =>{
    setEmail(e.target.value)
  }
  if(!pswdModal) return null
  return (
    <div className='fixed  flex justify-center w-ful h-full items-center bg-[#171616] opacity-95 top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
     <div className='rounded-md bg-white w-full md:w-[30%] px-8 py-3 flex h-auto items-center justify-between'>
      <div className='w-full' >
        <div className='flex justify-between'>
        <p>Change password</p>
      <p onClick={handleModal} className=' cursor-pointer text-2xl font-semibold'>X</p>
        </div>
       
      <form className='w-ful'>
        <CustomLabel>Email addres</CustomLabel>
        <CustomInput type="text" name="email" onChange={handleChange} value={email}/>
        <CustomButton className='my-4'>Change password</CustomButton>
      </form>
      </div>

     
     </div>
    </div>
  )
}

export default ForgotPassword