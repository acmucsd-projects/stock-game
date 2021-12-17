import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef} from "react"
import axios from 'axios'
import Predictions from './dashboard/predictions'

function Profile() {
  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <br/>
        <p>Account Value:</p>
        <p>Today's Change:</p>
        <p>Standing:</p>
      </div>
      <Predictions/>     
    </div>        
  )
}

export default Profile;