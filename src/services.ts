import { getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { imageCollectionRef } from './constants';
import { FormProps, FormTypes,MsgProps } from './utils/types';
import { NavigateFunction } from 'react-router-dom';


export async function getImages() {
  try {
    const data = await getDocs(imageCollectionRef);
    const res = data.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
    return res;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export async function addOrUpdateDetails(itemList:FormProps, formValues:FormTypes, navigate:NavigateFunction, handleModal:  () =>void, setMessage:React.Dispatch<React.SetStateAction<MsgProps>>, setFormValues:React.Dispatch<React.SetStateAction<FormTypes>>) {
  try {
    if (itemList.id) {
      const newList = {
        title: formValues.title,
        desc: formValues.desc,
        timeStamp: serverTimestamp(),
      };
      const docRef = doc(db, "cities", itemList.id);
      await updateDoc(docRef, { ...newList });
      setFormValues((prev) => ({ ...prev, title: formValues.title, desc: formValues.desc }));
      setMessage({ error: true, msg: "Updated successfully" });
      
    } else {
      const response = await addDoc(imageCollectionRef, {
        ...formValues,
        timeStamp: serverTimestamp(),
      });
      setMessage({ error: true, msg: "Successfully created" });
      window.location.reload()
    }
    
    setTimeout(() => {
      navigate("/imageList");
      handleModal();
    }, 2000);
  } catch (error:any) {
    console.log(error);
    setMessage({ error: true, msg: error?.message });
  }
}
