import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';


const AddExperience = ({addExperience, history}) => {
    const [formData,setFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const {title,company,location,from,to,current,description} = formData;

    const [toDateDisplay,toggleToDate] = useState(!current);

    const onChange = e =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const onSubmit = e =>{
        e.preventDefault();
        addExperience(formData, history);
    }
    return (
        <Fragment>
          <h1 className="large text-primary">
            Add An Experience
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i>  add any developer/programming positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form  className="form" onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input type="text" name="title" value={title} onChange={e=>onChange(e)} placeholder="*Job Title"/>
            </div>
            <div className="form-group">
                <input type="text" name="company"  value={company} onChange={e=>onChange(e)}placeholder="* Company"/></div>
            <div className="form-group">
                <input type="text" name="location" value={location} onChange={e=>onChange(e)} placeholder="Location"/>
                </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from"  value={from} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group">
                <p>
                    <input type="checkbox" name="current" value={current} onClick={e=>{
                        setFormData({...formData,current:!current});
                        toggleToDate(!toDateDisplay);
                        }}  />Current Job
                </p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={e=>onChange(e)} disabled={toDateDisplay? '':'disabled'}/ >
            </div>
            <div className="form-group">
                <textarea name="description" placeholder="Job Description" cols="30" rows="5" value={description} onChange={e=>onChange(e)}></textarea>
                </div>
            <input type="submit" value="Submit" className="btn btn-primary my-1"/>
            <Link to="/dashboard" className="btn my-1">Go Back</Link>
        </form> 
    </Fragment>
    )
}
AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired,
}

export default connect(null,{addExperience})(AddExperience);
