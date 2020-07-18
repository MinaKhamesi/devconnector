import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import group from './group';
const rootReducer = combineReducers({
    alert,
    auth,
    profile,
    post,
    group
})

export default rootReducer;