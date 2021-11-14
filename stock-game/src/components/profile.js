import '../index.css'
import './profile.css'
import React from "react";


function Profile() {
  return(
    <div className="page" style={{float: 'right'}}> 
      <section className="box">
        <p><u>Overview</u></p>
        <br/>
        <p>Account Value:</p>
        <p>Today's Change:</p>
        <p>Standing:</p>
      </section>
    </div>        
  )
}

export default Profile;