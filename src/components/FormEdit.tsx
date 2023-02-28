import React,{useState, useEffect} from 'react'
import { MsgProps } from '../utils/types'
import CustomLabel from './CustomLabel'
import CustomInput from './CustomInput'
import Alert from './Alert'
import { FormTypes, ImgProps } from '../utils/types'
import { InitialValues } from '../utils/tools'
import CustomButton from './CustomButton'
import { ModalProps } from '../utils/types'
import { useAuthContext } from '../context/authContext'
import { FormProps } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
interface Props {
    item: FormProps
}
const FormEdit = () => {
    const {handleModal, itemList, setItemList} = useAuthContext()
    const initialFormState = {
        title: "",
        desc: "",
        img: "",
        timeStamp: "",
        id: "",
      };
const [formValues, setFormValues] = useState<any>(itemList);
const [imageUpload, setImageUpload] = useState<ImgProps>();
const [message,setMessage] = useState<MsgProps>({error:true, msg:""})

const {title, desc} = formValues
useEffect(()=>{
    if(itemList.id){
        setFormValues(itemList)

    }
},[itemList.id])


const handleInputChange = (e:any) =>{
    const {name, target} = e.target
  setFormValues({...formValues, [name]:target})
}
const handleSubmit = (e:any) => {
    e.preventDefault()
console.log(itemList)
try{
    const docRef = doc(db, "cities", itemList.id);
    const res = updateDoc(docRef,{...itemList})
    handleModal()
}
catch(error:any){
    console.log(error.message)
}
}
  return (
    <form
    className=" w-full md:w-1/2 rounded-md shadow-md bg-white px-8 py-4"
    onSubmit={handleSubmit}
  >
    {!message.error &&  <Alert name={message.msg} className="text-green-500 border-2 border-green-500"/>}
   
    <h2>Edit</h2>
    <div className="my-4">
      <CustomLabel>Title</CustomLabel>
      <CustomInput
        placeholder="eg Tech event"
        name="title"
        onChange={handleInputChange}
        type="text"
        value={formValues.title}
      />
    </div>
    {/* <div className="my-4">
      <CustomLabel>Select image</CustomLabel>
    
      <CustomInput
        type="file"
        required
        multiple
        name="image"
        onChange={(e: any) => setImageUpload(e.target.files[0])}
      />
    </div> */}
    <div className="my-4">
      <CustomLabel>Description</CustomLabel>
      <CustomInput
        placeholder="eg React London"
        name="desc"
        onChange={handleInputChange}
        type="text"
        value={formValues.desc}
      />
    </div>
    <div className="flex justify-between my-4">
      <CustomButton type="submit">Submit</CustomButton>
      <CustomButton onClick={handleModal}>Cancel</CustomButton>
    </div>
  </form>
  )
}

export default FormEdit