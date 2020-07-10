import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';



const Register = ({setAlert,register,isAuthenticated}) => {
    const [formData,setFormData] = useState({
        'name':"",
        "email":"",
        "password":"",
        "password1":""
    }
    )
    const {name,email,password,password1} = formData;


    const handleChange = e =>{
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const onSubmit = async e =>{
        e.preventDefault();
        if (password!==password1){
            setAlert('passwords dont match','danger')
        }else{
            register(formData);
    }}
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
        </p>
        <form onSubmit={e=>onSubmit(e)} className="form">
            <div className="form-group">
                <input type="text" placeholder="Name"  name='name' onChange={handleChange} value={name}required/>
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name='email' onChange={handleChange} value={email}/>
                <small className="form-text">
                    This site uses Gravatar, so if you want a profile image, use a gravatar email.
                </small>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" minLength="6" name='password' onChange={handleChange} value={password}/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Confirm Password" minLength="6" name='password1' value={password1} onChange={handleChange}/>
            </div>
            <input type="submit" value="Register" className='btn btn-primary'/>
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </Fragment>
    )
}
Register.propTypes = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register);
