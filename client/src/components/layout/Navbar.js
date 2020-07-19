import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({isAuthenticated,logout}) => {
    const guestNavbar = <nav className="navbar bg-dark">
    <h1>
        <Link to="/">
            <i className="fas fa-code"></i> DevConnector
        </Link>
    </h1>
    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">LogIn</Link></li>
    </ul>
</nav>

    const loginNavbar = <nav className="navbar bg-dark">
    <h1>
        <Link to="/dashboard">
            <i className="fas fa-code"></i> DevConnector
        </Link>
    </h1>
    <ul>
    <li><Link to="/profiles">Developers</Link></li>
    <li><Link to="/posts">Posts</Link></li>
    <li><Link to="/groups">Groups</Link></li>
<li ><Link to="/dashboard"><i className="fas fa-user"></i><span className="hide-sm">{"  "} Dashboard</span></Link></li>

<li onClick={e=>logout()}><Link to="/login"><i className="fas fa-sign-out-alt"></i><span className="hide-sm">{"  "}Logout</span></Link></li>
</ul>
</nav>

    return (isAuthenticated) ? loginNavbar : guestNavbar;
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{logout})(Navbar);
