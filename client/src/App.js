import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//===================================Public Routes=============================================//
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/not-found/NotFound';


//====================================Private Routes=============================================//

//User and Profile Components
import UserProfile from './components/profile/Main-Components/UserProfile';
import About from './components/profile/Main-Components/About';
import Trips from './components/profile/Main-Components/Trips';
import Wall from './components/profile/Main-Components/Wall';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import Settings from './components/user-settings/Settings';
import ChangePassword from './components/user-settings/ChangePassword';
import AddTrip from './components/user-settings/AddTrip';
import EditTrips from './components/user-settings/EditTrips';

//Group Components
import GroupAbout from './components/group/Main-Components/About';
import GroupMembers from './components/group/Main-Components/Members';
import GroupSettings from './components/group/Main-Components/GroupSettings';
import GroupTrips from './components/group/Main-Components/Trips';
import GroupWall from './components/group/Main-Components/Wall';
import EventCalendar from './components/group/Main-Components/EventCalendar';
import CreateGroup from './components/group/CreateGroup';
import EditGroup from './components/group/EditGroup';
import EditGroupTrips from './components/group/Settings-Components/Edit-Trips';
import EditEvents from './components/group/Settings-Components/Edit-Events';
import AddGroupTrip from './components/group/Settings-Components/AddTrip';
import AddGroupEvent from './components/group/Settings-Components/AddEvent';

//Groups Components
import GroupsLanding from './components/groups/GroupsLanding';
import UserGroups from './components/groups/UserGroups';

//Post components
import Posts from './components/post/main-posts/Posts';
import Post from './components/post/main-posts/Post';
import PersonPost from './components/post/user-posts/PersonPost';
import Personfeed from './components/post/user-posts/PersonPosts';

//Search Components
import Search from './components/search/search';
import SearchGroups from './components/search/searchGroups';

//Matchmaking Components
import MatchForm from './components/matchmaking/MatchForm.js';
import Matches from './components/matchmaking/Matches.js';
import MatchLanding from './components/matchmaking/MatchLanding.js';

//=================================================================================//

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
//=================================================================================//

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="main-container container">

              {/**************Public Routes************/}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              {/**************Private Routes************/}
              {/* User and Profile Routes */}
              <Switch>
                <PrivateRoute exact path="/profile" component={UserProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/about/:handle" component={About} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/trips/:handle" component={Trips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/wall/:handle" component={Wall} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/user-settings" component={Settings} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/change-password" component={ChangePassword} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-trips" component={EditTrips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-trip" component={AddTrip} />
              </Switch>


              {/* Group Routes */}
              <Switch>
                <PrivateRoute exact path="/groupabout/:handle" component={GroupAbout} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupmembers/:handle" component={GroupMembers} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupsettings/:handle" component={GroupSettings} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/grouptrips/:handle" component={GroupTrips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupwall/:handle" component={GroupWall} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupCalendar/:handle" component={EventCalendar} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-group" component={CreateGroup} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-group/:handle" component={EditGroup} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-trips/:handle" component={EditGroupTrips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-events/:handle" component={EditEvents} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/addTrip/:handle" component={AddGroupTrip} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/addEvent/:handle" component={AddGroupEvent} />
              </Switch>


              {/* Groups Routes */}
              <Switch>
                <PrivateRoute exact path="/groups-landing" component={GroupsLanding} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/mygroups/:id" component={UserGroups} />
              </Switch>


              {/* Post Routes */}
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/post/:handle/:id" component={PersonPost} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/personfeed/:handle" component={Personfeed} />
              </Switch>


              {/* Search Routes */}
              <Switch>
                <PrivateRoute exact path="/search/:searchString" component={Search} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/search-groups/:searchString" component={SearchGroups} />
              </Switch>


              {/* Matchmaking Routes */}
              <Switch>
                <PrivateRoute exact path="/match" component={MatchForm} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/matches" component={Matches} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/matchmaking" component={MatchLanding} />
              </Switch>


              {/* Default Route if no other is found */}
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

