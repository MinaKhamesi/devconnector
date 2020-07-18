import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import Actions from './Actions';
import GroupFormPost from './GroupFormPost';
import GroupPosts from './GroupPosts';
import {getTheGroup,getPostsOfTheGroup} from '../../actions/group';

const Group = ({getTheGroup, getPostsOfTheGroup , post:{posts}, group:{group},auth:{user},match}) => {
    useEffect(()=>{
        getTheGroup(match.params.id)
        getPostsOfTheGroup(match.params.id);
    },[getTheGroup,getPostsOfTheGroup]);
    return (!group || !user || !posts ? <Spinner/> :
        <Fragment>
            <Link to='/groups' className='btn'>Back to Groups</Link>
           <h1 className="large text-primary">
            {group.name}<p style={{fontSize:'1rem'}}><strong>  Admin: </strong>{group.admin_name}</p>
            </h1>
            
            <p className="lead">
                <i className="fas fa-user"></i>Welcome {user.name}
            </p>
            <Actions isAdmin={group.admin===user._id} isPublic={group.public} groupId={group._id}/>
            <GroupFormPost groupId={group._id}/>
            <GroupPosts posts={posts} groupId={group._id}/>
            {//   #1Actions #2form-post #3 post}
}
        </Fragment>
    )
}

Group.propTypes = {
    getTheGroup:PropTypes.func.isRequired,
    auth:PropTypes.object,
    group:PropTypes.object,
}

const mapStateToProps = state =>({
    group:state.group,
    auth:state.auth,
    post:state.post
})

export default connect(mapStateToProps,{getTheGroup,getPostsOfTheGroup})(Group);
