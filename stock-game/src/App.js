import React, {useState} from 'react';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Profile from './components/profile';
import PostRequest from './PostRequest';
import Navbar from './components/navbar';
import Leaderboard from './components/Leaderboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import { OnProfile } from './helper/context'

function App() {
  const [ProfilePage, setProfilePage] = useState(false);
  return (
    // <OnProfile.Provider value={{ProfilePage, setProfilePage}}>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login"></Route>
          {/* <Route path="/logout" component={Logout}/> */}
          <Route path="/leaderboard" component={Leaderboard}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/postrequest" component={PostRequest}/>
        </Switch>
      </Router>
    // </OnProfile.Provider>
  );
}

export default App;