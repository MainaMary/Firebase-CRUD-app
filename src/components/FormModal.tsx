import React,{useState} from 'react'
import CustomInput from './CustomInput'
import CustomLabel from './CustomLabel'
import CustomButton from './CustomButton'
import { FormTypes } from '../utils/types'
import { addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'
import { storage } from '../firebase'
import { async } from '@firebase/util'
import {ref, uploadBytes} from "firebase/storage"

interface Props {
    handleModal: () => any
}
const InitialValues = {
    title: "",
    desc: "",
   
}
const FormModal = ({handleModal}:Props) => {
 const [formValues, setFormValues] = useState<FormTypes>(InitialValues)
 const [values, setValues] = useState<FormTypes[]>([])
 const [imageUpload, setImageUpload] = useState(null)
 const [err, setErr] = useState<string>('')
 const {title, desc} = formValues
 const handleInputChange = (e:any) =>{
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value})
 }
 const handleImageUpload = async () =>{
    if(!imageUpload){
      setErr('Please select an image')
    }
 }
 const handleSubmit = async (e:any) =>{
    e.preventDefault()
    if(title && desc){
       setValues([...values,{title,desc}])
    }
  try{
    const response = await addDoc(collection(db,"cities"),{
      title,
      desc,
      timeStamp: serverTimestamp()

    })
    console.log(response);
    
  }
  catch(error:any){
    console.log(error)
  }
    
 }
  return (
    <form className=' w-full md:w-1/2 rounded-md shadow-md bg-white px-8 py-4' onSubmit={handleSubmit}>
        <h2>Add image</h2>
        <div className="my-4">
          <CustomLabel>Title</CustomLabel>
          <CustomInput
            placeholder="eg Tech event"
            name="title"
            onChange={handleInputChange}
            type="text"
            value={title}
          />
         
        </div>
        <div className="my-4">
        <CustomLabel>Select image</CustomLabel>
        <CustomInput type="file" required multiple name="image" onChange={(e:any)=>setImageUpload(e.target.files[0])} />
        </div>
        <div className="my-4">
        <CustomLabel>Description</CustomLabel>
          <CustomInput
            placeholder="eg React London"
            name="desc"
            onChange={handleInputChange}
            type="text"
            value={desc}
          />
        </div>
        <div className='flex justify-between my-4'>
        <CustomButton type="submit">Submit</CustomButton>
        <CustomButton onClick={handleModal}>Cancel</CustomButton>
        </div>
       
    </form>
  )
}

export default FormModal