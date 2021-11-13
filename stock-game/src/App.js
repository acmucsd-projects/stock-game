/*
This is what I have for the login page so far.
Feel free to make changes on a branch.
-Ben
Testing
*/

// import React, {useRef} from 'react'
// import './components/StyleSheet.css'
// import Navbar from './components/navbar'
// import Login from './Login'
// import Profile from './Profile'
// import PostRequest from './PostRequest'
// import {BrowserRouter as Router, Route, Link} from "react-router-dom"

// function App() { 
//   // Local var to store navbar, which has a prop pages (an array, might be helpful for multiple pages)
//   var navbar = <Navbar pages={[<Login name="login" key="login-page"/>]} />;
//   var pages = navbar.props.pages.map((page) => { 
//     return page; 
//   })
  
//   return (
//     <>
//     {navbar}
//     <Router>
//       <Route exact path="/" element={<Login/>}/>
//       <Route exact path="/profile" element={<Profile/>}/>
//       <Route exact path='/postrequest' element={<PostRequest/>}/>
//     </Router>

//     </>
//   )   
// }

// export default App;

import Dashboard from './Dashboard';
import Profile from './Profile';
import PostRequest from './PostRequest';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/logout" component={Logout}/>
        <Route path="/leaderboard" component={Leaderboard}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    </Router>
  );
}

export default App;