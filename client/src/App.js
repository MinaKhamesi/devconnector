import React,{Fragment,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import AddExperience from './components/profileForms/AddExperience';
import AddEducation from './components/profileForms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

//redux
import store from './store';
import { loadUser } from './actions/auth';
import setTokenHeader from './utils/setTokenHeader'



if (localStorage.token){
      setTokenHeader(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return(
  <Router>
    <Fragment>
      <Navbar/>
      <Route path='/' exact component={Landing}/>
      <section className='container'>
        <Alert/>
        <Switch>
          <Route exact path='/login' component = {Login}/>
          <Route exact path='/register' component= {Register} />
          <Route exact path='/profiles'  component={Profiles}/>
          <Route exact path='/profile'  component={Profile}/>
          <PrivateRoute exact path='/dashboard' component= {Dashboard} />
          <PrivateRoute exact path='/create-profile' component= {CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component= {EditProfile} />
          <PrivateRoute exact path='/add-experience' component= {AddExperience} />
          <PrivateRoute exact path='/add-education' component= {AddEducation} />
          
        </Switch>
      </section>
    </Fragment>
  </Router>
  )}  
  

export default App;
