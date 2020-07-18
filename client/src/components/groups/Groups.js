import React,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from './../layout/Spinner';
import GroupItem from './GroupItem';
import {getGroups} from '../../actions/group';
import { Link } from 'react-router-dom';

const Groups = ({getGroups,group:{loading,groups}}) => {
    useEffect(()=>{
        getGroups()
    },[getGroups])
    return (loading ? <Spinner/> : 
        <Fragment>
            <h1 className="large text-primary">
            Groups
        </h1>
        <p className="lead">
            <i className="fab fa-connectdevelop"></i> Explore different groups, find interesting people and have Fun!
        </p>
        <Link to="/creategroup" className="btn btn-primary my-1">Create a new Group</Link>
        <div className="groups">
            {groups.length===0? <h3 className='lead p-5 m-5'>No Group Found</h3> : groups.map(group=><GroupItem key={group._id} group={group}/>)}
        </div>
        </Fragment>
    )
}
const mapStateToProps = state=>({
    group:state.group
})

export default connect(mapStateToProps,{getGroups})(Groups);
