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
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Groups from './components/groups/Groups';
import CreateGroup from './components/groups/CreateGroup';
import Group from './components/group/Group';
import Members from './components/group/Members';
import UserGroups from './components/groups/UserGroups'
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
          <Route exact path='/profile/:id'  component={Profile}/>
          <PrivateRoute exact path='/dashboard' component= {Dashboard} />
          <PrivateRoute exact path='/create-profile' component= {CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component= {EditProfile} />
          <PrivateRoute exact path='/add-experience' component= {AddExperience} />
          <PrivateRoute exact path='/add-education' component= {AddEducation} />
          <PrivateRoute exact path='/posts' component= {Posts} />
          <PrivateRoute exact path='/post/:postId' component= {Post} />
          <PrivateRoute exact path='/groups' component= {Groups} />
          <PrivateRoute exact path='/creategroup' component= {CreateGroup} />
          <PrivateRoute exact path='/groups/:id' component= {Group} />
          <PrivateRoute exact path='/groups/:groupId/members/:task' component= {Members} />
          <PrivateRoute exact path='/post/:groupId/:postId' component= {Post} />
          <PrivateRoute exact path='/user-groups' component= {UserGroups} />

          
        </Switch>
      </section>
    </Fragment>
  </Router>
  )}  
  

export default App;
