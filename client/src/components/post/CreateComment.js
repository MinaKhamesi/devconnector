import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createComment} from '../../actions/post';

const CreateComment = ({createComment,postId}) => {
    const [text,setText] = useState('')
    const onSubmit = e =>{
        e.preventDefault();
        createComment({text}, postId);
        setText('');
    }
    return (
        <div className="post-form">
            <div className="post-form-header bg-primary">
                <h3>Leave a comment...</h3>
                </div>
                <form className="form my-1" onSubmit={e=>onSubmit(e)}>
                    <textarea name="comment" value={text}placeholder="Comment on this post" cols="30" rows="5" onChange={e=>setText(e.target.value)}></textarea>
                    <input type="submit" value="Submit" className="btn btn-dark my-1"/>
                </form>
            </div>
    )
}
CreateComment.propTypes = {
    createComment: PropTypes.func.isRequired,
    postId:PropTypes.string.isRequired,
}

export default connect(null,{createComment})(CreateComment);
