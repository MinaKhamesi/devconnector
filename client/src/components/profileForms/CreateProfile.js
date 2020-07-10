import React, { Fragment,useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';

const CreateProfile = ({createProfile,history}) => {
    const [formData,setFormData] = useState({
        company:"",
        status:'',
        website:'',
        location:'',
        skills:"",
        githubusername:"",
        bio:"",
        twitter:"",
        facebook:"",
        linkedin:'',
        instagram:'',
        youtube:''
    })
    const {company,status,website,location,skills,githubusername,bio,twitter,facebook,linkedin, instagram,youtube} = formData;

    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData,history);
    }

    const [socialInputDisplay, toggleSocialInputDisplay] = useState(false)

    return (
        <Fragment>
            <h1 className="large text-primary">
            Create Your Profile
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your profile stands out.
        </p>
        <small>* = required fields</small>

        
        <form  className="form">
            <div className="form-group">
                <select name="status" id="" value={status} onChange={e=>onChange(e)}>
                    <option value="0">* select professional status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
                <input type="text" name="company" placeholder="Company" value={company} onChange={e=>onChange(e)}/>
                <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
                <input type="text" name="website" placeholder="Website" value={website} onChange={e=>onChange(e)}/>
                <small className="form-text">Could be your own or company's website</small>
            </div>
            <div className="form-group">
                <input type="text" name="location" placeholder="Location" value={location} onChange={e=>onChange(e)}/>
                <small className="form-text">City & State suggested (eg. Boston, MA)</small>
            </div>

            <div className="form-group">
                <input type="text" name="skills" placeholder="* Skills" value={skills} onChange={e=>onChange(e)}/>
                <small className="form-text">Please use comma seperated values (eg. HTML,CSS,JavaScript,PHP)</small>
            </div>

            <div className="form-group">
                <input type="text" name="githubusername" placeholder="Github Username" value={githubusername} onChange={e=>onChange(e)}/>
                <small className="form-text">If you want your latest repos and a github link, include your username</small>
            </div>
            <div className="form-group">
                <textarea name="bio" placeholder="A short bio of yourself" value={bio} onChange={e=>onChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
            </div>
            <div className="my-2">
                <div className="btn" onClick={e=>toggleSocialInputDisplay(!socialInputDisplay)}>Add Social Network Links</div>
                <span>Optional</span>
                {socialInputDisplay && 
                <Fragment>
                    <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" name="twitter" placeholder="Twitter URL" value={twitter} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" name="facebook" placeholder="Facebook URL" value={facebook} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" name="youtube" placeholder="Youtube URL" value={youtube} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" name="linkedin" placeholder="Linkedin URL" value={linkedin} onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" name="instagram" placeholder="Instagram URL" value={instagram} onChange={e=>onChange(e)}/>
            </div>
                </Fragment>
                 }
            </div>

            
            <input type="submit" value="Submit" className="btn btn-primary my-1" onClick={e=>onSubmit(e)}/>
            <Link to="/dashboard" className="btn my-1">Go Back</Link>
        </form>
        </Fragment>
    )
}
CreateProfile.propTypes={
    createProfile:PropTypes.func.isRequired,
}

export default connect(null,{createProfile})(CreateProfile);
