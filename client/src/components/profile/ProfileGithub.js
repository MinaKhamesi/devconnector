import React from 'react'

const ProfileGithub = () => {
    return (
        <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                <div className="repo bg-white my-1 p-1">
                    <div>
                        <h4><a href="#">Repo One</a></h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore!</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">Stars: 44</li>
                            <li className="badge badge-dark">Watchers: 20</li>
                            <li className="badge badge-light">Forks: 19</li>
                        </ul>
                    </div> 
                </div>

                <div className="repo bg-white my-1 p-1">
                    <div>
                        <h4><a href="#">Repo Two</a></h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore!</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">Stars: 44</li>
                            <li className="badge badge-dark">Watchers: 20</li>
                            <li className="badge badge-light">Forks: 19</li>
                        </ul>
                    </div>
                </div>

                <div className="repo bg-white my-1 p-1">
                    <div>
                        <h4><a href="#">Repo Three</a></h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempore!</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">Stars: 44</li>
                            <li className="badge badge-dark">Watchers: 20</li>
                            <li className="badge badge-light">Forks: 19</li>
                        </ul>
                    </div>
                </div>
            </div>)
}

export default ProfileGithub;
