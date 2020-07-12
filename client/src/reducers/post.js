import {POSTS_LOADED, POST_LOADED, POST_ERR, POST_CREATED,POST_DELETED,LIKE_UPDATED, COMMENT_UPDATED} from '../actions';
const initialState = {
    post:null,
    posts:[],
    error:{},
    loading:true
}

export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case POST_LOADED:
            return {
                ...state,
                post:payload,
                loading:false
            }
        case POSTS_LOADED:
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case POST_CREATED:
            return {
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        case COMMENT_UPDATED:
            return{
                ...state,
                post:{...state.post,comments:payload},
                loading:false
            }
        case LIKE_UPDATED:
            return{
                ...state,
                posts:state.posts.map((post)=> post._id===payload.postId ? {...post,likes:payload.newLikeArray} : post)
            }
        case POST_DELETED:
            return {
                ...state,
                posts:state.posts.filter(post=>post._id!==payload),
                loading:false
            }
        case POST_ERR:
            return{
                ...state,
                post:null,
                error:payload
            }
        default:
            return state
    }
}