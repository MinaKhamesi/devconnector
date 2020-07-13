import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getGithubRepos} from '../../actions/profile';

const ProfileGithub = ({githubusername,profile:{loading,repos},getGithubRepos}) => {

    useEffect(()=>{
        getGithubRepos(githubusername)
    },[getGithubRepos,githubusername])


    return ( !loading && repos.length > 0 &&
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                
                    {repos.map(repo=><Fragment key={repo.id}>
                    <div className="repo bg-white my-1 p-1">
                        <div>
                            <h4><a href={repo.html_url} target="_blank" rel='noopener noreferrer'>{repo.name}</a></h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                <li className="badge badge-light">Forks: {repo.forks}</li>
                            </ul>
                        </div> 
                </div>
                    </Fragment>)}
            </div>)
}

ProfileGithub.propTypes = {
    getGithubRepos:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    githubusername:PropTypes.string.isRequired,
}

const mapStateToProps = state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub);
