import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const ProfileItem = ({profile}) => {
    const {status,location,user:{name,avatar,_id},skills,company} = profile;
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2 style={{textTransform:'capitalize'}}>{name}</h2>
                <p style={{textTransform:'capitalize'}}>{status.toLowerCase()} {company &&  <span>at {company.toLowerCase()}</span> }</p>
                {location && <p>{location}</p>}
                <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
            </div>
            <ul>
                 {skills.map((skill,idx)=> idx<5 && <li className="text-primary" key={idx}><i className="fas fa-check"></i>{skill}</li>)}
            </ul>
        </div>
    )
}
ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem;
