import axios from 'axios';
import {setAlert} from './alert';
import {PROFILE_LOADED,REPOS_LOADED, REPOS_ERR, PROFILE_ERR,CREATE_PROFILE,UPDATE_PROFILE,PROFILES_LOADED, CLEAR_PROFILE} from './index';


//get current user's profile
export const getProfileInfo = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({type:PROFILE_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type:PROFILE_ERR, payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

//get all profils
export const getAllProfiles = () =>async dispatch=>{
    try {
        const res = await axios.get('/api/profile');
        dispatch({type:PROFILES_LOADED,payload: res.data});
    } catch (err) {
        dispatch({type: PROFILE_ERR,parload:{msg:err.response.statusText,status: err.response.status}})
    }
}

//get a profile by id
export const getProfileById = userId =>async dispatch=>{
    dispatch({type:CLEAR_PROFILE})
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({type:PROFILE_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload: { msg:err.response.statusText,status:err.response.status }});
    }
}

//@todo GET Github Repos API GET /api/profile/github/:username
export const getGithubRepos = username => async dispatch=>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({type:REPOS_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type: REPOS_ERR,payload:{msg:err.response.statusText, status:err.response.status}})
    }
}

//create/edit profile
export const createProfile = (formData,history,edit=false) =>async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const body = JSON.stringify(formData);
        const res = await axios.post('/api/profile',body,config);
        dispatch({type:CREATE_PROFILE,payload:res.data});
        history.push('/dashboard');
        dispatch(setAlert(edit? 'Profile Updated': 'Profile Created', 'success'));
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
    }
}

//Add Experience
export const addExperience = (formData,history) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const body = JSON.stringify(formData);
        const res = await axios.put('/api/profile/experience' , body, config);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        history.push('/dashboard');
        dispatch(setAlert('Experience Added','success'));
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
        const errors = err.response.data.errors;
        if(errors) errors.forEach(err=>dispatch(setAlert(err.msg,'danger',3000)));
    }
}
//Add Experience
export const addEducation = (formData,history) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const body = JSON.stringify(formData);
        const res = await axios.put('/api/profile/education' , body, config);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        history.push('/dashboard');
        dispatch(setAlert('Education Added','success'));
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
        const errors = err.response.data.errors;
        if(errors) errors.forEach(err=>dispatch(setAlert(err.msg,'danger',3000)));
    }
}

//delete Experience
export const deleteExperience = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({type:UPDATE_PROFILE,payload: res.data});
        dispatch(setAlert('Experience Deleted','danger',3000));
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}
//delete Education
export const deleteEducation = (id) => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({type:UPDATE_PROFILE,payload: res.data});
        dispatch(setAlert('Education Deleted','danger',3000));
    } catch (err) {
        dispatch({type: PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}

