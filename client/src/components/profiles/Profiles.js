import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import Spinner from './../layout/Spinner';
import {connect} from 'react-redux';
import {getAllProfiles} from '../../actions/profile';

const Profiles = ({getAllProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getAllProfiles();
    },[])
    return ( loading ? <Spinner/> :
        <Fragment>
            <h1 className="large text-primary">
            Developers
        </h1>
        <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles">
            {profiles.length>0  ?  profiles.map(profile => <ProfileItem profile={profile} key={profile._id}/>) : <h4>No Profile Found!</h4>}
        </div>
        </Fragment>
    )
}
Profiles.propTypes = {
    profile:PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    profile:state.profile
})

export default connect(mapStateToProps,{getAllProfiles})(Profiles);
