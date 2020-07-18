import React,{Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getTheGroup} from '../../actions/group';
import {addMembers,deleteMembers,blockMembers,unblockMembers} from '../../actions/group';
import {getAllProfiles} from '../../actions/profile';

const Members = ({group,profile,auth,match,addMembers, deleteMembers, blockMembers, unblockMembers ,getAllProfiles,getTheGroup,history}) => {
    const {task,groupId} = match.params;
    
    useEffect(() => {
            getTheGroup(groupId)
            getAllProfiles()
    }, [getAllProfiles,getTheGroup])

    const [selected,setSelected] = useState([])
    const [inputShow,setInputShow] = useState([])
    
    

    const generateButton = ()=>{
        switch(task){

            case 'meet':
                return 

            case 'add':
                return <div onClick={e=>addMembers({members:selected.join()},groupId,history)} className="btn btn-dark my-2 p-5" style={{textTransform:'capitalize'}}>{task} Users</div>

            case 'delete':
                return <div onClick={e=>{
                    deleteMembers({users:selected.join()},groupId,history) 
                }} className="btn btn-dark my-2 p-5" style={{textTransform:'capitalize'}}>{task} Users</div>

            case 'block':
                return <div onClick={e=>blockMembers({users:selected.join()},groupId,history)} className="btn btn-dark my-2 p-5" style={{textTransform:'capitalize'}}>{task} Users</div>

            case 'unblock':
                return <div onClick={e=>unblockMembers({users:selected.join()},groupId,history)} className="btn btn-dark my-2 p-5" style={{textTransform:'capitalize'}}>{task} Users</div>
        }
    }


    const generateCards = profiles =>{
        return profiles && profiles.length>0 && profiles.map(profile=><Fragment key={profile._id}>
                <div className="group bg-light">
            <img src={profile.user.avatar} alt="" className="round-img"/>
            <div>
                <h2>{profile.user.name}</h2>
                 <p>{profile.status} at {profile.company}</p>
                <p>{profile.location}</p>
                
            </div>
            <ul>
                {profile.skills.map((skill,idx)=>idx<2 && <li key={idx}><i className="fas fa-check"></i>{skill}</li>)}

                {
                task!=='meet' && <li className="text-primary my-1"><div onClick={e=>{
                    if(selected.indexOf(profile.user._id)===-1){
                        setSelected([...selected,profile.user._id]);
                        setInputShow([...inputShow,profile.user.name])
                    }else{
                        const newNames = inputShow.filter((name,idx)=>selected[idx]!==profile.user._id)
                        const newSelected = selected.filter(id=>id!=profile.user._id);
                        setSelected(newSelected);
                        setInputShow(newNames);
                    }
                }} className='btn btn-primary'>{selected.indexOf(profile.user._id)===-1 ? 'Select' : 'Unselect'}</div></li>} 
            </ul>
        </div>
        </Fragment>)
    }

    const generateAppropriateProfiles = (profiles) =>{
        switch(task){
            case 'meet':
                return generateCards(profiles.filter(profile=>group.members.indexOf(profile.user._id)!==-1))
            case 'delete':
                    return generateCards(profiles.filter(profile=>group.members.indexOf(profile.user._id)!==-1 && profile.user._id!==group.admin))
            case 'add':
                return generateCards(profiles.filter(profile=>group.members.indexOf(profile.user._id)===-1))
            case 'block':
                return generateCards(profiles.filter(profile=>group.blockList.indexOf(profile.user._id)===-1 && profile.user._id!==group.admin))
            case 'unblock':
                return generateCards(profiles.filter(profile=>group.blockList.indexOf(profile.user._id)!==-1))
        }
    }

    return (!group || profile.loading ||auth.loading ? <Spinner/> : 
        <Fragment>
            <Link to={`/groups/${groupId}`} className='btn'>Back to Group</Link>
            <h1 className="large text-primary">
            Members
            </h1>
            {task==='meet' ? <Fragment>
                <p className="lead" style={{textTransform:'capitalize'}}>
                <i className="fab fa-connectdevelop"></i> Meet members of your group.
                </p>
            </Fragment>
             : 
            <Fragment>
                <p className="lead" style={{textTransform:'capitalize'}}>
                    <i className="fab fa-connectdevelop"></i> Select members to {task}
                </p>
                <div className="form">
                    <div className="form-group">
                        <input type="text" value={inputShow.join()} readOnly/>
                    </div>
                </div>

            { generateButton()}

            </Fragment> }
            
        <div className="groups">
            {group.members.indexOf(auth.user._id)===-1 ? <div className='m-5 p-5 lead'>You Left the Group</div> : profile.profiles && generateAppropriateProfiles(profile.profiles)} 
        </div>
        </Fragment>
    )
}

Members.propTypes={
    addMembers: PropTypes.func.isRequired,
    deleteMembers:PropTypes.func.isRequired,
    blockMembers:PropTypes.func.isRequired,
    unblockMembers:PropTypes.func.isRequired,
    getAllProfiles:PropTypes.func.isRequired,
    members:PropTypes.array,
    profile:PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    group:state.group.group,
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getAllProfiles,getTheGroup, addMembers, deleteMembers,blockMembers,unblockMembers})(Members);
