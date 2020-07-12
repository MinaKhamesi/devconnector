import React,{useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {getProfileInfo} from '../../actions/profile';
import {deleteAccount} from '../../actions/auth';


function Dashboard({getProfileInfo,deleteAccount,profile:{profile,loading},auth:{user}}) {

    useEffect(()=>{
        getProfileInfo()
    },[getProfileInfo]);

    return loading && profile===null ? <Spinner/> : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> welcome {user&&user.name}
            </p>
            {profile!==null ? 
            <Fragment>
                <DashboardActions/>
                <Experience experiences={profile.experience}/>
                <Education educations={profile.education}/>
            </Fragment> : 
            <Fragment>
                <p>You have not yet set up a profile, please add some info.</p>
                <Link to='/create-profile' className = 'btn btn-primary my-1'>Create Profile</Link>
            </Fragment>}
            <div className="my-2">
                    <button  className=" btn btn-danger" onClick={()=>deleteAccount()}>
                        <i className="fas fa-user-minus"></i> Delete My Account
                     </button>
            </div>
        </Fragment>
    )
}

Dashboard.propTypes = {
    getProfileInfo:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = state=>({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileInfo,deleteAccount})(Dashboard);


