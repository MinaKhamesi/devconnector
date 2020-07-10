import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './../layout/Spinner';
import {connect} from 'react-redux';

const Profile = ({profile}) => {
    return (profile===null ? <Spinner/> :
        <div>
            {profile.status}
        </div>
    )
}

Profile.propTypes = {
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    profile: state.profile.profile,
})

export default connect(mapStateToProps)(Profile);
