import axios from 'axios';
import {POST_LOADED,POSTS_LOADED,POST_CREATED,POST_ERR,POST_DELETED,LIKE_UPDATED,COMMENT_UPDATED} from '.';
import {setAlert} from './alert';

//get All Posts
export const getAllPosts = ()=> async dispatch =>{
    try {
        const res = await axios.get('/api/posts');
        dispatch({type:POSTS_LOADED,payload:res.data})
    } catch (err) {
        dispatch({type:POST_ERR, payload:{msg:err.response.statusText, status:err.response.status}})
    }
}
//get a post by id
export const getPostById = (postId) => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({type:POST_LOADED,payload:res.data})
    } catch (err) {
        dispatch({type:POST_ERR, payload:{msg:err.response.statusText, status:err.response.status}});
    }
}
//create a new post
export const createPost = (text) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}};
        const body = JSON.stringify(text)
        const res = await axios.post('/api/posts',body,config);
        dispatch({type:POST_CREATED,payload:res.data});
    } catch (err) {
        dispatch({type:POST_ERR, payload:{msg:err.response.statusText, status:err.response.status}});
    }
}

//delete a post
export const deletePost = (postId) => async dispatch=>{
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({type: POST_DELETED,payload:postId});
        dispatch(setAlert('Post Deleted','danger',3000))
    } catch (err) {
        dispatch({type: POST_ERR,payload:{er:err.response}})
    }
}

//like a post  API:PUT api/posts/like/:post_id  res:likes
export const likePost = (postId) => async dispatch=>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({type: LIKE_UPDATED,payload:{newLikeArray:res.data,postId}});
    } catch (err) {
        const error = err.response.data;
        dispatch(setAlert(error.msg,'danger',3000))
        dispatch({type: POST_ERR,payload:{msg:err.response.statusText,status:err.response.status}});
    }
}
//unlike a post  API:PUT api/posts/unlike/:post_id    res:likes
export const unlikePost = (postId) => async dispatch=>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({type: LIKE_UPDATED,payload:{newLikeArray:res.data,postId}});
        
    } catch (err) {
        const error = err.response.data;
        dispatch(setAlert(error.msg,'danger',3000))
        dispatch({type: POST_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

//create comment      API:POST  /api/posts/comment/:post_id  res:comments
export const createComment = (text,postId) => async dispatch=>{
    try {
        const config = {headers:{'Content-Type':'application/json'}}
        const res = await axios.post(`/api/posts/comment/${postId}`,text,config);

        dispatch({type:COMMENT_UPDATED,payload:res.data})
    } catch (err) {
        dispatch({type: POST_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

//delete a comment    API:DELETE  /api/posts/comment/:post_id/:comment_id
export const deleteComment = (postId,commentId) =>async dispatch=>{
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({type:COMMENT_UPDATED,payload:res.data});
    } catch (err) {
        dispatch({type: POST_ERR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
