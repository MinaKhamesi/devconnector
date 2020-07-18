import { REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT, USERS_LOADED, USERS_LOAD_ERR } from "../actions";

const initialState = {
    token:localStorage.getItem('token'),
    user:null,
    users:[],
    isAuthenticated:null,
    loading:true
}

export default function(state=initialState, action){
    const {type,payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {...state,
            token:payload.token,
            loading:false,
            isAuthenticated: true}
        
        case USER_LOADED:
            return {...state,
                loading: false,
                isAuthenticated:true,
                user:payload
            }

        case USERS_LOADED:
            return{
                ...state,
                users:payload,
                loading:false
            }
            
        case USERS_LOAD_ERR:
            return{
                ...state,
                users:[],
                loading:false
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case  AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {...state,
                isAuthenticated: false,
                token:null,
                loading: false,
                user:null
            }
        default:
            return state
    }
}