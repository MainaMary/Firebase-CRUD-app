import React,{useState, useReducer} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { signInWithEmailAndPassword } from 'firebase/auth'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import CustomLabel from '../../components/CustomLabel'
import { auth } from '../../firebase'
import { ActionTypes } from '../../utils/types'
import useVisibleHook from '../../hooks/useVisibleHook'
import { formReducer } from '../../reducer/formReducer'
import { useAuthContext } from '../../context/authContext'
import Title from '../../components/Title'
import CustomLoader from '../../components/CustomLoader'
import ForgotPassword from '../user/ForgotPassword'
import { validateEmail } from '../../utils/tools'
const Signin = () => {
  const initialState = {
    email: '',
    password:''
}
  const [state, dispatch]:any = useReducer<any>(formReducer, initialState)
  const {visible, handleVisisble} = useVisibleHook()
  const [loading, setLoading] = useState<boolean>(false)
  const [error,setError] = useState<string>('')
  const {dispatchUser, handleModal} = useAuthContext()
  const [pswdModal, setPswdModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleInputChange= (event:any)=>{
    const {name, value} = event.target
    dispatch({
      type: ActionTypes.textInput,
      payload: { key: [name], value: value },
    })
  }
  const {email, password} = state
  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    if (!email || !password) {
      setError("Please provide all details");
    }
    if (email && !validateEmail(email)) {
      setError('Please use a valid email address')
    
    }
    setLoading(true)
    try {
      console.log(email, password);
      if ( password && email) {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       dispatchUser({type:ActionTypes.login, payload: userCredential?.user})
       navigate("/imageList");
       handleModal()
      }

      setLoading(false);
      setError("");
    }
   catch(error:any){
    console.log(error.message)
    if(error.message.includes('auth/user-not-found')){
      setError('Email does not exist')
    }
    if(error.message.includes('auth/wrong-password')){
      setError('Please provide valid password')
    }
    setLoading(false);
   }
   setLoading(false);
  }
  const handleForgotPassword = () =>{
  setPswdModal(prev => !prev)
  }
  return (
    <>
    <div className='w-full md:w-[50%] shadow-lg rounded-2xl flex m-auto bg-white px-8 py-3 items-center justify-center h-auto mt-12'>
    <form className='w-full' onSubmit={handleSubmit}>
      <Title>Login</Title> 
      <p className="text-red-500">{error}</p>
      <div className='my-4'>
        <CustomLabel>Email</CustomLabel>
        <CustomInput placeholder="John Doe" name="email" onChange={handleInputChange} type="text" value={email || ''}/>
      </div>
      <div className="my-4">
        <CustomLabel>Password</CustomLabel>
        <div className="relative">
        <CustomInput name="password" onChange={handleInputChange} type={visible ? "text" :"password"} value={password || ''}/>
          <div onClick={handleVisisble} className="absolute right-2 top-3">
          {visible ? <AiFillEyeInvisible/> : <AiFillEye/>}
          </div>
        
        </div>
        
      </div>
      <div className="my-4 block  md:flex justify-between">
        <p>Don't have an account? <span className="text-[#200E32] font-semibold"><Link to="/register">Sign up</Link></span></p>
        <p className='text-[#200E32]  cursor-pointer font-semibold' onClick={handleForgotPassword}>Forgot password?</p>
      </div>
      <div className="my-4">
        <CustomButton type="submit">{loading ? <CustomLoader/> :"Sign in"}</CustomButton>
      </div>
    </form>
  </div>
  {pswdModal && <ForgotPassword pswdModal={pswdModal} handleModal={handleForgotPassword}/>}
    </>
    
  )
}

export default Signin