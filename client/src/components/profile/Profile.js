import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';

const Profile = ({profile:{profile,loading},match,getProfileById,currentUser}) => {
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById,match.params.id]);
    return (profile===null || loading ? <Spinner/> :
        <Fragment>
            <Link to="/profiles" className="btn">Back to profiles</Link>
            {currentUser && currentUser._id===match.params.id && <Link to='/edit-profile' className='btn'>Edit Profile</Link>}
            <div className="profile-grid my-1">
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <ProfileExperience experiences={profile.experience}/>
                <ProfileEducation educations={profile.education}/>
                <ProfileGithub repos={profile.repos}/>
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    profile:PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    currentuser: PropTypes.object,
}

const mapStateToProps = state =>({
    profile: state.profile,
    currentUser:state.auth.user
})

export default connect(mapStateToProps,{getProfileById})(Profile);
