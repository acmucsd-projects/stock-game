/*
This is what I have for the login page so far.
Feel free to make changes on a branch.
-Ben
Testing
*/

import React, {useRef} from 'react'
import './components/StyleSheet.css'
import Navbar from './components/navbar'
import Login from './Login'
import Profile from './Profile'
import {Route, Routes, Link} from "react-router-dom"

function App() { 
  // Local var to store navbar, which has a prop pages (an array, might be helpful for multiple pages)
  var navbar = <Navbar pages={[<Login name="login" key="login-page"/>]} />;
  var pages = navbar.props.pages.map((page) => { 
    return page; 
  })
  
  return (
    <>
    {navbar}
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
    </Routes>

    </>
  )   
}

export default App;