import React,{useState, useReducer, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
import { onAuthStateChanged } from 'firebase/auth'
const Signin = () => {
  const initialState = {
    email: '',
    password:''
}
  const [state, dispatch]:any = useReducer<any>(formReducer, initialState)
  const {visible, handleVisisble} = useVisibleHook()
  const [loading, setLoading] = useState<boolean>(false)
  const [error,setError] = useState<string>('')
  const {dispatchUser, handleModal, state:user} = useAuthContext()
  const [pswdModal, setPswdModal] = useState<boolean>(false)
  
  const navigate = useNavigate()
  const handleInputChange= (event:any)=>{
    const {name, value} = event.target
    setError('')
    dispatch({
      type: ActionTypes.textInput,
      payload: { key: [name], value: value },
    })
  }
  const {email, password} = state

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUserDetails(currentUser)
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
 
 
  const handleSubmit = async (e:React.SyntheticEvent)=>{
    e.preventDefault()
    if (!email || !password) {
      setError("Please provide all details");
      return
    }
    
    if (email && !validateEmail(email)) {
      setError('Please use a valid email address')
      return
    
    } 
    
    try {
      setLoading(true)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log({userCredential})
       dispatchUser({type:ActionTypes.login, payload: userCredential?.user})
       toast.success('Log in succesfully')
       navigate("/imageList")
       
      //  handleModal()
      
      setError("");
    }
   catch(error:unknown){
    if(error instanceof Error){
      if(error.message.includes('auth/user-not-found')){
        setError('Email does not exist')
      }
      if(error.message.includes('auth/wrong-password')){
        setError('Please provide a valid password')
      }
    }
   }finally{
    setLoading(false);
   }
  
  }
  const handleForgotPassword = () =>{
  setPswdModal(prev => !prev)
  }
  useEffect(()=>{
    if(user?.currentUser){
   
     toast.success('Log in succesfully')
     
     navigate("/imageList");
    }
   },[user?.currentUser])
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
        {/* <p className='text-[#200E32]  cursor-pointer font-semibold' onClick={handleForgotPassword}>Forgot password?</p> */}
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