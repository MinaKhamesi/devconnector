import React,{useState} from 'react';
import {connect} from 'react-redux';
import {postOnGroup} from '../../actions/group';

const GroupFormPost = ({postOnGroup, groupId}) => {
    const [text,setText] = useState('');
    const onSubmit = e =>{
        e.preventDefault();
        postOnGroup({text},groupId);
        setText('');
    }
    return (
        <div className="post-form my-1">
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

export default connect(null,{postOnGroup})(GroupFormPost);
