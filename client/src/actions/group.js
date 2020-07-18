import axios from 'axios';
import {GROUPS_LOADED,GROUP_ERR,MEMBERS_UPDATED, MEMBERS_UPDATED_GROUPS,GROUP_REMOVED,GROUP_CREATED, GROUP_LOADED,BLOCKLIST_UPDATED, POST_CREATED, POSTS_LOADED} from '.';
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

//get a group     API:GET '/api/groups/:group_id'
export const getTheGroup = groupId => async dispatch=>{
    try {
       const res = await axios.get(`/api/groups/${groupId}`);
       dispatch({type:GROUP_LOADED,payload: res.data}); 
    } catch (err) {
        dispatch({type: GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

//join a group    API:PUT '/api/groups/:group_id/join' / RETURN group.member
export const joinGroup = groupId =>async dispatch=>{
    try {
        const res = await axios.put(`/api/groups/${groupId}/join`);
        dispatch({type:MEMBERS_UPDATED_GROUPS,payload:{id:groupId,members:res.data}});
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
//leave a group   API:PUT '/api/groups/:group_id/leave' / RETURN group.member
export const leaveGroup = (groupId,isAdmin,history,inTheGroup=false) =>async dispatch=>{
    try {
        const res = await axios.put(`/api/groups/${groupId}/leave`);
        if(isAdmin){
            dispatch({type:GROUP_REMOVED,payload:groupId});
            dispatch(setAlert('Group Deleted Permanently','danger'))
        }else{
            dispatch({type:MEMBERS_UPDATED_GROUPS,payload:{id:groupId,members:res.data}});
            dispatch(setAlert('You Left the Group','success'))

        }
        
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
//create a group   API:POST '/api/groups'
export const createGroup = (formData,history)=>async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const res = await axios.post('/api/groups',formData,config);
        dispatch({type:GROUP_CREATED,payload:res.data});
        dispatch(setAlert('Group Created','success'));
        history.push(`groups/${res.data._id}`);
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

//add users  API:PUT '/api/groups/:group_id/addmembers'/ RETURN group.member
export const addMembers = (members,groupId,history) => async dispatch=>{
    try {
        console.log(members);
        const config = {headers:{'Content-Type':'application/json'}}
        const res = await axios.put(`/api/groups/${groupId}/addmembers`,members,config);
        dispatch({type:MEMBERS_UPDATED,payload:res.data});
        dispatch(setAlert('Users Added.','success'))
        history.push(`/groups/${groupId}`);
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type: GROUP_ERR,payload:{msg: err.response.statusText, status: err.response.status}});
    }
}
//delete members   API:DELETE '/api/groups/:group_id/deletemembers'/ RETURN group.member
export const deleteMembers = (users,groupId,history) => async dispatch=>{
    try {
        console.log(users)
        const config = {headers:{'Content-Type':'application/json'}}
        const res = await axios.put(`/api/groups/deletemembers/${groupId}`,users,config);
        dispatch({type:MEMBERS_UPDATED,payload:res.data});
        dispatch(setAlert('Users Removed.','success'))
        history.push(`/groups/${groupId}`);
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type: GROUP_ERR,payload:{msg: err.response.statusText, status: err.response.status}});
    }
}

//block users     API:PUT '/api/groups/blockusers/:group_id'/ RETURN group.blockList
export const blockMembers = (members,groupId,history) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}}
        const res = await axios.put(`/api/groups/blockusers/${groupId}`,members,config);
        dispatch({type:BLOCKLIST_UPDATED,payload:res.data});
        dispatch(setAlert('Users Blocked.','success'))
        history.push(`/groups/${groupId}`);
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type: GROUP_ERR,payload:{msg: err.response.statusText, status: err.response.status}});
    }
}


//unblock users    API:PUT '/api/groups/unblockusers/:group_id'/ RETURN group.blockList

export const unblockMembers = (members,groupId,history) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}}
        const res = await axios.put(`/api/groups/unblockusers/${groupId}`,members,config);
        dispatch({type:BLOCKLIST_UPDATED,payload:res.data});
        dispatch(setAlert('Users Unblocked.','success'))
        history.push(`/groups/${groupId}`);
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type: GROUP_ERR,payload:{msg: err.response.statusText, status: err.response.status}});
    }
}


//  API :  POST  /api/posts/groups/:group_id   RETURN post
export const postOnGroup = (text,groupId)=> async dispatch =>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const res = await axios.post(`/api/posts/groups/${groupId}`,text,config);
        dispatch({type:POST_CREATED,payload:res.data});
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type: GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}


//     GET api/posts/groups/:group_id
export const getPostsOfTheGroup = (groupId) => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/groups/${groupId}`);
        dispatch({type:POSTS_LOADED,payload:res.data})
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}


//  API:   GET '/api/users/groups'
export const getUsersGroups = () => async dispatch =>{
    try {
        const res = await axios.get('/api/users/groups');
        dispatch({type:GROUPS_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type:GROUP_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}