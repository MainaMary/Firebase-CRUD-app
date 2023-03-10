import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {BsImage} from "react-icons/bs"
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuthContext } from "../context/authContext";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [userTooltip, setUserToolTip] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate();
  const { openModal, handleModal, state } = useAuthContext();
  console.log(state?.displayName, state?.accessToken, "state");
  const handleTooltip = () => {
    setUserToolTip((prev) => !prev);
  };
  const handleMenu = () =>{
    setOpen(prev => !prev)
  }
  const handleLogout = async () =>{
    try{
      await signOut(auth)
    }
    catch(error:any){
     console.log(error?.message)
    }
  }
  return (
    <nav className="h-24 flex  w-full justify-between items-center">
      <div onClick={() => navigate("/")} className="font-bold text-4xl h-auto items-center  text-[#200E32] cursor-pointer flex talic">
      <h3  className="mr-2" >IGallery </h3>
      <BsImage/>
      </div>
      
      <div className={open ?  "fixed w-[60%] top-0 left-0": "hidden md:block"} >
        {state?.accessToken ? (
          <div className="flex h-auto items-center">
            <div>
              <CustomButton onClick={handleModal} >Upload image</CustomButton>
            </div>
            <div>
              <FaUserAlt onClick={handleTooltip} />
              {userTooltip && (
                <div className="shadow-md rounded-sm w-1/2 px-3 py-2">
                  <p>
                  {state?.displayName}
                  </p>
                  <CustomButton onClick={handleLogout} className="border-solid border-2 hover:bg-[#200E32] hover:text-white focus:ring-4 focus:none border-[#200E32] bg-transparent text-[#200E32] ">Logout</CustomButton>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={open ? "block mt-12 px-4" :"flex"}>
            <CustomButton onClick={() => navigate("/login")}>
              Sign in
            </CustomButton>
            <CustomButton onClick={() => navigate("/register")}>
              Sign up
            </CustomButton>
          </div>
        )}
      </div>
      <div className="block md:hidden" onClick={handleMenu}>
        {open ? <AiOutlineClose/> :<FiMenu />}
      </div>
      {openModal && <Modal openModal={openModal} handleModal={handleModal} />}
    </nav>
  );
};

export default Navbar;
