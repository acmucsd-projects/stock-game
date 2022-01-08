import '../index.css'
import './profile.css'
import Predictions from './dashboard/predictions'
import Overview from './overview'

function Profile() {
  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <Overview/>
      </div>
      <Predictions/>     
    </div>        
  )
}

export default Profile;