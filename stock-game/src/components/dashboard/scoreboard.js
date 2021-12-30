import './scoreboard.css'
import '../../index.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

function Scoreboard(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user', { withCredentials: true })
   .then(response => setUser(response.data.user));
  }, []);

  return (
    <div className="dashboard-component scoreboard"> 
      <h1>
        { (user != null)
          ? (`Hi, ${user.name}!`)
          : <></>
        }
      </h1>
      <h1>Your score: 80,000</h1>
    </div>
  )
}

export default Scoreboard