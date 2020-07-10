import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';

const Login = ({login,isAuthenticated}) => {
    
    const [formData,setFormData] = useState({
        'email':"",
        "password":""
    })
    const {email,password} = formData;

    const handleInputChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        login(formData);
    }


    if (isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p  className="lead">
                 <i  className="fas fa-user"></i> Sign into Your Account
            </p>
            <form onSubmit={e=>onSubmit(e)} className="form">
                <div className="form-group">
                    <input type="email" placeholder="Email Address"  name='email' onChange={handleInputChange} value={email}/>
                </div>
            <div  className="form-group">
                <input type="password" placeholder="Password" minLength="6" name='password'  onChange={handleInputChange} value={password}/>
            </div>
            <input type="submit" value="Login"  className='btn btn-primary' />
            </form>
        <p  className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        </Fragment>
        
    )
}
Login.propTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);
