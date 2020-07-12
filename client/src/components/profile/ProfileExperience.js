import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experiences}) => {
    return (
        <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experiences</h2>
                {experiences.length===0 ? <h4 className="p-1">No Experience Credentials</h4> : 
                    
                    experiences.map(exp=><div key={exp._id}>
                    <h3>{exp.company}</h3>

                    <p>
                    <Moment format="MMM-YYYY" date={exp.from}/> - {exp.current? 'Now':<Moment format="MMM-YYYY" date={exp.to}/> }
                    </p>

                    <p><strong style={{fontWeight:600}}>Position: </strong>{exp.title}</p>

                    {exp.description && <p><strong>Description: </strong>{exp.description}</p>}
                    
                    </div>)}
                
            </div>
    )
}


ProfileExperience.propTypes = {
    experiences:PropTypes.array.isRequired,
}

export default ProfileExperience;
