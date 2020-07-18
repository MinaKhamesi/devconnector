import axios from 'axios';
import {GROUPS_LOADED,GROUP_ERR, MEMBERS_UPDATED_GROUPS,GROUP_REMOVED} from '.';
import {setAlert} from './alert';

//get all groups
export const getGroups = ()=>async dispatch=>{
    try {
        const res = await axios.get('/api/groups/');
        dispatch({type:GROUPS_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

//join a group    API:PUT '/api/groups/:group_id/join' / RETURN group.member
export const joinGroup = groupId =>async dispatch=>{
    try {
        const res = await axios.put(`/api/groups/${groupId}/join`);
        dispatch({type:MEMBERS_UPDATED_GROUPS,payload:{id:groupId,members:res.data}});
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
//leave a group   API:PUT '/api/groups/:group_id/leave' / RETURN group.member
export const leaveGroup = (groupId,isAdmin,history) =>async dispatch=>{
    try {
        const res = await axios.put(`/api/groups/${groupId}/leave`);
        if(isAdmin){
            dispatch({type:GROUP_REMOVED,payload:groupId});
            dispatch(setAlert('Group Deleted Permanently','danger'))
        }else{
            dispatch({type:MEMBERS_UPDATED_GROUPS,payload:{id:groupId,members:res.data}});
        }
        
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
//create a group   API: