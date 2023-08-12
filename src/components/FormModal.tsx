import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";
import CustomButton from "./CustomButton";
import {
  FormTypes,
  MsgProps,
  ImgProps,
  ModalProps,
  ActionTypes,
} from "../utils/types";
import { InitialValues } from "../utils/tools";
import { addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../firebase";
import Alert from "./Alert";
import { useAuthContext } from "../context/authContext";
import { imageCollectionRef } from "../constants";
import { db } from "../firebase";
import { getImages } from "../services";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addOrUpdateDetails } from "../services";

const FormModal = ({ handleModal }: ModalProps) => {
  const [formValues, setFormValues] = useState<FormTypes>(InitialValues);
  const [values, setValues] = useState<FormTypes[]>([]);
  const [imageUpload, setImageUpload] = useState<
    Blob | ArrayBuffer | undefined
  >(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<MsgProps>({ error: false, msg: "" });
  const { itemList, setItemList } = useAuthContext();
  const navigate = useNavigate();

  const { title, desc } = formValues;
  useEffect(() => {
    const uploadFile = async () => {
      const storageRef = ref(storage, `images/${Date.now()}`);
      try {
        const uploadTask = uploadBytesResumable(storageRef, imageUpload);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("paused upload");
                break;
              case "running":
                console.log("upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL, "download url");

              setFormValues((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
      } catch (error: any) {
        console.log(error);
      }
    };
    imageUpload && uploadFile();
  }, [imageUpload]);
  useEffect(() => {
    if (itemList) {
      setFormValues(itemList);
    }
  }, [itemList.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(itemList);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (title && desc) {
      setValues([...values, { title, desc }]);
    }
    // await addOrUpdateDetails(itemList, formValues, navigate, handleModal, setMessage, setFormValues);
    try {
      if (itemList.id) {
        const newList = {
          title,
          desc,
          timeStamp: serverTimestamp(),
        };
        console.log(newList);
        const docRef = doc(db, "images", itemList.id);
        const res = await updateDoc(docRef, { ...newList });
        setFormValues((prev) => ({ ...prev, title, desc }));
        setTimeout(() =>{
          window.location.reload()
        },200)
       
        
      } else {
        const response = await addDoc(imageCollectionRef, {
          ...formValues,
          timeStamp: serverTimestamp(),
        });

        window.location.reload();
        console.log("add details");
      }

      setMessage({
        error: true,
        msg: itemList.id ? "Updated successfully" : "Successfuly created",
      });

      setTimeout(() => {
        navigate("/imageList");
        handleModal();
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setMessage({ error: true, msg: error?.message });
    }
  };
  return (
    <form
      className=" w-full md:w-1/2 rounded-md shadow-md bg-white z-40 px-8 py-4"
      onSubmit={handleSubmit}
    >
      {message.error && (
        <Alert
          name={message.msg}
          className="text-green-500 border-2 border-green-500"
        />
      )}

      <h2>{itemList.id ? "Edit" : "Upload image"}</h2>
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

      {!itemList.id && (
        <div className="my-4">
          <CustomLabel>Select image</CustomLabel>
          <p>
            {progress === 100
              ? "upload complete"
              : progress > 5
              ? "upload in progress"
              : ""}
          </p>
          <CustomInput
            type="file"
            required
            multiple
            name="image"
            onChange={(e: any) => setImageUpload(e.target.files[0])}
          />
        </div>
      )}

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
      <div className="flex justify-between my-4">
        <CustomButton
          className="disabled:opacity-50"
          type="submit"
          disabled={!itemList.id && progress < 100 && progress !== null}
        >
          {itemList.id ? "Edit" : "Submit"}
        </CustomButton>
        <CustomButton
          onClick={() => {
            handleModal(), setItemList(InitialValues);
          }}
        >
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default FormModal;
