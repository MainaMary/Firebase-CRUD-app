import { ActionTypes } from "../utils/types";
interface Props {
    type:string;
    payload: string
}

export const AuthReducer = (state:any, action:Props) => {
  const { type, payload } = action;
  switch (type) {
    case  ActionTypes.login:
        return{
            currentUser: payload
        }
    case ActionTypes.logout:
        return{
            currentUser: null
        }
    default:
        throw new Error(`Unknown action:${type}`)
  }
};
