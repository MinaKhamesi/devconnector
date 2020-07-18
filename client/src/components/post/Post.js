import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostElement from './PostElement';
import CreateComment from './CreateComment';
import {getPostById,deleteComment} from '../../actions/post';

const Post = ({getPostById,deleteComment,post:{post,loading},match,auth}) => {

    useEffect(()=>{
        getPostById(match.params.postId)
    },[getPostById])



    return auth.loading || post===null || loading ? <Spinner/> :
        <Fragment>
            {match.params.groupId ? <Link to={`/groups/${match.params.groupId}`} className="btn">Back to Group</Link> : <Link to="/posts" className="btn">Back to posts</Link>}
            
            <PostElement post={post}/>
            <CreateComment postId={post._id}/>
            {post.comments.length>0 && post.comments.map(comment=> <PostElement post={comment} isComment={true} key={comment._id} postId={post._id}/>)}
        </Fragment>
    
}

Post.propTypes = {
    getPostById:PropTypes.func.isRequired,
    deleteComment:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    
}

const mapStateToProps = state =>({
    post:state.post,
    auth:state.auth
})

export default connect(mapStateToProps,{getPostById,deleteComment})(Post);
