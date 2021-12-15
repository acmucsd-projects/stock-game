import React from 'react';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Profile from './components/profile';
import PostRequest from './PostRequest';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login"><Login/></Route>
        {/* <Route path="/logout" component={Logout}/>
        <Route path="/leaderboard" component={Leaderboard}/> */}
        <Route path="/profile" component={Profile}/>
        <Route path="/postrequest" component={PostRequest}/>
      </Switch>
    </Router>
  );
}

export default App;