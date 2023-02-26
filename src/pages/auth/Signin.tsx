import React,{useState, useReducer} from 'react'
import { Link } from 'react-router-dom'
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
const Signin = () => {
  const initialState = {
    email: '',
    password:''
}
  const [state, dispatch]:any = useReducer<any>(formReducer, initialState)
  const {visible, handleVisisble} = useVisibleHook()
  const [loading, setLoading] = useState<boolean>(false)
  const [error,setError] = useState<string>('')
  const {dispatchUser} = useAuthContext()
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
    if( !email || !password){
      setError('Please provide all details')
    }
    try {
      console.log(email, password);
      if ( password && email) {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       dispatchUser({type:ActionTypes.login, payload: userCredential?.user})
       // navigate("/login");
      }

      setLoading(true);
      setError("");
    }
   catch(error:any){
    console.log(error.message)
   }
  }
  return (
    <div>
    <form className='w-full' onSubmit={handleSubmit}>
      <div className='my-4'>
        <CustomLabel>Email</CustomLabel>
        <CustomInput placeholder="John Doe" name="name" onChange={handleInputChange} type="text" value={email || ''}/>
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
        <p>Don't have an account? <span className="text-primary-color"><Link to="/register">Sign up</Link></span></p>
        <p>Forgot password?</p>
      </div>
      <div className="my-4">
        <CustomButton type="submit">Sign in</CustomButton>
      </div>
    </form>
  </div>
  )
}

export default Signin