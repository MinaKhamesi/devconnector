import React from 'react'
import{Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {leaveGroup} from '../../actions/group';

const Actions = ({ isAdmin , isPublic , leaveGroup , groupId , history}) => {

    const memberActions =

    <div className="group-buttons">

        <Link to={`/groups/${groupId}/members/meet`} className="btn">
            <i className="fas fa-user-circle text-primary"></i>  Meet members
        </Link>

        <div className='btn' onClick={e=>leaveGroup(groupId,isAdmin,history)}>
            <i className="fas fa-sign-out-alt text-primary"></i> Leave the Group
            </div>

        {isPublic && <Link to={`/groups/${groupId}/members/add`} className="btn">
         <i className="fas fa-users text-primary"></i> Add members
        </Link> }

        
    </div>


    const adminActions = 

    <div className="group-buttons">

        <Link to={`/groups/${groupId}/members/meet`} className="btn m-1">
            <i className="fas fa-user-circle text-primary"></i>  Meet members
        </Link>

        <div className='btn m-1' onClick={e=>leaveGroup(groupId,isAdmin,history,true)}>
            <i className="fas fa-sign-out-alt text-primary"></i>Leave/Delete</div>

        <Link to={`/groups/${groupId}/members/add`} className="btn m-1">
            <i className="fas fa-users text-primary"></i> Add members
        </Link> 

        <Link to={`/groups/${groupId}/members/delete`} className="btn m-1">
        Remove members
        </Link> 

        <Link to={`/groups/${groupId}/members/block`} className="btn m-1">
            Block members
        </Link> 

        <Link to={`/groups/${groupId}/members/unblock`} className="btn m-1">
        unblock members
        </Link>   
</div>

    return isAdmin? adminActions : memberActions
    
}

Actions.propTypes = {
    isAdmin:PropTypes.bool.isRequired,
    isPublic:PropTypes.bool.isRequired,
    groupId:PropTypes.string.isRequired,
    leaveGroup:PropTypes.func.isRequired,
}

export default connect(null,{leaveGroup})(Actions);
