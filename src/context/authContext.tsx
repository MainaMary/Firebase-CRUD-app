import { useContext, createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "../reducer/authReducer";
import { ChildrenProps } from "../utils/types";
import { USER } from "../utils/types";

const initialState ={
    currentUser: JSON.parse(localStorage.getItem(USER) || null)
}
const initialContext ={
    state: { currentUser: {} | 0 } ,
    dispatchUser: () => null,
}
    

const AuthContext = createContext<{
    state: { currentUser: {}; } | { currentUser: null; };
    dispatchUser: React.Dispatch<any>;
}>(initialContext)

export const useAuthContext = () =>{
    return useContext(AuthContext)
}

const AuthContextProvider = ({children}:ChildrenProps) =>{
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    useEffect(()=>{
        if(state.currentUser){
            localStorage.setItem(USER, JSON.stringify(state.currentUser))
        }
        
    },[state.currentUser])
    const value = {
    state : state,
    dispatchUser: dispatch
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider