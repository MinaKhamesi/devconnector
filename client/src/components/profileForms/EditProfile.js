import React, { Fragment,useState,useEffect } from 'react';
import {Link,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {getProfileInfo} from '../../actions/profile'

const EditProfile = ({createProfile,getProfileInfo,profile:{loading,profile},isAuthenticated,history}) => {
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

    useEffect(() => {
        getProfileInfo();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            status: loading || !profile.status ? '' : profile.status,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            skills: loading || !profile.skills ? '' : profile.skills.join(),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram   
        })  
    }, [loading,getProfileInfo])

    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData,history,true);
    }

    const [socialInputDisplay, toggleSocialInputDisplay] = useState(false)
    if (!isAuthenticated){
        return <Redirect to='/'/>
    }
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
EditProfile.propTypes={
    createProfile:PropTypes.func.isRequired,
    profile:PropTypes.object,
    getProfileInfo:PropTypes.func.isRequired,
    isAthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
    profile:state.profile,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{createProfile,getProfileInfo})(EditProfile);
