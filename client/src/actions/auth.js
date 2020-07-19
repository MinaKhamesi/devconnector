import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_PROFILE, PROFILE_ERR, POST_CLEARED,USERS_LOADED, USERS_LOAD_ERR } from ".";
import {setAlert} from './alert';
import setTokenHeader from '../utils/setTokenHeader';


export const loadUser = () => async dispatch =>{
    if (localStorage.token){
        setTokenHeader(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({type:USER_LOADED,payload:res.data});
    } catch (err) {
        dispatch({type:AUTH_ERROR})
    }
}


export const register =  (formData) => async dispatch=>{
    dispatch(logout());
    const config = {headers:{'Content-Type':'application/json'}};
    const body = JSON.stringify(formData);
    try {
        const response = await axios.post('/api/users',body,config);
        dispatch({type:REGISTER_SUCCESS,payload:response.data})
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({type:REGISTER_FAIL})
        if (errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')));
        }
    }
}

export const login =  (formData) => async dispatch=>{
    dispatch(logout());
    const config = {headers:{'Content-Type':'application/json'}};
    const body = JSON.stringify(formData);
    try {
        const response = await axios.post('/api/auth',body,config);
        dispatch({type:LOGIN_SUCCESS,payload:response.data})
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({type:LOGIN_FAIL})
        if (errors){
            errors.forEach(err=>dispatch(setAlert(err.msg,'danger')));
        }
    }
}

export const logout = ()=>dispatch=>{
    dispatch({type:POST_CLEARED})
    dispatch({type:CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}


export const deleteAccount = ()=> async dispatch => {
    if(window.confirm('This can NOT be undone. Are you sure?')){
        try {
            await axios.delete('/api/profile');
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:LOGOUT})
            dispatch(setAlert('Account Deleted Permanantly','danger'))
        } catch (err) {
            dispatch({type:PROFILE_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
        }
    }
    
}

export const getAllUsers = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/users');
        dispatch({type:USERS_LOADED,payload:res.data})
    } catch (err) {
        dispatch({type:USERS_LOAD_ERR});
        console.log(err.response)
    }
}
    
    

