import React,{useState} from 'react';
import {connect} from 'react-redux';
import {createPost} from '../../actions/post';

const CreatePost = ({createPost}) => {
    const [text,setText] = useState('');
    const onSubmit = e =>{
        e.preventDefault();
        createPost({text});
        setText('');
    }
    return (
        <div className="post-form">
            <div className="post-form-header bg-primary">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e=>onSubmit(e)}>
                <textarea name="post" placeholder="Create A Post" cols="30" rows="5" value={text} onChange={e=>setText(e.target.value)}></textarea>
                <input type="submit" value="Submit" className="btn btn-dark my-1"/>
            </form>
        </div>
    )
}

export default connect(null,{createPost})(CreatePost);
