import {SET_ALERT,REMOVE_ALERT} from './index';
import uuid from 'react-uuid'

export const  setAlert = (msg,alertType,timeout=5000) => dispatch=>{
    const id = uuid();
        const newAlert = {id,msg,alertType}
        dispatch({type:SET_ALERT,payload: newAlert})
        setTimeout(()=>{
            dispatch({type:REMOVE_ALERT,payload:id})
        },timeout);
}