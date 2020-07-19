import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createGroup} from '../../actions/group';

const CreateGroup = ({createGroup,history}) => {
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        "public":true
    })
    const {name,description} = formData
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit = e=>{
        e.preventDefault();
        createGroup(formData,history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Create  Group</h1>
        <p className="lead">
            <i className="fas fa-dice-d6"></i> create your own group, and manage it as you wish. 
        </p>
        <small>* = required field</small>
        <form onSubmit={e=>onSubmit(e)} className="form">
            <div className="form-group">
                <input type="text" placeholder="*Group Name" name='name'required value={name} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="*Description" name='description' value={description} onChange={e=>onChange(e)}/>
                <small className="form-text">
                    Please Provide a short description of what the group is about.
                </small>
            </div>
            <div className="form-group">
                <p><input type="checkbox" name="public" id="" onClick={e=>setFormData({...formData,"public":!formData.public})}/>  Private Group</p>
            </div>
            
            <input type="submit" value="Create" className='btn btn-primary'/>
        </form>
        <p className="my-1">
            Not sure yet? <Link to="/groups">Explore other groups</Link>
        </p>
        </Fragment>
    )
}

export default connect(null,{createGroup})(CreateGroup);
