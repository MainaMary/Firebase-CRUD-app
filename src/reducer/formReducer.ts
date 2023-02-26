import { ActionTypes,initialStateType } from "../utils/types";
interface IProps {
    key:string;
    value:string
}
interface Props {
    type:string;
    payload: IProps
}

const initialState = {
  name:'',
  email: '',
  password:''
}
export const formReducer = (state:initialStateType, action:Props) => {
    const {type, payload} = action
    switch (type) {
      case ActionTypes.textInput:
        return {
          ...state,
          [payload.key]: payload.value,
        };
      case ActionTypes.siginText:
        return {
          ...state,
          [payload.key]: payload.value
        }
      case  ActionTypes.reset:
        return {initialState}
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
  };