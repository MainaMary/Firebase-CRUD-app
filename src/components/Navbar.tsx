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
import { USER } from "../utils/types";
import { ActionTypes } from "../utils/types";


const Navbar = () => {
  const [userTooltip, setUserToolTip] = useState(false);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const { openModal, handleModal, state:currentUser, dispatchUser } = useAuthContext();
  const handleTooltip = () => {
    setUserToolTip((prev) => !prev);
  };
  const handleMenu = () =>{
    setOpen(prev => !prev)
  }
  const handleLogout = async () =>{
    try{
     const user = await signOut(auth)
     console.log(user,'logout')
     navigate('/login')
     dispatchUser({type:ActionTypes.login, payload: {}})
     localStorage.removeItem(USER)
    
    }
    catch(error:any){
     console.log(error?.message)
    }
  }
  console.log(auth?.currentUser)
  return (
    <nav className="h-24 flex  w-full justify-between items-center">
      <div onClick={() => navigate("/")} className="font-bold text-4xl h-auto items-center  text-[#200E32] cursor-pointer flex talic">
      <h3  className="mr-2" >IGallery </h3>
      <BsImage/>
      </div>
      
      <div className={open ?  "fixed w-[60%] top-0 left-0": "hidden md:block"} >
        { currentUser.uid ? (
          <div className="flex h-auto items-center z-index">
            <div>
              <FaUserAlt onClick={handleTooltip} size={25} />
              {userTooltip && (
                <div className="absolute shadow-md rounded-sm w-full px-3 py-2">
                  <p>
                  {currentUser?.displayName}
                  </p>
                  <CustomButton onClick={handleLogout} >Logout</CustomButton>
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
