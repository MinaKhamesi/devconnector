import {PROFILE_LOADED,PROFILE_ERR,CLEAR_PROFILE,CREATE_PROFILE, UPDATE_PROFILE,PROFILES_LOADED} from '../actions';
const initialState ={
    profile:null,
    profiles:[],
    loading:true,
    repos:[],
    error:{}
}

export default function(state=initialState,action){
    const {type,payload} = action;
    switch (type) {
        case PROFILE_LOADED:
        case CREATE_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILES_LOADED:
            return{
                ...state,
                profiles:payload,
                loading:false
            }

        case PROFILE_ERR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
        default:
            return state;
    }
}