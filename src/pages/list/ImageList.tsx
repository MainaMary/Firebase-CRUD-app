import React, { useState, useEffect } from "react";
import { getDocs,deleteDoc, doc , collection } from "firebase/firestore";
import { db } from "../../firebase";
import { FormProps } from "../../utils/types";
import Modal from "../../components/Modal";
import { useAuthContext } from "../../context/authContext";
import CustomButton from "../../components/CustomButton";

interface ItemProps {
  item: FormProps;
  data: any;
  setData: (x: any) => void;
}
export const ImageCard = ({ item, data, setData }: ItemProps) => {
  const [itemList, setItemList] = useState<FormProps>({
    title: '',
    desc: '',
    img: '',
    timeStamp: '',
    id: ''
  })
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const { setEdit,handleModal,} = useAuthContext()
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
      <div className="flex justify-center m-auto h-[250px] text-center">
        <img src={img} alt={title} className="h-auto text-center" />
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
  const { openModal, handleModal, itemList, setItemList} = useAuthContext()
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
 
 
  const handleDelete = async (id: string) => {
    console.log('deleted item')
    console.log({id})
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
    //setEdit(true)
     handleModal()
    const imageDoc = doc(db,"cities", item.id)
    
    //await updateDoc(imageDoc,item);
  };
 
 console.log({data})
  return (
    <>
     <div className="grid justify-items-stretch grid-cols-1 md:grid-cols-4 gap-12 pt-24">
      {data.map((item: FormProps,index:number) => (
        // <ImageCard key={item.id} item={item} data={data} setData={setData} />
        <div key={index} className="border-solid border-2  border-gray-300   w-full rounded-md px-3  py-4">
        <div className="flex justify-center m-auto text-center px-3">
          <img src={item.img} alt={item.title} className=" shadow-lg w-[300px] h-[150px] text-center" />
        </div>
        <div className="my-4">
          <p className="text-xl text-[#200E32]">{item.title}</p>
          <p>{item.desc}</p>
        </div>
        <div className="flex justify-between">
          <button className="  cursor-pointer rounded-lg px-5 py-2.5 mr-2 mb-2 border-solid border-2 hover:bg-[#200E32] hover:text-white focus:ring-4 focus:none border-[#200E32] bg-transparent text-[#200E32]" onClick={() =>{ handleEdit(item), setItemList(item);}}>Edit</button>
          <button className=" cursor-pointer rounded-lg px-5 py-2.5 mr-2 mb-2 border-solid border-2 bg-transparent border-red-700 text-red-700" onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
      ))}
    </div>
    {openModal && <Modal handleModal={handleModal} />}
    </>
   
  );
};
export default ImageList;
