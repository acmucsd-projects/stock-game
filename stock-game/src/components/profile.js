import '../index.css'
import './profile.css'
import React, {useState, useEffect} from "react"
import axios from 'axios'
import Predictions from './dashboard/predictions'

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user', { withCredentials: true })
   .then(response => setUser(response.data.user));
  }, []);

  function showPicture() {
    if(user != null) return user.picture
    else return ""
  }

  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <div className="profile">
          <div className="profile-bio">        
            <div className="picture" style={{background: `url(${showPicture()})`}}></div>
          </div>   
          <div className="profile-info">
            <p>Account Value:</p>
            <p>Today's Change: </p>
            <p>Standing: </p>
          </div> 
        </div>           
      </div>
      <Predictions/>     
    </div>        
  )
}

export default Profile;