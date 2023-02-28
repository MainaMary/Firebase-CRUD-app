import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { MsgProps } from "../../utils/types";
import { FormProps } from "../../utils/types";
import Modal from "../../components/Modal";
import { useAuthContext } from "../../context/authContext";

interface ItemProps {
  item: FormProps;
  data: any;
  setData: (x: any) => void;
}
export const ImageCard = ({ item, data, setData }: ItemProps) => {
  const [imgId, setImgId] = useState<string>('')
  const [message, setMessage] = useState<MsgProps>({error: true, msg:""})
  const [itemList, setItemList] = useState<FormProps>({
    title: '',
    desc: '',
    img: '',
    timeStamp: '',
    id: ''
  })
  const {edit, setEdit, openModal, handleModal, setOpenModal} = useAuthContext()
  const { title, desc, img, timeStamp, id } = item;
  const handleDelete = async (id: string) => {
    try {
      const imageDoc = doc(db, "cities", id)
      await deleteDoc(imageDoc);
      const filteredItems = data.filter((item: FormProps) => item.id !== id);
      setData(filteredItems);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleEdit = async (item:FormProps) => {
   
   console.log(item,'handle Edit')
    setEdit(true)
     handleModal()
    const imageDoc = doc(db,"cities", id)
    
    //await updateDoc(imageDoc,item);
  };
  console.log(itemList,'itemss')
 
  return (
    <>
    <div className="bg-white border border- shadow-md  w-full rounded-md px-3 text-center py-2">
      <div className="flex justify-center m-auto text-center">
        <img src={img} alt={title} className="w-[200px] text-center" />
      </div>
      <div>
        <p>{title}</p>
        <p>{desc}</p>
      </div>
      <div className="flex">
        <button onClick={() =>{ handleEdit(item), setItemList(item);}}>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
   
    </>
    
  );
};
const ImageList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleFetch = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, "cities"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc?.id, ...doc?.data() });
        });
        setData(list);
      } catch (error: any) {
        console.log(error);
      }
    };
    handleFetch();
  }, []);
 
  const {edit, setEdit, openModal, handleModal, itemList, setItemList} = useAuthContext()
  const handleDelete = async (id: string) => {
    try {
      const imageDoc = doc(db, "cities", id)
      await deleteDoc(imageDoc);
      const filteredItems = data.filter((item: FormProps) => item.id !== id);
      setData(filteredItems);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleEdit = async (item:FormProps) => {
   
   console.log(item,'handle Edit')
    setEdit(true)
     handleModal()
    const imageDoc = doc(db,"cities", item.id)
    
    //await updateDoc(imageDoc,item);
  };
  console.log(itemList,'list')

  return (
    <>
     <div className="grid justify-items-stretch grid-cols-3 gap-20 pt-24">
      {data.map((item: FormProps) => (
        // <ImageCard key={item.id} item={item} data={data} setData={setData} />
        <div key={item.id} className="bg-white border border- shadow-md  w-full rounded-md px-3 text-center py-2">
        <div className="flex justify-center m-auto text-center">
          <img src={item.img} alt={item.title} className="w-[200px] text-center" />
        </div>
        <div>
          <p>{item.title}</p>
          <p>{item.desc}</p>
        </div>
        <div className="flex">
          <button onClick={() =>{ handleEdit(item), setItemList(item);}}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
      ))}
    </div>
    {openModal && edit && <Modal handleModal={handleModal} />}
    </>
   
  );
};
export default ImageList;
