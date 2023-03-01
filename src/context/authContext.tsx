import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { AuthReducer } from "../reducer/authReducer";
import { ChildrenProps } from "../utils/types";
import { USER, FormProps } from "../utils/types";
import { InitialValues } from "../utils/tools";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}')
  
};
const initialFormState = {
    title: "",
    desc: "",
    img: "",
    timeStamp: "",
    id: "",
  };
const initialContext = {
  state:InitialValues,
  dispatchUser: () => null,
  edit: false,
  setEdit: () => null,
  openModal: false,
  handleModal: () => null,
  setOpenModal: () => null,
  itemList: initialFormState,
  setItemList: () => null,
};



const AuthContext = createContext<{
  state: any,
  dispatchUser: React.Dispatch<any>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  openModal: boolean;
  handleModal: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  itemList: FormProps;
  setItemList: React.Dispatch<React.SetStateAction<FormProps>>;
}>(initialContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [edit, setEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [itemList, setItemList] = useState<FormProps>(initialFormState);
  
  const handleModal = () => {
    setOpenModal((prev) => !prev);

  };
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem(USER, JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);
  const value = {
    state:state.currentUser,
    dispatchUser: dispatch,
    edit,
    setEdit,
    openModal,
    handleModal,
    setOpenModal,
    itemList,
    setItemList,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
