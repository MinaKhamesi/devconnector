import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {likePost,unlikePost,deletePost} from '../../actions/post';

const PostItem = ({post:{text,name,user,avatar,likes,comments,date,_id}, currentUser, likePost,unlikePost,deletePost,groupId=null}) => {
    return (
        <div className="post bg-white my-1 p-1">
                    <div>
                        <Link to={`/profile/${user}`}>
                        <img className='round-img m-1' src={avatar} alt=""/>
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <span><Moment fromNow>{date}</Moment></span>
                    <div className="Actions">
                        <button className="btn" onClick={e=>likePost(_id)}>
                        <i className="fas fa-thumbs-up"></i>{'  '}{likes.length>0 && <span>{likes.length}</span>}
                        </button>
                        <button className="btn" onClick={e=>unlikePost(_id)}>
                            <i className="fas fa-thumbs-down"></i> 
                        </button>
                        <Link to={groupId? `/post/${groupId}/${_id}` : `/post/${_id}`} className='btn btn-primary'>Discussion{comments.length>0 && <span>{'  '}{comments.length}</span>}</Link>
                        {currentUser && currentUser._id===user && <button className='btn btn-danger' style={{fontFamily:'inherit'}} onClick={e=>deletePost(_id)}><i className='fas fa-times'></i></button>}
                    </div>
                    
                </div>
                </div>
    )
}

PostItem.propTypes = {
    currentUser:PropTypes.object,
    likePost:PropTypes.func.isRequired,
    unlikePost:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    currentUser:state.auth.user
})

export default connect(mapStateToProps,{likePost,unlikePost,deletePost})(PostItem);
