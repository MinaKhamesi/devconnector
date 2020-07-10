import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation , history}) => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:'',
        description:''
    });
    const {school,degree,fieldofstudy,from,to,current,description} = formData;

    const [toDateDisplay,toggleToDate] = useState(!current);

    const onChange = e=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onSubmit = e=>{
        e.preventDefault();
        addEducation(formData,history)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Education
        </h1>
        <p className="lead">
            <i className="fas fa-graduation-cap"></i>  add any school, bootcamp, etc that you have attended
        </p>
        <small>* = required field</small>
        <form  className="form" onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input type="text" name="school" placeholder="*School or Bootcamp" value={school} onChange = {e=>onChange(e)}/>
            </div>
            <div className="form-group">
                <input type="text" name="degree" placeholder="* Degree or Certificate" value={degree} onChange = {e=>onChange(e)}/></div>
            <div className="form-group"><input type="text" name="fieldofstudy" placeholder="*Field Of Study" value={fieldofstudy} onChange = {e=>onChange(e)}/></div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from"  value={from} onChange = {e=>onChange(e)}/>
            </div>
            <div className="form-group">
                <p><input type="checkbox" name="current" id="" value={to} onChange = {e=>{
                    setFormData({...formData,current:!current})
                    toggleToDate(!toDateDisplay)}}/>Current School</p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to"  value={to} onChange = {e=>onChange(e)}disabled={toDateDisplay? '':'disabled'}/>
            </div>
            <div className="form-group"><textarea name="description" placeholder="Program Description" cols="30" rows="5" value={description} onChange={e=>onChange(e)}></textarea></div>
            <input type="submit" value="Submit" className="btn btn-primary my-1"/>
            <Link to="/dashboard" className="btn my-1">Go Back</Link>
        </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(AddEducation);
