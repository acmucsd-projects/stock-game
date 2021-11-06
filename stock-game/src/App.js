/*
This is what I have for the login page so far.
Feel free to make changes on a branch.
-Ben
Testing
*/

import React, {useRef} from 'react'
import './components/StyleSheet.css'
import Login from './Login'
import Profile from './Profile'
import {Route, Routes, Link} from "react-router-dom"

function App() { 
  
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
    </Routes>

    </>
  )
}

export default App;