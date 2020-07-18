import React, { Fragment, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import GroupItem from './GroupItem';
import {connect} from 'react-redux';
import { getUsersGroups } from '../../actions/group';

const UserGroups = ({auth:{loading,user},group:{groups},getUsersGroups}) => {
    useEffect(()=>{
        getUsersGroups()
    },[getUsersGroups])
    return loading || !groups ? <Spinner/> :<Fragment>
        <p className="text-primary large">{user.name}'s Groups</p>
        <p className="lead">
            <i className="fas fa-users"></i> Manage Your Groups as you wish. Or go to Groups and see what others have to offer.
        </p>
        <div className="groups">
            {groups.length===0? <h3 className='lead p-5 m-5'>No Group Found</h3> : groups.map(group=><GroupItem key={group._id} group={group}/>)}
        </div>
    </Fragment>
}

const mapStateToProps = state =>({
    auth:state.auth,
    group:state.group
})

export default connect(mapStateToProps,{getUsersGroups})(UserGroups);
