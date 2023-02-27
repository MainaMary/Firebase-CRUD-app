import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

interface Props {
  title: string;
  desc: string;
  img: string;
  timeStamp: string;
  id: string;
}
interface ItemProps {
  item: Props;
  data: any;
  setData: (x: any) => void;
}
export const ImageCard = ({ item, data, setData }: ItemProps) => {
  const { title, desc, img, timeStamp, id } = item;
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "cities", id));
      const filteredItems = data.filter((item: Props) => item.id !== id);
      setData(filteredItems);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    await updateDoc(doc(db, "todos"));
  };
  return (
    <div className="bg-white border border- shadow-md  w-full rounded-md px-3 text-center py-2">
      <div className="flex justify-center m-auto text-center">
        <img src={img} alt={title} className="w-[200px] text-center" />
      </div>
      <div>
        <p>{title}</p>
        <p>{desc}</p>
      </div>
      <div className="flex">
        <button>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
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
  console.log(data, "data model");

  return (
    <div className="grid justify-items-stretch grid-cols-3 gap-20">
      {data.map((item: Props) => (
        <ImageCard key={item.id} item={item} data={data} setData={setData} />
      ))}
    </div>
  );
};
export default ImageList;
