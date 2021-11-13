import React, {useRef} from 'react'
import './index.css'
import Navbar from './components/navbar'
import Login from './components/login'
import Profile from './components/profile'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() { 
  // Local var to store navbar, which has a prop pages (an array, might be helpful for multiple pages)
  var navbar = <Navbar pages={[<Login name="login" key="login-page"/>, <Profile name="profile" key="profile-page"/>]} />;
  
  return (
    <>    
    <Router>
      {navbar}
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>   
    </Router>
    </>
  )   
}

export default App;