import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {joinGroup, leaveGroup} from '../../actions/group';

const isUserInGroup = (members,userId)=>{
    return members.indexOf(userId)!==-1
}
const GroupItem = ({group,auth,joinGroup,leaveGroup,history}) =>{
    return(
        !group ? <Redirect to='/groups'/> :
        <div className="group bg-light">
            <div>
                <h2>{group.name}</h2>
                <p><strong>Admin: </strong>{group.admin_name}</p>
            </div>
    
            <div>{group.description}</div>
    
            {auth.user && isUserInGroup(group.members,auth.user._id) ? 
            <div className='group-links'>
    
                <Link to={`/groups/${group._id}`} className='btn btn-primary'>Enter</Link>
    
                <div className='btn btn-dark my-1' onClick={e=>{
                    const isAdmin = group.admin===auth.user._id;
                leaveGroup(group._id,isAdmin,history)}}>
                    {group.admin===auth.user._id? 'Leave/Delete' : 'Leave'}
                    </div>
            </div> : 
            <div className="group-links">
                {
                    group.public && <div className='btn btn-dark' onClick={e=>joinGroup(group._id)}>Join</div>
                }
            </div>
                
               
            } 
    </div>
    
    
    )
}
    





const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{joinGroup,leaveGroup})(GroupItem);
