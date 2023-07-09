import React, { useReducer, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import CustomInput from "../../components/CustomInput";
import CustomLabel from "../../components/CustomLabel";
import { ActionTypes } from "../../utils/types";
import useVisibleHook from "../../hooks/useVisibleHook";
import CustomLoader from "../../components/CustomLoader";
import CustomButton from "../../components/CustomButton";
import { validateEmail } from "../../utils/tools";
import { formReducer } from "../../reducer/formReducer";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import Title from "../../components/Title";

interface ErrorTypes {
  pswdErr: string;
  nameErr: string;
  emailErr: string;
}

type Errors = {
  password: string;
  email: string;
  name: string;
};
const SignUp = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [state, dispatch]: any = useReducer<any>(formReducer, initialState);
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Errors>({
    password: "",
    name: "",
    email: "",
  });
  const {state:user} = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, handleVisisble } = useVisibleHook();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    dispatch({
      type: ActionTypes.textInput,
      payload: { key: [name], value: value },
    });
  };
  const { name, email, password } = state;
  console.log(auth?.currentUser, "user");
  useEffect(() => {
    const errors = {} as Errors;

    if (password) {
      console.log(formErrors.password, "pswd");

      setFormErrors({ ...formErrors, password: (formErrors.password = "") });
    }
    const removeErrors = () => {
      if (password) {
        errors.password = "";
      }
      if (email) {
        errors.email = "";
      }
      if (name) {
        errors.name = "";
      }
      return errors;
    };
    removeErrors();
    if (!Object.keys(formErrors).length) {
    }
  }, [formErrors.password, formErrors.email, formErrors.name]);
  const handleValidation = () => {
    const errors = {} as Errors;
    if (!password) {
      errors.password = "Password is required";
    }
    console.log(password.length, "pswd length");
    if (password && password.length < 5) {
      errors.password = "Password should have atleast six characters";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (email && !validateEmail(email)) {
      errors.email = "Please use a valid email address";
    }
    if (!name) {
      errors.name = "Name is required";
    }
    return errors;
  };
  const reset = () => dispatch({ type: ActionTypes.reset });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormErrors(handleValidation());
    if (!name || !email || !password) {
      setError("Please provide all details");
    }
    setLoading(true);
    try {
      console.log(email, password);
      if (name && password && email) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoading(false);
        
        const user: any = auth?.currentUser;
        updateProfile(user, { displayName: name });
        const stateClone = Object.assign({}, state);
        delete stateClone["password"];
        stateClone.timeStamp = serverTimestamp();
        console.log(stateClone, "state clone");
        console.log(userCredential,'usercredential')
        const docRef = doc(db, "users", userCredential?.user?.uid);
        const saveTodb = await setDoc(docRef, stateClone);
        console.log(saveTodb, "response");
        setError("");
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      if (error.message.includes("email-already-in-use")) {
        setTimeout(() => {
          setError("Email already exist");
        }, 100);
      }
    }
    setLoading(false);
  };
  const signInWithGoogle = async (e: any) => {
    e.preventDefault();
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      console.log(user, "google response");
      const docRef = doc(db, "users", user?.uid)
      const docSnap = await getDoc(docRef)
      console.log(docSnap)
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(()=>{
    if(user.currentUser){
    
     toast.success('Log in succesfully')
     navigate("/login");
    }
   },[user.currentUser])
  return (
    <div className='w-ful md:w-[50%] shadow-lg rounded-2xl px-8 flex m-auto bg-white py-3 items-center justify-center h-auto mt-12'>
     <div className="w-full">
     <form onSubmit={handleSubmit} className="w-full">
        <p>{error}</p>
        <Title>Signup</Title>
        <div className="my-4">
          <CustomLabel>Name</CustomLabel>
          <CustomInput
            placeholder="John Doe"
            name="name"
            onChange={handleInputChange}
            type="text"
            value={name || ""}
          />
          <p className="text-red-500">{formErrors.name}</p>
        </div>
        <div className="my-4">
          <CustomLabel>Email</CustomLabel>
          <CustomInput
            placeholder="johndoe@gmail.com"
            name="email"
            onChange={handleInputChange}
            type="text"
            value={email || ""}
          />
          <p className="text-red-500">{formErrors.email}</p>
        </div>
        <div className="my-4">
          <CustomLabel>Password</CustomLabel>
          <div className="relative">
            <CustomInput
              name="password"
              onChange={handleInputChange}
              type={visible ? "text" : "password"}
              value={password || ""}
            />
            <div onClick={handleVisisble} className="absolute right-2 top-3">
              {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <p className="text-red-500">{formErrors.password}</p>
        </div>
        <div className="my-4 block  md:flex justify-between">
          <p>
            Have an account?{" "}
            <span className="text-[#200E32] font-semibold">
              <Link to="/login">Sign in</Link>
            </span>
          </p>
          <p>Forgot password?</p>
        </div>
        <div className="my-4">
          <CustomButton type="submit">
            {loading ? <CustomLoader /> : "Sign up"}
          </CustomButton>
        </div>
      </form>
      <form onSubmit={signInWithGoogle}>
        <div className="my-4 items-center flex before:border-t-2 before:flex-1  before:border-gray-500  after:border-t-2 after:flex-1  after:border-gray-500">
          <p className="uppercase text-center font-medium text-2xl mx-2">or</p>
        </div>

        <CustomButton name="Continue with Google" type="submit">
          <FcGoogle />
          <p className="ml-4">Continue with Google</p>
        </CustomButton>
      </form>
     </div>
    </div>
  );
};

export default SignUp;
