import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types'



const ProfileEducation = ({educations}) => {
    return ( 
        <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Educations</h2>
                {educations.length===0 ? <h4 className='p-1'>No Education Credentials</h4> : 
                    educations.map(edu=><div key={edu._id}>
                    <h3>{edu.school}</h3>

                    <p>
                    <Moment format="MMM-YYYY" date={edu.from}/> - {edu.current? 'Now':<Moment format="MMM-YYYY" date={edu.to}/> }
                    </p>

                    <p><strong>Degree: </strong>{edu.degree}</p>
                    <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>


                    {edu.description && <p><strong>Description: </strong>{edu.description}</p>}
                    
                    </div>)}
                
            </div>
    )
}

ProfileEducation.propTypes = {
    educations:PropTypes.array.isRequired,
}

export default ProfileEducation
