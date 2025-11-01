import ACTIONS from "./actions"

const reducerMyspace = (state = {
    id: "",
    username:"",
    password:"",
    photo:null,
    followerCount: 0,
    is_followed: false,
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
                id:action.resp.id,
                photo:action.resp.photo,
                is_followed: action.resp.is_followed,
                access:action.resp.access,
                refresh:action.resp.refresh,
                is_login:true,
            }
        case ACTIONS.LOGOUT:
            return {
                ...state,
                id:"",
                username:"",
                photo:null,
                followerCount:0,
                access:"",
                refresh:"",
                is_login:false,
            }
        default:
            return state;
    }

}
export default reducerMyspace;