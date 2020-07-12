import React,{useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CreatePost from './CreatePost';
import PostItem from './PostItem';
import Spinner from './../layout/Spinner';
import {getAllPosts} from '../../actions/post';

const Posts = ({getAllPosts,post:{posts,loading}}) => {


    useEffect(()=>{
        getAllPosts();
    },[getAllPosts])

    

    return loading  ? <Spinner/> : 
        <Fragment>
        <h1 className="large text-primary">
            Posts
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
        </p>
        <CreatePost/>
        <div className="posts">
            {posts.length===0 ? <h4 className='p-4'>No Post Yet</h4> : posts.map(post=><PostItem key={post._id} post={post}/>) }
        </div>
        </Fragment>
    
}

Posts.propTypes = {
    post:PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired,
    loading:PropTypes.bool,
}

const mapStateToProps = state => ({
    post:state.post,
})

export default connect(mapStateToProps,{getAllPosts})(Posts);
