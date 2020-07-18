import {GROUPS_LOADED,GROUP_ERR, MEMBERS_UPDATED_GROUPS,GROUP_REMOVED} from '../actions';

const initialState = {
    groups:[],
    group:null,
    userIsMember:false,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload} = action;
    switch (type){
        case GROUPS_LOADED:
            return{
                ...state,
                groups:payload,
                loading:false
            }
        case MEMBERS_UPDATED_GROUPS:
            return{
                ...state,
                groups:state.groups.map(group=>group._id===payload.id?{...group,members:payload.members} : group),
                loading:false}
        case GROUP_REMOVED:
            return{
                ...state,
                groups:state.groups.filter(group=>group._id!==payload),
                loading:false
            }
        case GROUP_ERR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state
    }
}