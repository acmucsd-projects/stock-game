import '../index.css'
import './profile.css'
import React from "react";


function Profile() {
  return(
    <>
      <header className="App-header">
        <div style={{float: 'right'}}> 
        <section className="box">
          <p><u>Overview</u></p>
          <br/>
          <p>Account Value:</p>
          <p>Today's Change:</p>
          <p>Standing:</p>
        </section>
        </div>        
      </header>
    </>
  )
}

export default Profile;