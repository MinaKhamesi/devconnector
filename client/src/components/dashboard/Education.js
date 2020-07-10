import React,{Fragment} from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteEducation} from '../../actions/profile';


const Education = ({educations, deleteEducation}) => {
    return (
        <Fragment>
            <h2 className="my-2">
            Education Credentials
        </h2>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {educations.map(edu=>{
                return (<tr key={edu._id}>
                            <td>{edu.school}</td>
                            <td className='hide-sm'>{edu.degree}</td>
                            <td className='hide-sm'>{<Moment format='YYYY-MM-DD'>{edu.from}</Moment>} - {edu.current? 'Now' : <Moment format='YYYY-MM-DD'>{edu.to}</Moment>}</td>
                            <td><button className="btn btn-danger" onClick={e=>deleteEducation(edu.id)}>Delete</button></td>
                        </tr>)
                })}
            </tbody>
        </table>
        </Fragment>
    )
}

Education.propTypes = {
    educations:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education);
