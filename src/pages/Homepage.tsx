import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import CustomButton from "../components/CustomButton";
import { useAuthContext } from "../context/authContext";
import Img from "../assets/imageGallery.svg";
const Homepage = () => {
  const navigate = useNavigate()
  const { openModal, handleModal, state } = useAuthContext();

   const isUserLoggedIn = () =>{
    let checker
    if(state?.accessToken){
     checker = handleModal()
    }else {
     checker = navigate('/login')
    }
    return checker
   }
  return (
    <div>
      <div className="block md:flex h-auto items-center justify-between w-full">
      <div className="w-full md:w-1/2 block md:hidden">
          <img src={Img} alt="gallery" />
        </div>
        <div className="w-full text-center md:text-start md:w-1/2">
          <p className="text-[#200E32] text-3xl   md:text-5xl leading-[54px] font-medium">
            Explore the World Through <br/> Our Lens. A Visual Journey of Captivating
            Moments
          </p>
          <p className="my-12 text-lg ">
            Welcome to our image gallery, where stunning visuals and captivating
            moments come together in one place.<br/> 
            <span className="mt-4">
            Upload all your images in one
            collection. It is a celebration of the human experience and the
            World we live in
            </span>
          </p>
          <CustomButton onClick={isUserLoggedIn}>Upload image</CustomButton>
        </div>
        <div className="w-1/2 hidden md:block">
          <img src={Img} alt="gallery" />
        </div>
      </div>
      {openModal && <Modal openModal={openModal} handleModal={handleModal} />}
    </div>
  );
};

export default Homepage;
