import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/post';

const PostElement = ({post:{user,name,date,text,avatar,_id},isComment=false,currentUser,postId=null,deleteComment}) => {
    return (
        <div className="post bg-white my-1 p-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img className='round-img' src={avatar} alt=""/>
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{text}</p>
                    <span><Moment fromNow>{date}</Moment></span>
                    {isComment && currentUser===user && <div className="Actions"><button className='btn btn-danger' onClick={e=>deleteComment(postId,_id)}>Delete</button></div>}
                </div>
            </div>
    )
}

PostElement.propTypes = {
    post:PropTypes.object.isRequired,
    currentUser:PropTypes.string.isRequired,
    deleteComment:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    currentUser:state.auth.user._id
})

export default connect(mapStateToProps,{deleteComment})(PostElement);
