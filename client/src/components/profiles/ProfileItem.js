import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';

const ProfileItem = ({profile,getProfileById}) => {
    const {status,location,user:{name,avatar,_id},skills,company} = profile;
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2 style={{textTransform:'capitalize'}}>{name}</h2>
                <p style={{textTransform:'capitalize'}}>{status.toLowerCase()} at {company && company.toLowerCase()}</p>
                <p>{location}</p>
                <Link to={`/profile`} className='btn btn-primary' onClick={e=>getProfileById(_id)}>View Profile</Link>
            </div>
            <ul>
                 {skills.map((skill,idx)=> idx<5 && <li className="text-primary" key={idx}><i className="fas fa-check"></i>{skill}</li>)}
            </ul>
        </div>
    )
}
ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById:PropTypes.func.isRequired,
}

export default connect(null, {getProfileById})(ProfileItem);
