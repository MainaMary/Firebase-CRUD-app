import { ReactNode } from "react";
export enum ActionTypes  {
    textInput = "TEXT_INPUT",
    siginText = "SIGNIN_TEXT",
    reset = "RESET_STATE",
    login="LOG_OUT",
    logout="LOG_IN"
 }
export interface BtnProps {
    name?:string ;
    icon?: ReactNode;
    onClick?:(x:any)=>void;
    type?: "button" | "submit" | "reset";
    children?: string | ReactNode,
    disabled?: boolean;
    className?: string;

}
 export  interface initialStateType {
     name: string,
     email:string,
     password:string
 }
 export interface ErrorType {
     message:string
 }
 export interface FormTypes {
    title: string;
    desc: string;
    img?: string;
   
 }
 export interface ChildrenProps {
    children: ReactNode
}
export const USER ="user"
export interface MsgProps {
    error: boolean;
    msg: string;
  }
 export interface ImgProps {
    image: Blob | Uint8Array | ArrayBuffer;
  }
  export interface ModalProps {
    handleModal: () => void;
  }
  export interface FormProps {
    title: string;
    desc: string;
    img: string;
    timeStamp: string;
    id: string;
  }