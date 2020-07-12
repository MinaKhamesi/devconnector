import React from 'react';
import PropTypes from 'prop-types'


const ProfileTop = ({profile:{user:{avatar,name},company,status,location,website,social}}) => {
    if(social){
        var {instagram,youtube,linkedin,twitter,facebook} = social;
    }
    return (
        <div className="profile-top bg-primary p-2">
                <img src={avatar} alt="" className="round-img my-1"/>
                <h1 className="large" style={{textTransform:'capitalize'}}>{name}</h1>
                <p className="lead">{status} {company && <span>at {company}</span>}</p>
                {location && <p>{location}</p>}
                <div className="icons my-1">
                    {website && <a href = {website}>
                        <i className="fas fa-globe fa-2x"></i>
                    </a>}
                    {facebook && <a href={facebook}>
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>}
                    {twitter && <a href={twitter}>
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>}
                    {linkedin && <a href={linkedin}>
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>}
                    {instagram && <a href={instagram}>
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>}
                    {youtube && <a href={youtube}>
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>}
                </div>
                

            </div>
    )
}
ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileTop
