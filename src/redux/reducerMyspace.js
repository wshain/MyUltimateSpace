import { act } from "react-dom/test-utils";
import ACTIONS from "./actions"
import store from './store';

const reducerMyspace = (state = {
    username:"",
    password:"",
    confirm_password:"",
    error_message:"",
    access:"",
    refresh:"",
    is_login:false,

},action) =>{
    switch(action.type){
        case ACTIONS.SET_USERNAME:
            return {
                ...state,
                username:action.username,
            }
        case ACTIONS.SET_PASSWORD:
            return {
                ...state,
                password: action.password,
            }
        case ACTIONS.SET_ERROR_MESSAGE:
            return {
                ...state,
                error_message: action.error_message,
            }
        case ACTIONS.SET_ACCESS:
            return {
                ...state,
                access:action.access,
            }
        case ACTIONS.ISLOGIN:
            return {
                ...state,
                is_login:true,
            }
        case ACTIONS.REFRESH:
            return {
                ...state,
                access:action.access,
            }
        case ACTIONS.GETINFO:
            return {
                ...state,
                access:action.resp.access,
                refresh:action.resp.refresh,
                is_login:true,
            }
        default:
            return state;
    }

}
export default reducerMyspace;